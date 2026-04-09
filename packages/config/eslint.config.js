// @ts-check
import js from '@eslint/js'
import tseslint from 'typescript-eslint'

const COMPONENT_NAME_PATTERN = /^[A-Z][A-Za-z0-9]*$/
const VARIANTS_EXPORT_PATTERN = /Variants$/

/**
 * @param {string} name
 */
function isPascalCase(name) {
  return COMPONENT_NAME_PATTERN.test(name)
}

/**
 * @param {import('estree').Node | null | undefined} declaration
 * @returns {string[]}
 */
function getExportedNames(declaration) {
  if (!declaration) return []

  if (declaration.type === 'FunctionDeclaration' && declaration.id?.name) {
    return [declaration.id.name]
  }

  if (declaration.type === 'ClassDeclaration' && declaration.id?.name) {
    return [declaration.id.name]
  }

  if (declaration.type === 'VariableDeclaration') {
    return declaration.declarations.flatMap((entry) => {
      if (entry.id.type !== 'Identifier') {
        return []
      }

      if (!entry.init) {
        return []
      }

      return [entry.id.name]
    })
  }

  return []
}

export const pkstackPlugin = {
  meta: {
    name: 'pkstack',
  },
  rules: {
    'require-variants': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Require component files in components/ directories to export a *Variants const.',
        },
        schema: [],
        messages: {
          missingVariants:
            'Component files inside a components directory must export a `*Variants` const.',
        },
      },
      create(context) {
        const filename = context.filename.replaceAll('\\', '/')
        if (!filename.includes('/components/')) {
          return {}
        }

        let hasComponentExport = false
        let hasVariantsExport = false
        let programNode = null

        return {
          Program(node) {
            programNode = node
          },
          ExportNamedDeclaration(node) {
            const exportedNames =
              node.specifiers?.flatMap((specifier) =>
                specifier.exported.type === 'Identifier' ? [specifier.exported.name] : []
              ) ?? []
            const declarationNames = getExportedNames(node.declaration)
            const names = [...exportedNames, ...declarationNames]

            if (names.some(isPascalCase)) {
              hasComponentExport = true
            }

            if (names.some((name) => VARIANTS_EXPORT_PATTERN.test(name))) {
              hasVariantsExport = true
            }
          },
          'Program:exit'() {
            if (hasComponentExport && !hasVariantsExport && programNode) {
              context.report({
                node: programNode,
                messageId: 'missingVariants',
              })
            }
          },
        }
      },
    },
  },
}

/** @type {import('typescript-eslint').ConfigArray} */
export const baseConfig = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    plugins: {
      pkstack: pkstackPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  }
  ,
  {
    files: ['**/components/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'pkstack/require-variants': 'error',
    },
  }
)

export default baseConfig

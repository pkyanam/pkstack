// @ts-check
import js from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type {import('typescript-eslint').ConfigArray} */
export const baseConfig = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    rules: {
      // Enforce typed variants export on UI components
      // Rule: every file in src/components/ that exports a React component
      // must also export a `*Variants` const (enforced via custom lint rule in v0.2)
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  }
)

export default baseConfig

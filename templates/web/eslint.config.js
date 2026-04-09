import nextPlugin from '@next/eslint-plugin-next'
import { baseConfig } from '@pkstack/config/eslint'
import tseslint from 'typescript-eslint'

const nextConfig = {
  plugins: {
    '@next/next': nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
  },
}

export default tseslint.config(...baseConfig, nextConfig, {
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  ignores: ['dist/', '.next/'],
})

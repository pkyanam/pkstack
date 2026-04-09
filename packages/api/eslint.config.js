import { baseConfig } from '@pkstack/config/eslint'
import tseslint from 'typescript-eslint'

export default tseslint.config(...baseConfig, {
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  ignores: ['dist/'],
})

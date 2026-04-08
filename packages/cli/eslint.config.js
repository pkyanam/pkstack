import { baseConfig } from '@pkstack/config/eslint'
import tseslint from 'typescript-eslint'

export default tseslint.config(...baseConfig, {
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ['src/__tests__/*.ts'],
      },
      tsconfigRootDir: import.meta.dirname,
    },
  },
  ignores: ['dist/', 'templates/'],
})

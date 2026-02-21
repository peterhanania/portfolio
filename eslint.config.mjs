import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import astroPlugin from 'eslint-plugin-astro';
import unusedImports from 'eslint-plugin-unused-imports';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import astroParser from 'astro-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default tseslint.config(
  // Global ignores (replaces .eslintignore and ignorePatterns)
  {
    ignores: [
      '**/*.d.ts',
      '**/node_modules/**',
      '**/dist/**',
      '**/.turbo/**',
      '**/.yarn/**',
      '**/lib/**',
      '**/storybook-static/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
      'packages/frontend/src/components/other/serviceWorker.astro',
      'tsconfig.tsbuildinfo',
      '**/.swc/**'
    ]
  },

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Main config for TS/TSX/JS/MJS files
  {
    files: ['**/*.{ts,tsx,js,mjs}'],
    plugins: {
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      react: reactPlugin,
      'react-hooks': reactHooks,
      prettier: prettierPlugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
        EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true
      }
    },
    rules: {
      'arrow-body-style': ['error'],
      'prefer-arrow-callback': ['error'],
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          printWidth: 150,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          useTabs: false,
          trailingComma: 'none'
        }
      ],
      'linebreak-style': ['warn', 'unix']
    }
  },

  // Astro component files
  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroPlugin
    },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
        sourceType: 'module'
      },
      globals: {
        ...globals.node,
        ...globals.es2020
      }
    },
    rules: {
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
      'prettier/prettier': 'off'
    }
  },

  // Astro inline <script> tags (virtual .js files)
  {
    files: ['**/*.astro/*.js', '*.astro/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020
      },
      parserOptions: {
        sourceType: 'module'
      }
    },
    rules: {
      'prettier/prettier': 'off'
    }
  },

  // Disable ESLint rules that conflict with Prettier (must be last)
  prettierConfig
);

module.exports = {
  ignorePatterns: [
    'node_modules',
    'dist',
    '.next',
    'src/components/other/serviceWorker.astro'
  ],
  plugins: [
    'prettier',
    '@typescript-eslint',
    'unused-imports',
    'simple-import-sort',
    'import'
  ],
  rules: {
    'linebreak-style': ['warn', 'unix'],
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
    ]
  },
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ['*.astro'],
      // Enable this plugin
      plugins: ['astro'],
      env: {
        // Enables global variables available in Astro components.
        node: true,
        'astro/astro': true,
        es2020: true
      },
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
        // The script of Astro components uses ESM.
        sourceType: 'module'
      },
      rules: {
        // Enable recommended rules
        'astro/no-conflict-set-directives': 'error',
        'astro/no-unused-define-vars-in-style': 'error'

        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      }
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ['**/*.astro/*.js', '*.astro/*.js'],
      env: {
        browser: true,
        es2020: true
      },
      parserOptions: {
        sourceType: 'module'
      },
      rules: {
        // override/add rules settings here, such as:
        // "no-unused-vars": "error"

        // If you are using "prettier/prettier" rule,
        // you don't need to format inside <script> as it will be formatted as a `.astro` file.
        'prettier/prettier': 'off'
      }
    },
    {
      files: ['**/*.mjs'],
      env: {
        es2020: true
      },
      parserOptions: {
        sourceType: 'module'
      }
    }
  ]
};

// module.exports = {
//   // '*.json': (filenames) =>
//   //   `prettier -w --ignore-path .prettierignore ${filenames
//   //     .map((file) => file.split(`${process.cwd()}/`)[1])
//   //     .join(' ')}`,
//   // '*.{js,mjs,ts,tsx}': (filenames) =>
//   //   `eslint --ignore-path .gitignore ${filenames
//   //     .map((file) => file.split(`${process.cwd()}/`)[1])
//   //     .join(' ')}`,
//   // 'packages/**/*.{ts,tsx}': (filenames) =>
//   //   `npm run lint -- ${filenames
//   //     .map((file) => file.split(`${process.cwd()}/`)[1])
//   //     .join(' ')}`
// };

module.exports = {
  '*.{js,mjs,ts,tsx,json}': (filenames) => `npx prettier -w ${filenames.join(' --ignore-path .prettierignore ')}`,
  'packages/**/*.{ts,tsx}': (filenames) => `npm run lint -- ${filenames.join(' ')}`
};

const path = require('path');

const getPackages = async (context) => {
  const { globby } = await import('globby');

  const ctx = context || {};
  const cwd = ctx.cwd || process.cwd();

  const { workspaces } = require(path.join(cwd, 'package.json'));
  const pJsons = await globby(
    workspaces.map((ws) => path.join(ws, 'package.json')),
    { cwd }
  );

  const packages = pJsons.map((pJson) => require(path.join(cwd, pJson)));
  return packages
    .map((pkg) => pkg.name)
    .filter(Boolean)
    .map((name) => (name.charAt(0) === '@' ? name.split('/')[1] : name));
};

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': (ctx) =>
      getPackages(ctx).then((packages) => [
        2,
        'always',
        packages.concat(['release', 'scripts', 'templates', 'deps', 'misc'])
      ])
  }
};

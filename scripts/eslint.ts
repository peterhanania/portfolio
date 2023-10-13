import { ESLint } from 'eslint';
import minimist from 'minimist';
import path from 'path';

const args = minimist(process.argv.slice(2));

const getLineColumnSize = (line: number[], column: number[]) =>
  line.reduce(
    (prev, curr) =>
      curr.toString().length > prev ? curr.toString().length : prev,
    0
  ) +
  1 +
  column.reduce(
    (prev, curr) =>
      curr.toString().length > prev ? curr.toString().length : prev,
    0
  );

const getMessageSize = (msg: string[]) =>
  msg.reduce((prev, curr) => (curr.length > prev ? curr.length : prev), 0);

const runESLint = async () => {
  const chalk = (await import('chalk')).default;

  const targets = args._.filter(
    (target) => !path.relative(target, process.cwd()).includes('..')
  );
  if (args._.length > 0 && targets.length === 0)
    return console.log(chalk.blueBright('✔ Skipping; No target files'));

  const runner = new ESLint({
    fix: args.fix as boolean,
    useEslintrc: true,
    cwd: process.cwd(),
    ignorePath: path.join(__dirname, '../.gitignore')
  });

  const report = await runner.lintFiles(targets.length > 0 ? targets : '.');

  if (
    report.reduce(
      (prev, curr) =>
        prev + curr.errorCount + curr.fatalErrorCount + curr.warningCount,
      0
    ) > 0
  ) {
    report
      .filter(
        (result) =>
          result.errorCount + result.fatalErrorCount + result.warningCount !== 0
      )
      .map((result) => {
        const maxLineColumnSize = getLineColumnSize(
          result.messages.map((msg) => msg.line),
          result.messages.map((msg) => msg.column)
        );
        const maxMessageSize = getMessageSize(
          result.messages.map((msg) => msg.message)
        );

        console.log('');
        console.log(
          chalk.cyan(`./${path.relative(process.cwd(), result.filePath)}`)
        );

        result.messages.forEach((msg) => {
          const lineColumnSize = getLineColumnSize([msg.line], [msg.column]);
          const messageSize = getMessageSize([msg.message]);

          console.log(
            `${chalk.yellow(msg.line)}:${chalk.yellow(msg.column)}${' '.repeat(
              maxLineColumnSize - lineColumnSize + 2
            )}${chalk.bold(chalk.red('Error'))}: ${msg.message}${' '.repeat(
              maxMessageSize - messageSize + 2
            )}${chalk.bold(chalk.gray(msg.ruleId))}`
          );
        });
      });

    console.log('');
    process.exit(1);
  }

  console.log(chalk.greenBright('✔ No ESLint warnings or errors'));
};

void runESLint();

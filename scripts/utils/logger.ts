import { ChalkInstance } from 'chalk';

export class Logger {
  private readonly name: string;
  private readonly chalk: ChalkInstance;

  public constructor(name: string, chalk: ChalkInstance) {
    this.name = name;
    this.chalk = chalk;
  }

  private log(message: string, breaks?: number) {
    process.stdout.write(
      `${this.chalk.cyan(`[${this.name}]`)} ${message}${
        breaks ? '\n'.repeat(breaks) : '\n'
      }`
    );
  }

  public info(message: string, breaks?: number) {
    this.log(`${this.chalk.cyan('→')} ${message}`, breaks);
  }

  public success(message: string, breaks?: number) {
    this.log(`${this.chalk.green('✓')} ${message}`, breaks);
  }

  public error(message: string, breaks?: number) {
    this.log(`${this.chalk.red('✗')} ${message}`, breaks);
  }
}

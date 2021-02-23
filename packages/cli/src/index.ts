import { program } from 'commander';
import { serveCommand } from './commands/';

program.addCommand(serveCommand);

program.parse(process.argv);

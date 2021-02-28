import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a local notebook')
  .option('-p, --port <number>', 'port to run server on', '4242')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename, '.js') + '.js',
        dir,
        !isProduction
      );
      console.log(`Serving ${filename} on http://localhost:${options.port}`);
    } catch (error) {
      if ((error.code = 'EADDRINUSE')) {
        console.error(
          'Serve failed: port is already in use. Use a different port by adding the "-p <number>" flag to the serve command'
        );
      } else {
        console.error('Serve failed:', error.message);
      }
    }
  });

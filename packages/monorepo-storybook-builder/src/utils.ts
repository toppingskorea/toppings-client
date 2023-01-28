import { exec as _exec } from 'shelljs';

export function exec(command: string) {
  console.log(`   executing: ${command}`);

  const options = { silent: true };
  const ref = _exec(command, options);

  if (ref.code === 0) {
    return ref.stdout.trim();
  }

  throw new Error(`Exec code(${ref.code}) on executing: ${command}\n${ref.stderr}`);
}

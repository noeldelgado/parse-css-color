import { digit, digitOrPercentage } from './utils';

const pattern = `^
  rgba?\\(
    \\s*${digit}
    \\s+${digit}
    \\s+${digit}
    \\s*(?:\\s*\\/\\s*${digitOrPercentage}\\s*)?
  \\)
$
`.replace(/\n|\s/g, '');

export default new RegExp(pattern);

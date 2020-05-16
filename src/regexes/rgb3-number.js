import { digit, digitOrPercentage } from './utils';

const pattern = `^
  rgba?\\(
    \\s*${digit}\\s*,
    \\s*${digit}\\s*,
    \\s*${digit}\\s*
    (?:,\\s*${digitOrPercentage}\\s*)?
  \\)
  $
`.replace(/\n|\s/g, '');

export default new RegExp(pattern);

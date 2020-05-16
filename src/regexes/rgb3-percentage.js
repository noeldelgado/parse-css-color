import { percentage, digitOrPercentage } from './utils';

const pattern = `^
  rgba?\\(
    \\s*${percentage}\\s*,
    \\s*${percentage}\\s*,
    \\s*${percentage}\\s*
    (?:,\\s*${digitOrPercentage}\\s*)?
  \\)
  $
`.replace(/\n|\s/g, '');

export default new RegExp(pattern);

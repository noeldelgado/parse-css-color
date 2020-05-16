import { percentage, digitOrPercentage } from './utils';

const pattern = `^
  rgba?\\(
    \\s*${percentage}
    \\s+${percentage}
    \\s+${percentage}
    \\s*(?:\\s*\\/\\s*${digitOrPercentage}\\s*)?
  \\)
$
`.replace(/\n|\s/g, '');

export default new RegExp(pattern);

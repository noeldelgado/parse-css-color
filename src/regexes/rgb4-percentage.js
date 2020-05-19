import { percentage, numberOrPercentage } from './utils';

const pattern = `^
  rgba?\\(
    \\s*${percentage}
    \\s+${percentage}
    \\s+${percentage}
    \\s*(?:\\s*\\/\\s*${numberOrPercentage}\\s*)?
  \\)
$
`.replace(/\n|\s/g, '');

export default new RegExp(pattern);

import { percentage, digitOrPercentage } from './utils';

const pattern = `^
  hsla?\\(
    \\s*(-?\\d*(?:\\.\\d+)?(?:deg|rad|turn)?)\\s*,
    \\s*${percentage}\\s*,
    \\s*${percentage}\\s*
    (?:,\\s*${digitOrPercentage}\\s*)?
  \\)
  $
`.replace(/\n|\s/g, '');

export default new RegExp(pattern);

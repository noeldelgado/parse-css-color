import hex2Rgb from 'hex-rgb';

const clamp = (num, min, max) => Math.min(Math.max(min, num), max);

/* 500 => 255, -10 => 0, 128 => 128 */
const parseRGB = (num) => {
  let n = num;
  if (typeof n !== 'number') n = n.endsWith('%') ? (parseFloat(n) * 255) / 100 : parseFloat(n);
  return clamp(Math.round(n), 0, 255);
};

/* 200 => 100, -100 => 0, 50 => 50 */
const parsePercentage = (percentage) => clamp(parseFloat(percentage), 0, 100);

/* '50%' => 5.0, 200 => 1, -10 => 0 */
function parseAlpha(alpha) {
  let a = alpha;
  if (typeof a !== 'number') a = a.endsWith('%') ? parseFloat(a) / 100 : parseFloat(a);
  return clamp(a, 0, 1);
}

export function getHEX(hex) {
  const [r, g, b, a] = hex2Rgb(hex, { format: 'array' });
  return getRGB([null, ...[r, g, b, a]]);
}

export function getHSL([, h, s, l, a = 1]) {
  let hh = h;
  if (hh.endsWith('turn')) {
    hh = (parseFloat(hh) * 360) / 1;
  } else if (hh.endsWith('rad')) {
    hh = Math.round((parseFloat(hh) * 180) / Math.PI);
  } else {
    hh = parseFloat(hh);
  }
  return {
    model: 'hsl',
    values: [hh, parsePercentage(s), parsePercentage(l)],
    alpha: parseAlpha(a === null ? 1 : a)
  };
}

export function getRGB([, r, g, b, a = 1]) {
  return {
    model: 'rgb',
    values: [r, g, b].map(parseRGB),
    alpha: parseAlpha(a === null ? 1 : a)
  };
}

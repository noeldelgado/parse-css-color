const assert = require('assert').strict;

const parseCssColor = require('..');

const { deepEqual, equal } = assert;

const parseOk = (colorString, m, v, a) => {
  it(`${colorString} => type: ${m}, values: ${v}, alpha: ${a}`, () => {
    const { type, values, alpha } = parseCssColor(colorString);
    equal(type, m);
    deepEqual(values, v);
    equal(alpha, a);
  });
};

const parseFail = (colorString) => {
  it(`${colorString} should be null`, () => {
    const res = parseCssColor(colorString);
    equal(res, null);
  });
};

describe('parse(<misc>)', () => {
  parseOk('transparent', 'rgb', [0, 0, 0], 0);
  parseFail(' transparent');
  parseFail('transparent ');
  describe('non-case sensitive TrANSParent', () => parseOk('TrANSParent', 'rgb', [0, 0, 0], 0));
  parseFail();
  parseFail('');
  parseFail(undefined); // eslint-disable-line
  parseFail(null);
  parseFail('currentColor');
  parseFail('inherit');
});

describe('parse(<hex>)', () => {
  parseOk('#000', 'rgb', [0, 0, 0], 1);
  parseOk('#00f', 'rgb', [0, 0, 255], 1);
  parseOk('#00ff', 'rgb', [0, 0, 255], 1);
  parseOk('#00f8', 'rgb', [0, 0, 255], 0.5333333333333333);
  parseOk('#00f0', 'rgb', [0, 0, 255], 0);
  parseOk('#0000FF', 'rgb', [0, 0, 255], 1);
  parseOk('#0000FFFF', 'rgb', [0, 0, 255], 1);
  parseOk('#0000FF80', 'rgb', [0, 0, 255], 0.5019607843137255);
  parseFail('#00g');
});

describe('parse(<hsl>)', () => {
  const type = 'hsl';
  describe('hsl level 4', () => {
    parseOk('hsl(270 60% 50% / .15)', type, [270, 60, 50], 0.15);
    parseOk('hsl(270 60% 50% / 15%)', type, [270, 60, 50], 0.15);
    parseOk('hsl(0deg 0% 0%)', type, [0, 0, 0], 1);
    parseOk('hsl(-520deg 200% -100%)', type, [-520, 100, 0], 1);
    parseOk('hsl(-520deg 200% -100% / 200%)', type, [-520, 100, 0], 1);
    parseOk('hsl(-520deg 200% -100% / -200%)', type, [-520, 100, 0], 0);
    parseOk('hsl(-520deg 200% -100% / 2)', type, [-520, 100, 0], 1);
    parseOk('hsl(0 0% 0% / 0)', type, [0, 0, 0], 0);
    parseOk('hsl(360deg -10% 0% / 200)', type, [360, 0, 0], 1);
    describe('deg', () => parseOk('hsl(270deg 60% 70%)', type, [270, 60, 70], 1));
    describe('rad', () => parseOk('hsl(4.71239rad 60% 70%)', type, [270, 60, 70], 1));
    describe('turn', () => parseOk('hsl(.75turn 60% 70%)', type, [270, 60, 70], 1));
    describe('deg', () => parseOk('hsl(270deg 60% 70% / 0.25)', type, [270, 60, 70], 0.25));
    describe('rad', () => parseOk('hsl(4.71239rad 60% 70% / 0.5)', type, [270, 60, 70], 0.5));
    describe('turn', () => parseOk('hsl(.75turn 60% 70% / 50%)', type, [270, 60, 70], 0.5));
    // s|l without percentage
    parseFail('hsla(100deg 0 0 / 0)');
    parseFail('hsl(0deg 0% 0 / 0)');
    parseFail('hsla(100 255 100% / 0)');
  });
  describe('hsl level 3', () => {
    parseOk('hsl(270, 60%, 50%, .15)', type, [270, 60, 50], 0.15);
    parseOk('hsl(270, 60%, 50%, 15%)', type, [270, 60, 50], 0.15);
    parseOk('hsl(270,60%,70%)', type, [270, 60, 70], 1);
    parseOk('hsl(270, 60%, 70%)', type, [270, 60, 70], 1);
    parseOk('hsl(270 60% 70%)', type, [270, 60, 70], 1);
    describe('deg', () => parseOk('hsl(270deg, 60%, 70%)', type, [270, 60, 70], 1));
    describe('rad', () => parseOk('hsl(4.71239rad, 60%, 70%)', type, [270, 60, 70], 1));
    describe('turn', () => parseOk('hsl(.75turn, 60%, 70%)', type, [270, 60, 70], 1));
    describe('deg', () => parseOk('hsl(270deg, 60%, 70%, 1)', type, [270, 60, 70], 1));
    describe('rad', () => parseOk('hsl(4.71239rad, 60%, 70%, 0.5)', type, [270, 60, 70], 0.5));
    describe('turn', () => parseOk('hsl(.75turn, 60%, 70%, 50%)', type, [270, 60, 70], 0.5));
    parseOk('hsl(240, 100%, 50%)', type, [240, 100, 50], 1);
    parseOk('hsl(240 , 100%, 50%)', type, [240, 100, 50], 1);
    parseOk('hsl(240, 100% , 50%)', type, [240, 100, 50], 1);
    parseOk('hsl(240,100%,50%)', type, [240, 100, 50], 1);
    parseOk('hsl( 240  ,  100% , 50% )', type, [240, 100, 50], 1);
    parseOk('hsl( 240,100%,50% )', type, [240, 100, 50], 1);
    parseOk('hsl( 240     , 0%     ,   0%    )', type, [240, 0, 0], 1);
    parseOk('hsl(-240, 100%, 50%)', type, [-240, 100, 50], 1);
  });
});

describe('parse(<rgb>)', () => {
  const type = 'rgb';
  describe('rgb level 4', () => {
    parseOk('rgb(0 0 0)', type, [0, 0, 0], 1);
    parseOk('rgb(300 256 -100)', type, [255, 255, 0], 1);
    parseOk('rgb(300 256 -100 / -20)', type, [255, 255, 0], 0);
    parseOk('rgba(300 256 -100 / -20)', type, [255, 255, 0], 0);
    parseOk('rgba(300   256   -100    /    -20)', type, [255, 255, 0], 0);
    parseOk('rgb(0 0 0 / 0)', type, [0, 0, 0], 0);
    parseOk('rgb( 0 0 0 / 100)', type, [0, 0, 0], 1);
    parseOk('rgb(0 0 0 / 20%)', type, [0, 0, 0], 0.2);
    parseOk('rgb(0 0 0 / -200%)', type, [0, 0, 0], 0);
    parseOk('rgb(300% 0% 0% / 1)', type, [255, 0, 0], 1);
    parseOk('rgb(100% 0% 0% / 200%)', type, [255, 0, 0], 1);
    parseOk('rgba(255, 0, 153.6, 1)', type, [255, 0, 154], 1);
    parseOk('rgb(0% 42.35% 33.33%)', type, [0, 108, 85], 1);
    parseOk('rgb(41.2% 69.88% 96.64%)', type, [105, 178, 246], 1);
    // parseOk('rgba(1e2, .5e1, .5e0, +.25e2%)', type, [100, 5, 0], 0.25);
    // mixed % with #
    parseFail('rgb(100% 0 0 / 0)');
    parseFail('rgba(100% 0 0 / 0)');
    parseFail('rgba(100% 255 100% / 0)');
  });
  describe('rgb level 3', () => {
    parseOk('rgb(0, 0, 0, 0)', type, [0, 0, 0], 0);
    parseOk('rgba(0, 0, 0, 0)', type, [0, 0, 0], 0);
    parseOk('rgba( 0, 0, 0)', type, [0, 0, 0], 1);
    parseOk('rgb(-100, -20, -1, -2)', type, [0, 0, 0], 0);
    parseOk('rgb(400, 300 , 600, 2)', type, [255, 255, 255], 1);
    parseOk('rgba(0%, 0% , 0%, 0)', type, [0, 0, 0], 0);
    parseOk('rgba(-100 , 0, 0, 0)', type, [0, 0, 0], 0);
    parseOk('rgba(-100, -10, -0, -100)', type, [0, 0, 0], 0);
    parseOk('rgba(500, 400, 281, 100)', type, [255, 255, 255], 1);
    parseOk('rgb(500, 400, 281, 100)', type, [255, 255, 255], 1);
    // mixed % with #
    parseFail('rgba(300%, 255, 281, 100%)');
    parseFail('rgba(300%, 255, 281, 1)');
    parseFail('rgb(300%, 255, 281)');
  });
});

describe('parse(<keywords>)', () => {
  const type = 'rgb';
  parseOk('red', type, [255, 0, 0], 1);
  parseOk('aqua', type, [0, 255, 255], 1);
  parseOk('cyan', type, [0, 255, 255], 1);
  parseOk('rebeccapurple', type, [102, 51, 153], 1);
  parseOk('tomato', type, [255, 99, 71], 1);
  parseOk('mediumaquamarine', type, [102, 205, 170], 1);
  describe('non-case sensitive Red', () => parseOk('Red', type, [255, 0, 0], 1));
  describe('non-case sensitive darkSlateGray', () =>
    parseOk('darkSlateGray', type, [47, 79, 79], 1));
  parseFail('Unnamed');
  parseFail('pinkk');
  parseFail('superblue');
  parseFail('yellowgreenwhite');
});

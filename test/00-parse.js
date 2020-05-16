const assert = require('assert').strict;

const parseCssColor = require('..');

const { deepEqual, equal } = assert;

const parseOk = (colorString, m, v, a) => {
  it(`${colorString} => model: ${m}, values: ${v}, alpha: ${a}`, () => {
    const { model, values, alpha } = parseCssColor(colorString);
    equal(model, m);
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

describe('parse(<transparent>)', () => {
  parseOk('transparent', 'rgb', [0, 0, 0], 0);
  parseFail(' transparent', 'rgb', [0, 0, 0], 0);
  parseFail('transparent ', 'rgb', [0, 0, 0], 0);
  describe('non-case sensitive TrANSParent', () => parseOk('TrANSParent', 'rgb', [0, 0, 0], 0));
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
  const model = 'hsl';
  describe('hsl level 4', () => {
    parseOk('hsl(270 60% 50% / .15)', model, [270, 60, 50], 0.15);
    parseOk('hsl(270 60% 50% / 15%)', model, [270, 60, 50], 0.15);
    parseOk('hsl(0deg 0% 0%)', model, [0, 0, 0], 1);
    parseOk('hsl(-520deg 200% -100%)', model, [-520, 100, 0], 1);
    parseOk('hsl(-520deg 200% -100% / 200%)', model, [-520, 100, 0], 1);
    parseOk('hsl(-520deg 200% -100% / -200%)', model, [-520, 100, 0], 0);
    parseOk('hsl(-520deg 200% -100% / 2)', model, [-520, 100, 0], 1);
    parseOk('hsl(0 0% 0% / 0)', model, [0, 0, 0], 0);
    parseOk('hsl(360deg -10% 0% / 200)', model, [360, 0, 0], 1);
    describe('deg', () => parseOk('hsl(270deg 60% 70%)', model, [270, 60, 70], 1));
    describe('rad', () => parseOk('hsl(4.71239rad 60% 70%)', model, [270, 60, 70], 1));
    describe('turn', () => parseOk('hsl(.75turn 60% 70%)', model, [270, 60, 70], 1));
    describe('deg', () => parseOk('hsl(270deg 60% 70% / 0.25)', model, [270, 60, 70], 0.25));
    describe('rad', () => parseOk('hsl(4.71239rad 60% 70% / 0.5)', model, [270, 60, 70], 0.5));
    describe('turn', () => parseOk('hsl(.75turn 60% 70% / 50%)', model, [270, 60, 70], 0.5));
    // s|l without percentage
    parseFail('hsla(100deg 0 0 / 0)');
    parseFail('hsl(0deg 0% 0 / 0)');
    parseFail('hsla(100 255 100% / 0)');
  });
  describe('hsl level 3', () => {
    parseOk('hsl(270, 60%, 50%, .15)', model, [270, 60, 50], 0.15);
    parseOk('hsl(270, 60%, 50%, 15%)', model, [270, 60, 50], 0.15);
    parseOk('hsl(270,60%,70%)', model, [270, 60, 70], 1);
    parseOk('hsl(270, 60%, 70%)', model, [270, 60, 70], 1);
    parseOk('hsl(270 60% 70%)', model, [270, 60, 70], 1);
    describe('deg', () => parseOk('hsl(270deg, 60%, 70%)', model, [270, 60, 70], 1));
    describe('rad', () => parseOk('hsl(4.71239rad, 60%, 70%)', model, [270, 60, 70], 1));
    describe('turn', () => parseOk('hsl(.75turn, 60%, 70%)', model, [270, 60, 70], 1));
    describe('deg', () => parseOk('hsl(270deg, 60%, 70%, 1)', model, [270, 60, 70], 1));
    describe('rad', () => parseOk('hsl(4.71239rad, 60%, 70%, 0.5)', model, [270, 60, 70], 0.5));
    describe('turn', () => parseOk('hsl(.75turn, 60%, 70%, 50%)', model, [270, 60, 70], 0.5));
    parseOk('hsl(240, 100%, 50%)', model, [240, 100, 50], 1);
    parseOk('hsl(240 , 100%, 50%)', model, [240, 100, 50], 1);
    parseOk('hsl(240, 100% , 50%)', model, [240, 100, 50], 1);
    parseOk('hsl(240,100%,50%)', model, [240, 100, 50], 1);
    parseOk('hsl( 240  ,  100% , 50% )', model, [240, 100, 50], 1);
    parseOk('hsl( 240,100%,50% )', model, [240, 100, 50], 1);
    parseOk('hsl( 240     , 0%     ,   0%    )', model, [240, 0, 0], 1);
    parseOk('hsl(-240, 100%, 50%)', model, [-240, 100, 50], 1);
  });
});

describe('parse(<rgb>)', () => {
  const model = 'rgb';
  describe('rgb level 4', () => {
    parseOk('rgb(0 0 0)', model, [0, 0, 0], 1);
    parseOk('rgb(300 256 -100)', model, [255, 255, 0], 1);
    parseOk('rgb(300 256 -100 / -20)', model, [255, 255, 0], 0);
    parseOk('rgba(300 256 -100 / -20)', model, [255, 255, 0], 0);
    parseOk('rgba(300   256   -100    /    -20)', model, [255, 255, 0], 0);
    parseOk('rgb(0 0 0 / 0)', model, [0, 0, 0], 0);
    parseOk('rgb( 0 0 0 / 100)', model, [0, 0, 0], 1);
    parseOk('rgb(0 0 0 / 20%)', model, [0, 0, 0], 0.2);
    parseOk('rgb(0 0 0 / -200%)', model, [0, 0, 0], 0);
    parseOk('rgb(300% 0% 0% / 1)', model, [255, 0, 0], 1);
    parseOk('rgb(100% 0% 0% / 200%)', model, [255, 0, 0], 1);
    parseOk('rgba(255, 0, 153.6, 1)', model, [255, 0, 154], 1);
    parseOk('rgb(0% 42.35% 33.33%)', model, [0, 108, 85], 1);
    parseOk('rgb(41.2% 69.88% 96.64%)', model, [105, 178, 246], 1);
    // parseOk('rgba(1e2, .5e1, .5e0, +.25e2%)', model, [100, 5, 0], 0.25);
    // mixed % with #
    parseFail('rgb(100% 0 0 / 0)');
    parseFail('rgba(100% 0 0 / 0)');
    parseFail('rgba(100% 255 100% / 0)');
  });
  describe('rgb level 3', () => {
    parseOk('rgb(0, 0, 0, 0)', model, [0, 0, 0], 0);
    parseOk('rgba(0, 0, 0, 0)', model, [0, 0, 0], 0);
    parseOk('rgba( 0, 0, 0)', model, [0, 0, 0], 1);
    parseOk('rgb(-100, -20, -1, -2)', model, [0, 0, 0], 0);
    parseOk('rgb(400, 300 , 600, 2)', model, [255, 255, 255], 1);
    parseOk('rgba(0%, 0% , 0%, 0)', model, [0, 0, 0], 0);
    parseOk('rgba(-100 , 0, 0, 0)', model, [0, 0, 0], 0);
    parseOk('rgba(-100, -10, -0, -100)', model, [0, 0, 0], 0);
    parseOk('rgba(500, 400, 281, 100)', model, [255, 255, 255], 1);
    parseOk('rgb(500, 400, 281, 100)', model, [255, 255, 255], 1);
    // mixed % with #
    parseFail('rgba(300%, 255, 281, 100%)');
    parseFail('rgba(300%, 255, 281, 1)');
    parseFail('rgb(300%, 255, 281)');
  });
});

describe('parse(<named-color>)', () => {
  const model = 'rgb';
  parseOk('red', model, [255, 0, 0], 1);
  parseOk('aqua', model, [0, 255, 255], 1);
  parseOk('cyan', model, [0, 255, 255], 1);
  parseOk('rebeccapurple', model, [102, 51, 153], 1);
  parseOk('tomato', model, [255, 99, 71], 1);
  parseOk('mediumaquamarine', model, [102, 205, 170], 1);
  describe('non-case sensitive Red', () => parseOk('Red', model, [255, 0, 0], 1));
  describe('non-case sensitive darkSlateGray', () =>
    parseOk('darkSlateGray', model, [47, 79, 79], 1));
  parseFail('Unnamed');
  parseFail('pinkk');
  parseFail('superblue');
  parseFail('yellowgreenwhite');
});

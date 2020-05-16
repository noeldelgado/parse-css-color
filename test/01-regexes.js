const assert = require('assert').strict;

const {
  hexRe,
  hsl3Re,
  hsl4Re,
  rgb3NumberRe,
  rgb3PercentageRe,
  rgb4NumberRe,
  rgb4PercentageRe,
  transparentRe
} = require('../src/regexes');

const { ok, equal } = assert;

const okTest = (pattern, arr) =>
  arr.forEach((str) => it(`${str} should pass`, () => ok(pattern.test(str))));

const failTest = (pattern, arr) =>
  arr.forEach((str) => it(`${str} should fail`, () => equal(pattern.test(str), false)));

describe('regexes', () => {
  describe('regexes/hexRe', () => {
    const r = hexRe;
    okTest(r, [
      '#00f',
      '#00ff',
      '#00f8',
      '#00f0',
      '#0000FF',
      '#0000ff',
      '#0000FFFF',
      '#0000ffff',
      '#0000FF80'
    ]);
    failTest(r, [
      '0',
      'ff',
      '00ff',
      '00ff0',
      '00ff00',
      '#00ff0',
      '#00g',
      '#z00',
      ' #000',
      '#000 ',
      ' #000 ',
      'red',
      'a#000',
      'a #000',
      '#000 a'
    ]);
  });

  describe('regexes/hsl3Re (level 3)', () => {
    const r = hsl3Re;
    okTest(r, [
      'hsl(240, 100%, 50%)',
      'hsl(240 , 100%, 50%)',
      'hsl(240, 100% , 50%)',
      'hsl(240,100%,50%)',
      'hsl( 240  ,  100% , 50% )',
      'hsl( 240,100%,50% )',
      'hsl( 240     , 0%     ,   0%    )',
      'hsl(-240, 100%, 50%)',

      'hsla(240, 100%, 50%, 1)',
      'hsla(240, 100% , 50%, 0.5)',
      'hsla(240, 100% , 50%, 0)',
      'hsla(0, 100%, 50%, 50%)',
      'hsla(240 , 100%, 50%, 50%)',
      'hsla(240, 100% , 50%, 50%)',
      'hsla(240, 100%, 50% , 50%)',
      'hsla( 240, 100%, 50% , 50% )',
      'hsla(240,100%,50%,50%)',
      'hsla( 240  ,  100% , 50% , 0)',
      'hsla( 240     , 0%     ,   0%  , 1  )',
      'hsla(240, 100%, 50%, 50)',
      'hsla(240, 100%, 50%, 200%)'
    ]);
    failTest(r, [
      'hsl()',
      ' hsl(240, 100%, 50%)',
      'hsl(240, 100%, 50%) ',
      ' hsl(240, 100%, 50%) ',
      'hsl(240%, 100%, 50%)',
      'hsl(240, 100, 50%)',
      'hsl(240, 100%, 50)',
      'hsl(240, 100, 50)',
      'hsl(240%, 100, 50)',

      'hsla()',
      ' hsla(240, 100% , 50%, 50%)',
      'hsla(240, 100% , 50%, 50%) ',
      ' hsla(240, 100% , 50%, 50%) ',
      'hsla(240%, 100% , 50%, 50%)',
      'hsla(240, 100, 50%, 50%)',
      'hsla(240, 100%, 50, 50%)'
    ]);
  });

  describe('regexes/hsl4Re (level 4)', () => {
    const r = hsl4Re;
    okTest(r, [
      'hsl(240deg 100% 50%)',
      'hsl( 240 100% 50% / 100% )',
      'hsl( 240turn 100% 50% / 50%)',
      'hsla( 240rad 100% 50% / 0% )',
      'hsl(100 100% 100%)',
      'hsl(100 100% 100% / 0.5)'
    ]);
    failTest(r, [
      'hsl()',
      'hsl(100)',
      'hsl(100 100%)',
      'hsl(100 100% 100)',
      'hsl(100de 100% 100%)'
    ]);
  });

  describe('regexes/rgb3NumberRe digits (level 3)', () => {
    const r = rgb3NumberRe;
    okTest(r, [
      'rgb(0, 0, 255)',
      'rgba(0, 0, 255, 1)',
      'rgb(500, -100, 255, 1)',
      'rgba(-100, 300, 0, 0.5)'
    ]);
    failTest(r, [
      'rgn(255, 255, 255)',
      'rgb(255 255 255)',
      'rgba(300%, 255, 281, 100%)',
      'rgba(300, 255%, 281, 1)'
    ]);
  });

  describe('regexes/rgb3PercentageRe percentage (level 3)', () => {
    const r = rgb3PercentageRe;
    okTest(r, [
      'rgb(0%, 0%, 100%)',
      'rgba(0%, 0%, 100%, 100%)',
      'rgba(0%, 0%, 100%, 1)',
      'rgba(0%, 0%, 100%, 0.5)'
    ]);
  });

  describe('regexes/rgb4NumberRe digits (level 4)', () => {
    const r = rgb4NumberRe;
    okTest(r, [
      'rgb(0 0 255)',
      'rgb(0 0 255 / 100%)',
      'rgb(0 0 255 / 50%)',
      'rgb(0 0 255 / 0%)',
      'rgb(0 0 255 / 0)',
      'rgb(0 0 255 / 0.5)',
      'rgb(0 0 255 / 1)'
    ]);
  });

  describe('regexes/rgb4PercentageRe percentage (level 4)', () => {
    const r = rgb4PercentageRe;
    okTest(r, [
      'rgb(0% 0% 100% / 100%)',
      'rgb(0% 0% 100% / 50%)',
      'rgb(0% 0% 100% / 1)',
      'rgb(0% 0% 100% / 0.5)',
      'rgb(0% 0% 100% / 0)'
    ]);
  });

  describe('regexs/transparentRe', () => {
    const r = transparentRe;
    okTest(r, ['transparent', 'tRansParent']);
    failTest(r, [' transparent', 'transParent ']);
  });
});

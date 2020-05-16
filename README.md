# parse-css-color

Parse a CSS color string. Usefull for user input validation.

### Supports
* \<color value\>
	* Hexadecimal RGB value: #RGB #RRGGBB
	* #RGBA #RRGGBBAA (4 and 8-digit hexadecimal RGBA notation)
	* RGB/A color module level 3 and 4 (number, percentage)
	* HSL/A color module level 3 and 4 (number, deg, rad, turn)
* \<color keyword\>
	* One of the [pre-defined color keywords](https://www.w3.org/wiki/CSS/Properties/color/keywords).
* transparent
	* Shorthand for transparent black, rgba(0,0,0,0).

### Does not support
* currentColor
* inherit

## Installation

**NPM**

```sh
npm i parse-css-color
```

## Usage
```js
import parse from 'parse-css-color'

// HEX/A
parse('#00f')
//> { type: 'rgb', values: [0, 0, 255], alpha: 1 }
parse('#00f8')
//> { type: 'rgb', values: [0, 0, 255], alpha: 0.5333333333333333 }
parse('#0000FF80')
//> { type: 'rgb', values: [0, 0, 255], alpha: 0.5019607843137255 }
parse('#00g')
//> null

// HSL/A
parse('hsl(270deg 60% 70% / 25%)')
//> { type: 'hsl', values: [270, 60, 70], alpha: 0.25 }
parse('hsl(4.71239rad 260% -70% / 0.5)') // clipped to
//> { type: 'hsl', values: [270, 100, 0], alpha: 0.5 }
parse('hsla(.75turn, 60%, 70%, 50%)')
//> { type: 'hsl', values: [270, 60, 70], alpha: 0.5 }
parse('hsla(100deg 0 0 / 0)') // error: missing percetanges
//> null

// RGB/A
parse('rgb(255 0 0 / 0.5)')
//> { type: 'rgb', values: [255, 0, 0], alpha: 0.5 }
parse('rgb(500 -100 0 / 200%)') // clipped to
//> { type: 'rgb', values: [255, 0, 0], alpha: 1 }
parse('rgba(255, 0, 255, 20%)')
//> { type: 'rgb', values: [255, 0, 255], alpha: 0.2 }
parse('rgba(100% 255 100% / 0)') // error: mixed percetange with integer
//> null
```
See [tests](https://github.com/noeldelgado/parse-css-color/tree/master/test) for more cases.

## Dev
```sh
npm install   # install dependencies
npm test      # run the tests (append `-- -w`) to watch
npm run dev   # watch for changes and rebuild
```

## License
MIT © [Noel Delgado](http://pixelia.me/)

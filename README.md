# Got Scales?

Got Scales? is a simple Javascript module that allows you to create music scales and chords.

## Demo

https://andrewdelprete.github.io/got-scales-riotjs

https://gotscales-react-redux.surge.sh/

https://elm-gotscales.surge.sh

## Install
`> npm install got-scales --save-dev`

## gotScales.note(name)
Creates a new `note` instance.

*name* - The name of the note. Can contain sharps and flats 'C', 'C#', 'Cb'.

### Methods

#### get()
Returns the note `string` passed to the note() method.

#### scale(formula, [,forceFormula])
Creates a `scale` instance using the `note` passed.


## gotScales.scale(formula, [,forceFormula])
Creates a `scale` instance with one of the pre-defined formulas found in `scaleFormulas.js`.

*formula* - The formula parameter can be either a `string` like `Cmaj7` or an array of integers `[0, 3, 7]`.

*forceFormula* - Allows creating a custom formula if it doesn't exist in the pre-defined formulas. `bool` defaults to `false`.

### Methods

#### get(int)
Return a specific note in the scale.

#### getNotes()
Return an `array` of notes in the scale instance.

## Usage
```javascript
import gotScales from 'got-scales'

// How to use
var gMajorScale = gotScales.note('G')
var aCustomScale = gotScales.note('A')

console.log(gMajorScale.scale('major').getNotes()) // ['G','A','B','C','D','E','F# / Gb','G']
console.log(aCustomScale.scale([0, 3, 7, 10, 11], true).getNotes()) // [ 'A', 'C', 'E', 'G', 'G# / Ab' ]

// Chords
var cMajorChord = gotScales.chord('Cmaj') // Can be 'C' or 'CMaj'
var aMinorChord = gotScales.chord('Am') // Can be 'Am' or 'Amin'
console.log(cMajorChord).getNotes()) // ['C','E','G']
console.log(aMinorChord).getNotes()) // ['A','C','E']
```

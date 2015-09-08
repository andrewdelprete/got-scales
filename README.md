# Got Scales? [![Build Status][ci-img]][ci]

[ci-img]: https://travis-ci.org/Pathsofdesign/got-scales.svg
[ci]: https://travis-ci.org/pathsofdesign/got-scales

Got Scales? is a simple Javascript module that allows you to create music scales and chords.

## Install
`> npm install got-scales --save-dev`


## Usage
```javascript
import gotScales from 'got-scales'

// Scales
var gMajorScale = gotScales.note('G')
var aCustomScale = gotScales.note('A')

console.log(gMajorScale.scale('major').getNotes()) // ['G','A','B','C','D','E','F# / Gb','G']
console.log(aCustomScale.scale([0, 3, 7, 10, 11], true).getNotes()) // [ 'A', 'C', 'E', 'G', 'G# / Ab' ]

// Chords
var cMajorChord = gotScales.chord('Cmaj') // Can be 'C' or 'CMaj'
var aMinorChord = gotScales.chord('Am') // Can be 'Am' or 'Amin'
console.log(aMinorChord).getNotes()) // ['A','C','E']
```

# Got Scales? [![Build Status][ci-img]][ci]

[ci-img]: https://travis-ci.org/Pathsofdesign/got-scales.svg
[ci]: https://travis-ci.org/pathsofdesign/got-scales

Got Scales? is a simple Javascript module that allows you to create music scales and chords.

## Install
`> npm install got-scales --save-dev`


## Usage
```javascript
import gotScales from 'got-scales'

var gMajorScale = gotScales.note("G")
var aMinorChord = gotScales.note("A")

console.log(gMajorScale.scale(gotScales.scaleFormulas.major).getNotes()) // ['G','A','B','C','D','E','F# / Gb','G']
console.log(aMinorChord.scale(gotScales.chordFormulas.minor).getNotes()) // ['A','C','E']
```

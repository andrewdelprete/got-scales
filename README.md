# Got Scales? [![Build Status][ci-img]][ci]

[ci-img]: https://travis-ci.org/Pathsofdesign/got-scales.svg
[ci]: https://travis-ci.org/pathsofdesign/got-scales

Got Scales? is a simple Javascript module that allows you to create music scales and chords.

## Install
`> npm install got-scales --save-dev`


## Usage

```javascript
import { gotScales, scaleFormulas, chordFormulas } from 'got-scales'

var gMajorScale = gotScales.create("G", scaleFormulas.major)
var aMinorChord = gotScales.create("A", chordFormulas.minor)

console.log(gMajorScale.getNotes()) // ['G','A','B','C','D','E','F# / Gb','G']
console.log(aMinorChord.getNotes()) // ['A','C','E']
```

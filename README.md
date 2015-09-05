# Got Scales?

Got Scales? is a simple Javascript module that allows you to create music scales and chords.

## Install
`> npm install got-scales --save-dev`


## Usage

```javascript
import { gotScales, scaleFormulas, chordFormulas }  from 'got-scales'

var gMajorScale = gotScales.create("G", scaleFormulas.major)
var aMinorChord = gotScales.create("A", chordFormulas.minor)
```

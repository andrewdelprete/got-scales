import test from 'tape';
import { gotScales, scaleFormulas, chordFormulas } from '../src/gotScales.es6';

test('C major scale', function (t) {
    var scale = gotScales.create("C", scaleFormulas.major);
    t.plan(1);
    t.deepEqual(scale.getNotes(), ['C','D','E','F','G','A','B','C']);
});

test('C major chord', function (t) {
    var chord = gotScales.create("C", chordFormulas.major);
    t.plan(1);
    t.deepEqual(chord.getNotes(), ['C','E','G']);
});

test('A minor scale', function (t) {
    var scale = gotScales.create("A", scaleFormulas.minor);
    t.plan(1);
    t.deepEqual(scale.getNotes(), ['A','B','C','D','E','F','G','A']);
});

test('A minor chord', function (t) {
    var chord = gotScales.create("A", chordFormulas.minor);
    t.plan(1);
    t.deepEqual(chord.getNotes(), ['A','C','E']);
});

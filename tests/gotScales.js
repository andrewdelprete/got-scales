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

test('D# major scale', function (t) {
    var scale = gotScales.create("D#", scaleFormulas.minor);
    t.plan(1);
    t.deepEqual(scale.getNotes(), ['D# / Eb', 'F', 'F# / Gb', 'G# / Ab', 'A# / Bb', 'B', 'C# / Db', 'D# / Eb']);
});

test('4th note in C major scale should be F', function (t) {
    var chord = gotScales.create("C", scaleFormulas.major);
    t.plan(1);
    t.equal(chord.get(3), 'F');
});

test('Note specified on create() can either be natural, sharp, or flat.', function (t) {
    t.plan(2);

    var chord = gotScales.create("C", scaleFormulas.major);
    t.equal(chord.rootNote.note, 'C');

    chord = gotScales.create("Bb", scaleFormulas.major);
    t.equal(chord.rootNote.note, 'A# / Bb');
});

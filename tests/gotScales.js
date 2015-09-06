import test from 'tape';
import gotScales from '../src/gotScales.es6';

test('Should return single note', function (t) {
    t.plan(2);

    var note = gotScales.note('C');
    t.deepEqual(note.get(), 'C');

    // Make sure we can just pass in part of the sharp / flat combo and still return the note
    var note = gotScales.note('C#');
    t.deepEqual(note.get(), 'C# / Db');
});

test('Should create scale with the provided root note and pattern', function (t) {
    t.plan(1);

    var note = gotScales.note('C');
    t.deepEqual(note.scale(gotScales.scaleFormulas.major).getNotes(), ['C','D','E','F','G','A','B','C']);
});

test('Should create major scale', function (t) {
    t.plan(1);

    var note = gotScales.note("C");
    t.deepEqual(note.scale(gotScales.scaleFormulas.major).getNotes(), ['C','D','E','F','G','A','B','C']);
});

test('Should create minor scale', function (t) {
    t.plan(1);

    var note = gotScales.note("A");
    t.deepEqual(note.scale(gotScales.scaleFormulas.minor).getNotes(), ['A','B','C','D','E','F','G','A']);
});

test('Should create major chord', function (t) {
    t.plan(1);

    var note = gotScales.note("C");
    t.deepEqual(note.scale(gotScales.chordFormulas.major).getNotes(), ['C','E','G']);
});

test('Should create minor chord', function (t) {
    t.plan(1);

    var note = gotScales.note("A");
    t.deepEqual(note.scale(gotScales.chordFormulas.minor).getNotes(), ['A','C','E']);
});

'use strict';

import _ from 'lodash';

export const notesArray = [
    {
        note: 'A',
        sharpAndFlat: false
    },
    {
        note: 'A# / Bb',
        sharpAndFlat: true
    },
    {
        note: 'B',
        sharpAndFlat: false
    },
    {
        note: 'C',
        sharpAndFlat: false
    },
    {
        note: 'C# / Db',
        sharpAndFlat: true
    },
    {
        note: 'D',
        sharpAndFlat: false
    },
    {
        note: 'D# / Eb',
        sharpAndFlat: false
    },
    {
        note: 'E',
        sharpAndFlat: false
    },
    {
        note: 'F',
        sharpAndFlat: false
    },
    {
        note: 'F# / Gb',
        sharpAndFlat: true
    },
    {
        note: 'G',
        sharpAndFlat: false
    },
    {
        note: 'G# / Ab',
        sharpAndFlat: true
    }
];

/**
 * Scale Patterns
 * @type {Array}
 */
export var scaleFormulas = {
    'major': {
        name: 'Major',
        pattern: [0, 2, 4, 5, 7, 9, 11, 12]
    },
    'minor': {
        name: 'Minor',
        pattern: [0, 2, 3, 5, 7, 8, 10, 12]
    },
    'harmonicMinor': {
        name: 'Harmonic Minor',
        pattern: [0, 2, 3, 5, 7, 8, 9, 12]
    }
};

/**
 * Chord Formulas
 * @type {Array}
 */
export var chordFormulas = {
    'major': {
        name: 'Major',
        pattern: [0, 4, 7]
    },
    'minor': {
        name: 'Minor',
        pattern: [0, 3, 7]
    }
};

/**
 * Create a scale or chord from a given note and formula
 */
export var gotScales = {

    /**
     * Create a scale or chord and add itself to the prototype
     * @param  { String } note
     * @param  { Array } formula
     * @return { Object }
     */
    create: function(note, formula) {
        let music = Object.create(this);
            music.notes = formula.pattern.map((n) => this.sortByNote(note, notesArray)[n]);
            music.formula = formula;
            music.rootNote = note;

        return music;
    },

    /**
     * Retrieve an Array of notes
     * @return { Array }
     */
    getNotes: function() {
        return this.notes.map((n) => n.note);
    },

    /**
     * Returns a newly sorted array starting at a given note
     * @param  { String } note
     * @param  { Array } notesArray
     * @return { Array }
     */
    sortByNote: function (note) {
        let assignedNote = _.find(notesArray, { note });
        let notePosition = _.findIndex(notesArray, assignedNote);
        let afterNote = _.slice(notesArray, notePosition);
        let beforeNote = _.slice(notesArray, 0, notePosition);

        return afterNote.concat(beforeNote, [ assignedNote ]);
    }
};

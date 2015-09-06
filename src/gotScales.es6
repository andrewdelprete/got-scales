'use strict';

import _ from 'lodash';

const notesArray = [
    'A',
    'A# / Bb',
    'B',
    'C',
    'C# / Db',
    'D',
    'D# / Eb',
    'E',
    'F',
    'F# / Gb',
    'G',
    'G# / Ab'
];

/**
 * Scale Patterns
 * @type {Array}
 */
var scaleFormulas = {
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
var chordFormulas = {
    'major': {
        name: 'Major',
        pattern: [0, 4, 7]
    },
    'minor': {
        name: 'Minor',
        pattern: [0, 3, 7]
    }
};

var Helpers = {
    /**
     * Check to see if the note provided is available in a string
     * @param  { String }  haystack
     * @param  { String }  needle
     * @return { Boolean }
     */
    stringHasNote: function (haystack, needle) {
        if (needle.length > 1) {
            // If note is a sharp or flat
            var re = new RegExp(needle + '+', 'i');
        } else {
            // If note is natural
            var re = new RegExp(needle + '$', 'i');
        }

        return re.test(haystack);
    }
}

var NoteFactory = {
    helpers: Helpers,

    create: function(note) {
        // Add NoteFactory as a prototype
        let self = Object.create(NoteFactory);

        // Private Methods
        self.passedNote = note;
        self.rootNote = notesArray.filter((n) => self.helpers.stringHasNote(n, note))[0];

        return self;
    },

    get: function() {
        return this.rootNote;
    },

    scale: function(formula) {
        return ScaleFactory.create(this.passedNote, formula);
    }
}

/**
 * Create a scale or chord from a given note and formula
 */
var ScaleFactory = {
    helpers: Helpers,

    /**
     * Create a scale or chord and add itself to the prototype
     * @param  { String } note
     * @param  { Array } formula
     * @return { Object }
     */
    create: function(note, formula) {
        // Add ScaleFactory as a prototype
        let self = Object.create(ScaleFactory);

        // Private Methods
        // Searches notesArray to find passed note
        self.rootNote = notesArray.filter((n) => self.helpers.stringHasNote(n, note))[0];
        self.notes = formula.pattern.map((n) => self.sortByNote(note)[n]);
        self.formula = formula;

        return self;
    },

    /**
     * Returns a newly sorted array of notes starting at a given note
     * @param  { String } note
     * @param  { Array } notesArray
     * @return { Array }
     */
    sortByNote: function (note) {
        let notePosition = notesArray.indexOf(note);
        let afterNote = _.slice(notesArray, notePosition);
        let beforeNote = _.slice(notesArray, 0, notePosition);

        // Ex: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']
        return afterNote.concat(beforeNote, [ note ]);
    },

    /**
     * Retrieve a specific note from the scale
     * @return { String }
     */
    get: function(int) {
        return this.notes[int]
    },

    /**
     * Retrieve an Array of notes
     * @return { Array }
     */
    getNotes: function() {
        return this.notes;
    }
};

export default {
    note: NoteFactory.create,
    scale: ScaleFactory.create,
    scaleFormulas,
    chordFormulas,
    notesArray
}

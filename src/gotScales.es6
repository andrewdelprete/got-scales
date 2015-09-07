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
        pattern: [0, 4, 7],
        regex: /^[a-g]?(#|b)?(maj)?$/i
    },
    'minor': {
        name: 'Minor',
        pattern: [0, 3, 7],
        regex: /^[a-g]?(#|b)?(m)?(min)?$/i
    }
};

/**
 * A simple helper object that may be used between other objects
 * @type {Object}
 */
var Helpers = {
    /**
     * Fetch a note from the notesArray. Can be in format 'C', 'C#', 'C# / Db'
     * @param  { String }  haystack
     * @return { Boolean }
     */
    fetchNote: function (note) {
        var note = _.find(notesArray, (n) => {
            return _.contains(n, note)
        })

        if (!note) {
            throw new Error('gotScales - Note does not exist.')
        }

        return note
    }
}

/**
 * Create a note object from a given note string
 * @type {Object}
 */
var NoteFactory = {
    helpers: Helpers,

    create: function(note) {

        // Add NoteFactory as a prototype
        let self = Object.create(NoteFactory);

        // Private Methods
        self.passedNote = note;
        self.rootNote = self.helpers.fetchNote(note)

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
        self.rootNote = self.helpers.fetchNote(note)[0];
        self.passedNote = note;
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

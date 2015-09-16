'use strict';

import _ from 'lodash';

import notesArray from './notesArray.js';
import scaleFormulas from './scaleFormulas.js';
import chordFormulas from './chordFormulas.js';

/**
 * A simple helper object that may be used between other objects
 * @type {Object}
 */
export var Helpers = {
    /**
     * Fetch a note from the notesArray. Can be in format 'C', 'C#', 'C# / Db'
     * @param  { String }  haystack
     * @return { Boolean }
     */
    fetchNote: function (note) {
        var natural = new RegExp('^' + note + '$', 'i')
            natural = _.filter(notesArray, (n) => natural.test(n)).toString()

        var sharpOrFlat = new RegExp(note, 'i')
            sharpOrFlat = _.filter(notesArray, (n) => sharpOrFlat.test(n)).toString()

        if (!natural && !sharpOrFlat) {
            throw new Error('gotScales - Note does not exist.')
        }

        return natural ? natural : sharpOrFlat
    },

    /**
     * Returns a newly sorted array of notes starting at a given note
     * @param  { String } note
     * @param  { Array }
     * @return { Array }
     */
    sortByNote: function (note, formula) {
        let interval = null
        let notePosition = _.findIndex(notesArray, (n) => {
            return this.fetchNote(note) == n
        });
        let afterNote = _.slice(notesArray, notePosition);
        let beforeNote = _.slice(notesArray, 0, notePosition);

        // If formula goes passed the first interval of notes, add additional notes to the end of the array
        if (formula instanceof Array) {
            interval = _.max(formula) > 11 ? _.max(formula) : null

            for (let x = 0; x < (interval - 11); x++) {
                beforeNote.push(notesArray[x])
            }

            return afterNote.concat(beforeNote);
        }

        // Ex: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']
        return afterNote.concat(beforeNote, [ note ]);
    },

    /**
     * Find a scale or chord formula by string or array pattern.
     * @param  { Array } formula
     * @param  { Array } formulasType
     * @return { Object }
     */
    findFormula: function (formula, formulasType) {
        // Ex: Cmaj7
        if (typeof formula === 'string') {
            formula = _.find(formulasType, (f) => f.name.toLowerCase() == formula.toLowerCase())
        }

        // Ex: ['C', 'E', 'D', 'B']
        if (formula instanceof Array) {
            formula = _.find(formulasType, { formula })
        }

        if (!formula) {
            throw new Error('gotScales - Scale does not exist.')
        }

        return formula
    },

    /**
     * Checks to see if given char is sharp '#' or flat 'b'
     * @param  { String } note
     * @return { Bool }
     */
    isSharpOrFlat: function (note) {
        var sharpOrFlat = new RegExp('[a-g]#|[a-g]b', 'i')
        return sharpOrFlat.test(note)
    }
}

/**
 * Create a note object from a given note string
 * @type {Object}
 */
export var NoteFactory = {
    helpers: Helpers,

    create: function(note) {

        // Add NoteFactory as a prototype
        let self = Object.create(NoteFactory);

        // Prototype Props / Methods
        self.passedNote = note;
        self.rootNote = self.helpers.fetchNote(note)

        return self;
    },

    /**
     * Retrieve the rootNote
     * @return { Object }
     */
    get: function() {
        return this.rootNote;
    },

    /**
     * A chainable method that returns a scale based upon the passed note.
     * @param  { Array } formula
     * @param  { Bool } forceFormula - Don't check predefined formulas, defaults to false.
     * @return { Object instance of ScaleFactory }
     */
    scale: function(formula, forceFormula) {
        return ScaleFactory.create(this.passedNote, formula, forceFormula);
    }
}

/**
 * Create a scale or chord from a given note and formula
 */
export var ScaleFactory = {
    helpers: Helpers,

    /**
     * Create a scale or chord and add itself to the prototype
     * @param  { String } note
     * @param  { Array } formula
     * @param  { Bool } forceFormula - Don't check predefined formulas, defaults to false.
     * @return { Object }
     */
    create: function(note, formula, forceFormula = false) {
        // Add ScaleFactory as a prototype
        let self = Object.create(ScaleFactory);

        // Prototype Props / Methods
        self.rootNote = self.helpers.fetchNote(note);
        self.passedNote = note;
        self.sortedNotesArray = self.helpers.sortByNote(note, formula)

        // By default we look for the passed formula and return the entire object if found
        if (!forceFormula) {
            self.formula = self.helpers.findFormula(formula, scaleFormulas);
            self.notes = self.formula.pattern.map((n) => self.sortedNotesArray[n]);

        // If forceFormula is set then allow for any pattern to be created and just set it on self.pattern
        } else {
            self.pattern = formula;
            self.notes = self.pattern.map((n) => self.sortedNotesArray[n]);
        }

        return self;
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

/**
 * Create a scale or chord from a given note and formula
 */
export var ChordFactory = {
    helpers: Helpers,

    /**
     * Create a scale or chord and add itself to the prototype
     * @param  { String } note
     * @param  { Array } formula
     * @return { Object }
     */
    create: function(chord) {
        // Add ScaleFactory as a prototype
        let self = Object.create(ChordFactory);
        let note = chord.charAt(0);

        // Prototype Props / Methods
        self.passedChord = chord;
        self.chord = self.fetchChord(chord);

        // Sorts the notesArray by the given rootNote on the chord and appends whether it's a sharp or flat
        let sharpOrFlat = ''

        if (self.helpers.isSharpOrFlat(chord)) {
            sharpOrFlat = chord.charAt(1)
        }

        self.sortedNotesArray = self.helpers.sortByNote(note + sharpOrFlat);
        self.notes = self.chord.pattern.map((c) => self.sortedNotesArray[c]);

        return self;
    },

    /**
     * Fetch a chord from the chordArray by passing a string. The string will be looked up via Regex to see if it matches anything.
     * @param  { String }
     * @return { Object }
     */
    fetchChord: function(chord) {
        var chord = _.find(chordFormulas, (f) => f.regex.test(chord))

        if (!chord) {
            throw new Error('gotScales - Chord does not exist.')
        }

        return chord
    },

    /**
     * Retrieve a specific note from chord
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
    chord: ChordFactory.create,
    scaleFormulas,
    chordFormulas,
    notesArray
}

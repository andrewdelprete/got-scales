/**
 * Chord Formulas
 * @type {Array}
 */
export default [
    {
        name: 'Major',
        pattern: [0, 4, 7],
        regex: /^[a-g]?(#|b)?(maj)?$/i
    },
    {
        name: 'Major7',
        pattern: [0, 4, 7, 11],
        regex: /^[a-g]?(#|b)?(maj)?7$/i
    },
    {
        name: 'Minor',
        pattern: [0, 3, 7],
        regex: /^[a-g]?(#|b)?(m)?(min)?$/i
    }
];

const { getFieldValues } = require('./helpers');

describe('test function that returns fields and values arrays', () => {
    test('should return [name] and ["Anya"] when called with name:Anya', () => {
        const data = {
            name: 'Anya'
        }

        const expectedOutput = {
            fields: ['name = $1'],
            values: ['Anya']
        }
        expect(getFieldValues(data)).toEqual(expectedOutput);
    })

    test('should return fields:[] and values:[] when called with {}', () => {
        const data = {};

        const expectedOutput = {
            fields: [],
            values: []
        }
        expect(getFieldValues(data)).toEqual(expectedOutput);
    })

    test('should return expectedOutput when called with data object', () => {
        const data = {
            firstName: 'Anya',
            lastName: 'Danilova',
            phone: '4168990465'
        };

        const expectedOutput = {
            fields: ['first_name = $1', 'last_name = $2', 'phone = $3'],
            values: ['Anya', 'Danilova', '4168990465']
        }
        expect(getFieldValues(data)).toEqual(expectedOutput);
    })

    test('should return expectedOutput when called with data object', () => {
        const data = {
            firstName: 'Anya',
            lastName: '',
        };

        const expectedOutput = {
            fields: ['first_name = $1', 'last_name = $2'],
            values: ['Anya', '']
        }
        expect(getFieldValues(data)).toEqual(expectedOutput);
    })

    test('should return expectedOutput when called with data object', () => {
        const data = {
            firstName: 'Anya',
            lastName: null,
        };

        const expectedOutput = {
            fields: ['first_name = $1', 'last_name = $2'],
            values: ['Anya', null]
        }
        expect(getFieldValues(data)).toEqual(expectedOutput);
    })

    test('should return expectedOutput when called with data object', () => {
        const data = {
            firstName: 'Anya',
            lastName: undefined,
        };

        const expectedOutput = {
            fields: ['first_name = $1'],
            values: ['Anya']
        }
        expect(getFieldValues(data)).toEqual(expectedOutput);
    })
})

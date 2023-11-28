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
})

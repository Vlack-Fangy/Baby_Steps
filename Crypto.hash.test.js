const CryptoHash = require('./CryptoHash');

describe('CryptoHash{}', () => { 
    it('To see if it implied hash SHA-256', () => {
        expect(CryptoHash('Ostrich')).toEqual('6deacca464f0a12fd69ffead52e3b0bf636ed50edb84ce4d2560e3c5684e4ee7');
    });

    it('produces the same hash with the same input arguments in any order', () => {
        expect(CryptoHash('one', 'two', 'three')).toEqual(CryptoHash('three', 'one', 'two'));
    });
});
import { calculateTotal } from './index';

describe('calculateTotal', () => {
    it('test calculateTotal', () => {
        expect(calculateTotal(1, 1)).toEqual('Total Cost is $1.');
    });

    it('test different numbers', () => {
        expect(calculateTotal(2, 5)).toEqual('Total Cost is $10.');
    });

    it('test 0 input', () => {
        expect(calculateTotal(0, 0)).toEqual('Total Cost is $0.');
    });

    it('test with invalid input', () => {
        expect(calculateTotal(NaN, NaN)).toEqual(null);
    });
});
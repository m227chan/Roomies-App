import { calculateTotal } from './index';

test('test calculateTotal', () => {
    expect(calculateTotal(1, 1)).toEqual('Total Cost is $1.');
});

test('test different numbers', () => {
    expect(calculateTotal(2, 5)).toEqual('Total Cost is $10.');
});

test('test 0 input', () => {
    expect(calculateTotal(0, 0)).toEqual('Total Cost is $0.');
});

test('test with invalid input', () => {
    expect(calculateTotal(NaN, NaN)).toEqual(null);
});
import { deleteExpenses } from './expenseTable';

describe('deleteExpenses', () => {
    const expenses = [
        {
            id: 1,
            idSpender: 44,
            idDebtor: 67,
            amount: 100,
            tag: 'Groceries',
        },
        {
            id: 2,
            idSpender: 44,
            idDebtor: 65,
            amount: 56,
            tag: 'Groceries',
        },
        {
            id: 3,
            idSpender: 34,
            idDebtor: 98,
            amount: 250,
            tag: 'Groceries',
        },
        {
            id: 4,
            idSpender: 34,
            idDebtor: 56,
            amount: 23,
            tag: 'Groceries',
        },
    ];

    it('delete the first element of the expense table', () => {
        expect(deleteExpenses(expenses, 1)).toEqual([
            {
                id: 2,
                idSpender: 44,
                idDebtor: 65,
                amount: 56,
                tag: 'Groceries',
            },
            {
                id: 3,
                idSpender: 34,
                idDebtor: 98,
                amount: 250,
                tag: 'Groceries',
            },
            {
                id: 4,
                idSpender: 34,
                idDebtor: 56,
                amount: 23,
                tag: 'Groceries',
            }
        ]);
    });

    it('delete a middle element in the expenses', () => {
        expect(deleteExpenses(expenses, 2)).toEqual([
            {
                id: 1,
                idSpender: 44,
                idDebtor: 67,
                amount: 100,
                tag: 'Groceries',
            },
            {
                id: 3,
                idSpender: 34,
                idDebtor: 98,
                amount: 250,
                tag: 'Groceries',
            },
            {
                id: 4,
                idSpender: 34,
                idDebtor: 56,
                amount: 23,
                tag: 'Groceries',
            }
        ]);
    });

    it('delete expense with invalid input', () => {
        expect(() => deleteExpenses(expenses, -1)).toThrowError('Invalid input');
    });

    it('delete expense with not found input', () => {
        expect(() => deleteExpenses(expenses, 10)).toThrowError('Invalid input');
    });
});
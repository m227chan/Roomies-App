import { filterExpensesBy } from './expenseTable';

describe('filterExpensesBy', () => {
    const expenses = [
        {
            id: 1,
            idSpender: 22,
            idDebtor: 2,
            amount: 10,
            tag: 'Food',
        },
        {
            id: 2,
            idSpender: 2,
            idDebtor: 21,
            amount: 20,
            tag: 'Groceries',
        },
        {
            id: 3,
            idSpender: 24,
            idDebtor: 14,
            amount: 20,
            tag: 'Groceries',
        },
        {
            id: 4,
            idSpender: 23,
            idDebtor: 22,
            amount: 21,
            tag: 'Groceries',
        },
    ];

    it('filter expenses table based on tag with 1 object in list', () => {
        expect(filterExpensesBy(expenses, 'tag', 'Food')).toEqual([
            {
                id: 1,
                idSpender: 22,
                idDebtor: 2,
                amount: 10,
                tag: 'Food',
            }
        ]);
    });

    it('filter expenses table based on tag with multiple object in list', () => {
        expect(filterExpensesBy(expenses, 'tag', 'Groceries')).toEqual([
            {
                id: 2,
                idSpender: 2,
                idDebtor: 21,
                amount: 20,
                tag: 'Groceries',
            },
            {
                id: 3,
                idSpender: 24,
                idDebtor: 14,
                amount: 20,
                tag: 'Groceries',
            },
            {
                id: 4,
                idSpender: 23,
                idDebtor: 22,
                amount: 21,
                tag: 'Groceries',
            }
        ]);
    });

    it('filter expenses with invalid input', () => {
        expect(() => filterExpensesBy(expenses, 'tag', '')).toThrowError('Invalid input');
    });

    it('filter expenses table based on amount with 1 object in list', () => {
        expect(filterExpensesBy(expenses, 'amount', 10)).toEqual([
            {
                id: 1,
                idSpender: 22,
                idDebtor: 2,
                amount: 10,
                tag: 'Food',
            }
        ]);
    });

    it('filter expenses table based on amount with multiple object in list', () => {
        expect(filterExpensesBy(expenses, 'amount', 20)).toEqual([
            {
                id: 2,
                idSpender: 2,
                idDebtor: 21,
                amount: 20,
                tag: 'Groceries',
            },
            {
                id: 3,
                idSpender: 24,
                idDebtor: 14,
                amount: 20,
                tag: 'Groceries',
            }
        ]);
    });

    it('filter expenses table based on idSpender', () => {
        expect(filterExpensesBy(expenses, 'idSpender', 24)).toEqual([
            {
                id: 3,
                idSpender: 24,
                idDebtor: 14,
                amount: 20,
                tag: 'Groceries',
            }
        ]);
    });

    it('filter expenses table based on idDebtor', () => {
        expect(filterExpensesBy(expenses, 'idDebtor', 14)).toEqual([
            {
                id: 3,
                idSpender: 24,
                idDebtor: 14,
                amount: 20,
                tag: 'Groceries',
            }
        ]);
    });
});
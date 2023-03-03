import { filterGroceryGroupBy } from './index';

describe('filterGroceryGroupBy', () => {

    const group = [
        {
            id: 1,
            item: 'Banana',
            brand: 'Brand',
            store: 'Sobeys',
            price: 10,
        },
        {
            id: 2,
            item: 'Apple',
            brand: 'Brand',
            store: 'Walmart',
            price: 20,
        },
        {
            id: 3,
            item: 'Chocolate',
            brand: 'Brand',
            store: 'Walmart',
            price: 10,
        },
        {
            id: 4,
            item: 'Water',
            brand: 'Kirkland',
            store: 'Costco',
            price: 21,
        }
    ];

    it('filter Grocery Group based on item name with 1 object in list', () => {
        expect(filterGroceryGroupBy(group, 'item', 'Water')).toEqual([
            {
                id: 4,
                item: 'Water',
                brand: 'Kirkland',
                store: 'Costco',
                price: 21,
            }
        ]);
    });

    it('filter Grocery Group based on brand with multiple object in list', () => {
        expect(filterGroceryGroupBy(group, 'brand', 'Brand')).toEqual([
            {
                id: 1,
                item: 'Banana',
                brand: 'Brand',
                store: 'Sobeys',
                price: 10,
            },
            {
                id: 2,
                item: 'Apple',
                brand: 'Brand',
                store: 'Walmart',
                price: 20,
            },
            {
                id: 3,
                item: 'Chocolate',
                brand: 'Brand',
                store: 'Walmart',
                price: 10,
            }
        ]);
    });

    it('filter Group with invalid input', () => {
        expect(() => filterGroceryGroupBy(group, '', '')).toThrowError('Invalid input');
    });

    it('filter Grocery Group based on store name with 1 object in list', () => {
        expect(filterGroceryGroupBy(group, 'store', 'Walmart')).toEqual([
            {
                id: 2,
                item: 'Apple',
                brand: 'Brand',
                store: 'Walmart',
                price: 20,
            },
            {
                id: 3,
                item: 'Chocolate',
                brand: 'Brand',
                store: 'Walmart',
                price: 10,
            }
        ]);
    });

    it('filter Grocery Group based on price name with 1 object in list', () => {
        expect(filterGroceryGroupBy(group, 'price', 21)).toEqual([
            {
                id: 4,
                item: 'Water',
                brand: 'Kirkland',
                store: 'Costco',
                price: 21,
            }
        ]);
    });
});
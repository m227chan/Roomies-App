import { render, screen } from '@testing-library/react';
import DisplayTopGroceryList from './DisplayTopGroceryList';
import '@testing-library/jest-dom'

describe('DisplayTopGroceryList', () => {

    const roomTopGrocery = [
        {
            item: 'Apples',
            Quantity: 5,
            price: 1.50,
        },
        {
            item: 'Bananas',
            Quantity: 1,
            price: 2.90,
        },
        {
            item: 'Chicken',
            Quantity: 2,
            price: 8.99,
        },
    ];

    let displayTopGroceryListComponent;

    function renderComponent() {
        displayTopGroceryListComponent = jest.fn().mockName('displayTopGroceryListComponent');
        render(
            <DisplayTopGroceryList
                roomTopGrocery={roomTopGrocery}
            />,
        );
    };

    it('displays item names of groceries on first render', () => {
        renderComponent();
        expect(screen.getByText(
            'Apples'
        )).toBeInTheDocument();
        expect(screen.getByText(
            'Bananas'
        )).toBeInTheDocument();
        expect(screen.getByText(
            'Chicken'
        )).toBeInTheDocument();
    });

    it('displays quantities of groceries on first render', () => {
        renderComponent();
        expect(screen.getByText(
            'Quantity: x5'
        )).toBeInTheDocument();
        expect(screen.getByText(
            'Quantity: x1'
        )).toBeInTheDocument();
        expect(screen.getByText(
            'Quantity: x2'
        )).toBeInTheDocument();
    });

    it('displays prices of groceries on first render', () => {
        renderComponent();
        expect(screen.getByText(
            '$1.5'
        )).toBeInTheDocument();
        expect(screen.getByText(
            '$2.9'
        )).toBeInTheDocument();
        expect(screen.getByText(
            '$8.99'
        )).toBeInTheDocument();
    });
});
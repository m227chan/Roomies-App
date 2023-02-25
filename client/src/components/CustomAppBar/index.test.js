import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react';
import CustomAppBar from './index';

describe('CustomAppBar', () => {

    it('renders correctly', () => {
        const tree = renderer
            .create(<CustomAppBar />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    // describe('RestaurantList', () => {
    //     it('loads restaurants on first render', () => {
    //         const loadRestaurants = jest.fn().mockName('loadRestaurants');
    //         render(<RestaurantList loadRestaurants={loadRestaurants} />);
    //         expect(loadRestaurants).toHaveBeenCalled();
    //     });
    // });

});
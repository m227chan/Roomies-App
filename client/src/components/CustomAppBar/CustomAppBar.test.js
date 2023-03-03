import React from 'react';
import renderer from 'react-test-renderer';
import CustomAppBar from './index';

describe('CustomAppBar', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<CustomAppBar />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
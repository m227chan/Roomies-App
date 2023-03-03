import React from 'react';
import renderer from 'react-test-renderer';
import SignUp from './index';

describe('SignUp', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<SignUp />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
import React from 'react';
import renderer from 'react-test-renderer';
import JoinCreateRoom from './index';

describe('JoinCreateRoom', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<JoinCreateRoom />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
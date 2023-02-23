

import React from 'react';
import JoinCreateRoom from './index';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('JoinCreateRoom', () => {
    it('should show text', () => {
        const wrapper = shallow(<JoinCreateRoom />);
        const text = wrapper.find('Typography').at(0);
        console.log(text);
        expect(text.text()).toBe('Join or Create a Room');
    })
})

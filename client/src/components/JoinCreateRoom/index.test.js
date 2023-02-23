// test('there is no I in team', () => {
//     expect('team').not.toMatch(/I/);
// });



// import callAPICheckIfRoomExists from './callApiCheckIfRoomExists';
// import fetchMock from 'jest-fetch-mock';

// fetchMock.enableMocks();

// describe('callAPICheckIfRoomExists', () => {
//     test('should return correct response as 0 when given -1 as Room ID', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify({ value: 0 }));

//         const result = await callAPICheckIfRoomExists('http://localhost:3000/', '-1');

//         expect(result.value).toEqual(0);
//     });
// });


// describe('quick maffs test suite', () => {
//     test('2 + 2 is 4', () => {
//       expect(2 + 2).toBe(4);
//     });
//   });

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

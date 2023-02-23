test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
});



import callAPICheckIfRoomExists from './callApiCheckIfRoomExists';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('callAPICheckIfRoomExists', () => {
    test('should return correct response as 0 when given -1 as Room ID', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ value: 0 }));

        const result = await callAPICheckIfRoomExists('http://localhost:3000/', '-1');

        expect(result.value).toEqual(0);
    });
});
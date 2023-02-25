import CheckIfRoomExists from './CheckIfRoomExists';


global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ express: '[{"value": 0}]' }),
    })
);

let check;

describe('TestIfRoomExists', () => {

    beforeEach(async () => {
        await CheckIfRoomExists('-1')
            .then(value => {check = value});
    });

    it('returns 0 when roomID is -1', () => {
        expect(check).toEqual(0);
    });
});
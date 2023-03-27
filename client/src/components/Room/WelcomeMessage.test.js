import { render, screen } from '@testing-library/react';
import WelcomeMessage from './WelcomeMessage';
import '@testing-library/jest-dom'

describe('WelcomeMessage', () => {
    const roomateData = [
        {
            firstName: 'Bob',
            lastName: 'Boberson',
            idRoom: 10,
            roomName: 'test',
            firebaseUID: '123',
        },
        {
            firstName: 'Jim',
            lastName: 'Jimerson',
            idRoom: 13,
            roomName: 'test1',
            firebaseUID: '456',
        },
        {
            firstName: 'Bill',
            lastName: 'Billerson',
            idRoom: 16,
            roomName: 'test2',
            firebaseUID: '789',
        },
    ];

    const user = {
        uid: '123',
    };

    let welcomeMessage;

    function renderComponent() {
        welcomeMessage = jest.fn().mockName('welcomeMessage');
        render(
            <WelcomeMessage
                roomateData={roomateData}
                user={user}
            />,
        );
    };

    it('displays welcome messages on first render', () => {
        renderComponent();
        expect(screen.getByText(
            'Hello, Bob Boberson!'
        )).toBeInTheDocument();
        expect(screen.getByText(
            'Welcome to test'
        )).toBeInTheDocument();
        expect(screen.getByText(
            'The Room ID for test is 10.'
        )).toBeInTheDocument();
        expect(screen.getByText(
            'Organize all your roommate needs all in one place. Remember to keep everything up-to-date!'
        )).toBeInTheDocument();
    });
});
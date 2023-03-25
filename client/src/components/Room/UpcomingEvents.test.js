import { render, screen } from '@testing-library/react';
import UpcomingEvents from './UpcomingEvents';
import '@testing-library/jest-dom'

describe('UpcomingEvents', () => {
    const upcomingEvents = [
        {
            title: "Birthday Party",
            creator: "Matt",
            start: "2023-04-16 06:30:00",
            end: "2023-04-16 07:30:00",
            allDay: false,
        },
        {
            title: "Quiet Hours",
            creator: "Zach",
            start: "2023-04-01 00:00:00",
            end: "2023-04-18 00:00:00",
            allDay: true,
        },
        {
            title: "Grocery Shopping",
            creator: "Sun",
            start: "2023-03-12 07:30:00",
            end: "2023-07-18 09:30:00",
            allDay: false,
        },
    ];

    let upcomingEventsComponent;

    function renderComponent() {
        upcomingEventsComponent = jest.fn().mockName('upcomingEventsComponent');
        render(
            <UpcomingEvents
                upcomingEvents={upcomingEvents}
            />,
        );
    };

    it('displays titles of upcoming events on first render', () => {
        renderComponent();
        expect(screen.getByText(
            'Birthday Party'
        )).toBeInTheDocument();
        expect(screen.getByText(
            'Quiet Hours'
        )).toBeInTheDocument();
        expect(screen.getByText(
            'Grocery Shopping'
        )).toBeInTheDocument();
    });

    it('displays creators of upcoming events on first render', () => {
        renderComponent();
        expect(screen.getByText(
            'For: Matt'
        )).toBeInTheDocument();
        expect(screen.getByText(
            'For: Zach'
        )).toBeInTheDocument();
        expect(screen.getByText(
            'For: Sun'
        )).toBeInTheDocument();
    });

    it('displays all day dates of upcoming events on first render', () => {
        renderComponent();
        expect(screen.getByText(
            'Apr. 1th, 2023 - Apr. 18th, 2023'
        )).toBeInTheDocument();
    });

    it('displays non all day dates of upcoming events on first render', () => {
        renderComponent();
        expect(screen.getByText(
            'Mar. 12th, 2023; 7:30 AM - 9:30 AM'
        )).toBeInTheDocument();
        expect(screen.getByText(
            'Apr. 16th, 2023; 6:30 AM - 7:30 AM'
        )).toBeInTheDocument();
    });
});
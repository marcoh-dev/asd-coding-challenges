/*
Book Library Notification System

Model the notification system for a library app. When a reservation is created or a book becomes overdue, members get notified through one or more channels (e.g. email, SMS).

Your solution must satisfy these specific requirements:

The Notifiable interface must declare:

    notify(memberId: string, event: string, title: string): void — sends a notification to a member
    getChannelName(): string — returns the name of the channel (e.g. "email")

The BaseNotifier abstract class must implement Notifiable and provide:

    A formatMessage(event: "reservation" | "overdue", title: string): string concrete method that returns a full message string, e.g. "Reminder: 'Dune' is overdue." or "Your reservation for 'Dune' is confirmed."
    An abstract send(memberId: string, message: string): void that subclasses must implement
    A concrete notify(memberId: string, event: "reservation" | "overdue", title: string): void that calls formatMessage then send

Two concrete classes extending BaseNotifier:

    EmailNotifier: implements a mock Email send by logging: Sending email to member #${memberId}: ${message}
    SmsNotifier: implements a mock SMS send by logging: Sending SMS to member #${memberId}: ${message}

A NotificationService class that:

    Accepts an array of Notifiable channels in its constructor (think of these as the notification channels that the user already has enabled)
    Has a dispatch(memberId: string, event: "reservation" | "overdue", title: string): void method that calls notify on every channel

Test your solution by creating a NotificationService with both an EmailNotifier and SmsNotifier, then dispatching a "reservation" event for "Dune" to member "42".
*/

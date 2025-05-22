export interface Event {
    id: string,
    name: string,
    location: string,
    date: Date,
    meetingPoint: string,
    estimatedDuration: string
}

export interface CreateEvent {
    name: string,
    location: string,
    date: Date,
    meetingPoint: string,
    estimatedDuration: string
}
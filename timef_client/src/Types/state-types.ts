import { ColorThemes } from "../State/action-types/color-actions"

export type UserEvent = {
    userId: number,
    eventID: number,
    eventName: string,
    eventDescription: string,
    eventColor: string,
    eventPriority: number,
    eventCreationDate: string,
    eventDueDate: string,
}

export type UserNotes = {
    userName: string,
    noteTitle: string,
    noteContent: string,
    userId: number,
    userYearlyGoal: number,
    email: string,
    noteId: number
}

export type UserProfile = ( {
    email: string,
    userIcon : string,
    userId: number,
    userName : string,
    userYearlyGoal: number,
    bio: string,
    colorTheme : ColorThemes
} | null )

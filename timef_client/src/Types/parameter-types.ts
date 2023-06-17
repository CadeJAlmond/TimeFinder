export interface LoginParams {
    name: string | null;
    password: string | null;
}

export interface RegisterParams {
    name: string | null,
    email: string | null,
    userIcon: string | null,
    password: string | null,
}

export type EventInputs = {
    eventName: string,
    eventDesc: string,
    eventDueDate: string
    eventColor: string
}

export type NoteParams = {
    userName: string,
    noteTitle: string,
    noteContent: string,
}

export type resetPasswordParams = {
    oldpassword : string,
    password : string
}

export type FolderInput = {
    iD: number,
    folderName: string
}

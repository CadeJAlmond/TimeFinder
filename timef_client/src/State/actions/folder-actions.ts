import { Folders } from "../action-types/saga-actions";
import { FolderInput } from "../../Types/parameter-types";

interface CreateFolder {
    type: Folders.CREATE_FOLDER,
    payload: string
}

interface GetFolders {
    type: Folders.GETFOLDERS_REQUEST,
}

interface FolderAddEvent {
    type: Folders.ADDEVENT_REQUEST,
    payload: FolderInput
}

interface FolderAddNote {
    type: Folders.ADDNOTE_REQUEST,
    payload: FolderInput
}

export type SagaFolderAction = (
    GetFolders    |
    CreateFolder  |
    FolderAddNote |
    FolderAddEvent
)
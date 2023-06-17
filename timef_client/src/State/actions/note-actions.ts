import { Notes } from "../action-types/saga-actions";
import { NoteParams} from "../../Types/parameter-types";

interface CreateNote {
    type: Notes.CREATENOTE_REQUEST,
    payload: NoteParams
}

interface GetNotes {
    type: Notes.GETNOTES_REQUEST,
    payload: NoteParams
}

interface UpdateNote {
    type: Notes.UPDATENOTE_REQUEST,
    payload: NoteParams
}

export type SagaNoteAction = (
    GetNotes    | 
    CreateNote  | 
    UpdateNote 
)
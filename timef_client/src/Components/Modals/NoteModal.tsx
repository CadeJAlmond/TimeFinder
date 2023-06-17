import { UserNotes } from '../../Types/state-types'

type NoteModalParams = {
    note: UserNotes,
    open: boolean,
    onClose: () => void
}

export default function NoteModal ({open, note, onClose} : NoteModalParams) {
    if(!open) return <></>
    return(
        <div className="eventModal">
            <div className="content">
                <h1>{note.noteTitle}</h1>
                <h5>{note.noteContent}</h5>
                <p></p>
                <button>Save Changes : </button>
            </div>
        </div>
    )
}
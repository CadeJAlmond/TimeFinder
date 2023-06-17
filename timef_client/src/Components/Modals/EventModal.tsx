import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { UserEvent } from '../../Types/state-types'

type EventModalParams = {
    open: boolean,
    event: UserEvent,
    onClose: () => void
}

export default function EventModal ({open, onClose, event}: EventModalParams) {
    if(!open) return <></>
    return(
        <div className="eventModal">
            <div className="content">
                <div className="modalHeader">
                <h1>{event.eventName}</h1>
                <p onClick={() => onClose()}>CLOSE 
                    <FontAwesomeIcon icon={faX}/>
                </p>
                </div>
                <div className="modalBody">
                    <h3>{event.eventDescription}</h3>
                    <h5>DUE : {event.eventDueDate.substring(0,
                                event.eventDueDate.indexOf('T'))}</h5>
                </div>
            </div>
        </div>
    )
}
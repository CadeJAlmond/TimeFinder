import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { addFolderEvent } from '../State/action-creators/folder-action-creators';
import { createEvent } from '../State/action-creators/event-action-creators';
import { UserEvent, UserProfile } from '../Types/state-types';
import { GenerateRanColor } from '../Utils/ColorGenerator';

// Components for user interactability
import ShortFolderMenu from '../Components/Menus/ShortFolderMenu';
import EventModal from '../Components/Modals/EventModal';

// State management
import { State } from '../State/reducers/root-reducer';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// This component provides a visual display of Events from the User,
// where the events are relevant to the User.
export default function EventsPage() {
    const dateToday = new Date()
    const[displayYear,  setYear   ] = useState(dateToday.getFullYear())
    const[displayMonth, setMonth  ] = useState(dateToday.getMonth())

    const[inputs, setInputs] = useState({
        eventName: "",
        eventDesc: "",
        eventColor: "",
        eventDueDate: "",
        eventPrio: ""
    })
    const[upcomingEvents, setUpcEvents] = useState<any>([])
    const[monthEvents, setMonthEvents ] = useState<any>([])
    const[weekEvents, setWeekEvents   ] = useState<any>([])

    // Variables for Modal
    const[modalDisplay, setModal]    = useState(false)
    const[modalEvent, setModalEvent] = useState<any>(null)

    const formRef = useRef<HTMLFormElement>(null);

    // Get info from State
    type appState = {
        currentUser: UserProfile | null,
        events: any
    };
    const state : appState = useSelector((state : State) => state.auth)

    const updateUserFields = (e: any) =>{
        const target = e.target as HTMLInputElement
        setInputs( prev => ({ ...prev, [target.name]: target.value }) )
    }

    // Create a new Event for the User
    const formSubmit = async (e: any) =>{
        e.preventDefault();
        // Generate a color for the inputs
        inputs.eventColor = GenerateRanColor()
        if(state.currentUser != null) {
            createEvent(inputs)
        }
        formRef.current?.reset();
    }

    // Displays a Modal to the User
    const updateModal = (_ModalEvent: UserEvent) => {
        setModalEvent(_ModalEvent)
        setModal(true)
    }

    const addToFolder = (eventID : number, folderName : string) => {
        addFolderEvent({"iD" : eventID, "folderName" : folderName})
    }

    // Process all events present in a week
    const processWeekEvents = (events: UserEvent[]) => {
        let _weekEvents = []
        let haveWeekInfo = false
        let index = 0;

        while(!haveWeekInfo) {
            const userEvent = events[index]
            const eDate    = userEvent.eventDueDate
            const curDay  = dateToday.getDate()

            const dateSpliceIndex = eDate.indexOf('T')
            const eventDate = eDate.substring(dateSpliceIndex - 2, dateSpliceIndex); 
            index++
            // Are events no longer in the current week?
            if(+(eventDate ) < curDay + 7 && (+eventDate - curDay) >= 0 )
                _weekEvents.push(userEvent)
                
            // Have reached the end of the array ?
            if(index == events.length || index > 5)
                haveWeekInfo = true
        }
        
        return _weekEvents
    }

    // Process all events that are present during a given Month
    const processMonthEvents = (events: UserEvent[]) => {
        let _monthEvents = []
        let haveMonthInfo = false
        let index = 0;

        while(!haveMonthInfo) {
            const userEvent = events[index]
            const eDate     = userEvent.eventDueDate
            const curMonth  = dateToday.getMonth() + 1

            const dateSpliceIndex = eDate.indexOf('T')
            const eventDate = eDate.substring(dateSpliceIndex - 5, dateSpliceIndex); 
            index++

            // Are events no longer in the current month?
            ( +(eventDate.substring(2, 0)) !== curMonth + 1) ?
                _monthEvents.push(userEvent) :
                haveMonthInfo = true           

            // Have reached the end of the array ?
            if(index == events.length || index > 10)
                haveMonthInfo = true
        }
        return _monthEvents
    }

    // Populate the State with Events present in the current
    // week and month
    useEffect( () => {
        //set the data for Upcoming Events section
        const dateRange = ( displayMonth < 10 ?
            `${displayYear}-0${displayMonth + 1}` : `${displayYear}-${displayMonth + 2}`) 
        const events: UserEvent[] = state.events[dateRange]
        let upcEvents = []

        if(events != null && events.length != 0 ) {
            for(let i = 0 ; i < 5 && i !== events.length; i++)
                upcEvents.push(events[i])  
    
            setWeekEvents(processWeekEvents(events))
            setMonthEvents(processMonthEvents(events))
        } 

        setUpcEvents(upcEvents)
    }, [state.events])

    return(        
        <>
        <EventModal open={false} onClose={ () => setModal(false) }
            event={modalEvent}/>
        <div className='eventsPage'>
            <div className="col1">
                <h1>UPCOMING : </h1>
                    <div className="upcomingContainer">
                        {upcomingEvents.map( (event : UserEvent, i: number) =>
                            <div className= {`card blue-${i}`} key={event.eventID} 
                                onClick={()=>updateModal(event)}>
                            <h3>{event.eventName}</h3>
                            <h5>{event.eventDescription}</h5>
                            <p>{event.eventDueDate.substring(0,
                                event.eventDueDate.indexOf('T')
                            )}</p>
                            <ShortFolderMenu
                                    open={true}
                                    activeEvent={ event }
                                    selectFolder={addToFolder}/>
                            </div>
                        )}
                    </div>
                </div>
            <div className="col2">
                <div>
                    <h1>THIS WEEK:</h1>
                </div>
                <div className="cardSection">
                    {weekEvents.map( (event : UserEvent, i: number) =>
                        <div className= {`card1 blue-${i}`} key={i + upcomingEvents.length}
                            onClick={()=>updateModal(event)}>
                            <h3>{event.eventName}</h3>
                            <div className="cardData">
                                <p>{event.eventDueDate.substring(0,
                                    event.eventDueDate.indexOf('T')
                                )}</p>
                                <ShortFolderMenu
                                    open={true}
                                    activeEvent={ event }
                                    selectFolder={addToFolder}/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col3">
                    <form ref = {formRef}>
                        <button onClick={(e) => formSubmit(e)}> 
                            <FontAwesomeIcon icon={faPlus} />
                            Create Event
                        </button>
                        <input type="text" placeholder="Event Name" name="eventName" onChange={updateUserFields}></input>
                        
                        <input className="description" type="text" placeholder="Event Description" name="eventDesc" 
                            onChange={ (e) => updateUserFields(e)}></input>
                        
                        <div className="inputRows">
                            <input type="text" placeholder="Event Due Date" name="eventDueDate" onChange={updateUserFields}></input>
                            
                            <input type="number" placeholder="Event Priority (1-10)" name="eventPrio" onChange={updateUserFields}></input>
                        </div>
                    </form>
                    <div>
                        <h1>THIS MONTH:</h1>
                    </div>
                <div className="monthsSection">
                    <div className="cardSection">
                    {monthEvents.map( (event : UserEvent, i: number) =>
                        <div className= {`card1 blue-${i}`} key={i + weekEvents.length
                                + upcomingEvents.length} onClick={()=>updateModal(event)}>
                            <h3>{event.eventName}</h3>
                            <p>{event.eventDueDate.substring(0,
                                event.eventDueDate.indexOf('T'))}
                            </p>
                            <ShortFolderMenu
                                    open={true}
                                    activeEvent={ event }
                                    selectFolder={addToFolder}/>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

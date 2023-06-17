import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight, faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

import { UserProfile, UserEvent } from '../Types/state-types';
import { getPaddingDays } from '../Utils/DateCalculator';

// Components for user interactability
import FolderMenu from '../Components/Menus/FolderMenu';

// State management
import { State } from '../State/reducers/root-reducer';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function CalendarDisplay() {
    // Variables for Calendar
    const dateToday = new Date()
    const[eventsInMonth, setEvents] = useState<any>([])
    const[displayYear,  setYear   ] = useState(dateToday.getFullYear())
    const[displayMonth, setMonth  ] = useState(dateToday.getMonth() + 1)
    const[folderName, setFolder   ] = useState("")
    const[paddingDays, setPadDays ] = useState(0)

    // Variables for Modal
    const[activeEvent, setActiveEvent] = useState<any>(null)

    const Months = [ "",
        "Jan", "Feb", "Mar", "Apr", "May",
        "Jun", "Jul", "Aug", "Sep", "Oct",
        "Nov", "Dec"];

    // Get Info from State
    const state : appState = useSelector((state : State) => state.auth)

    type appState = {
        folderEvents: {[key: string]: any[]},
        currentUser: UserProfile | null,
        events: {[key: string]: any[]},
    };

    // Display a model containing information about an Event
    const updateModal = (_ModalEvent: UserEvent) => {
        setActiveEvent(_ModalEvent)
    }

    // Set the Folder which will be used to filter the Events
    const searchByFolder = (folderName : string) => 
        setFolder(folderName)

    // Updates the date being used by the Calendar to find User
    // Events
    const updateDates = (incrementDate : boolean) => {
        const changeInTime = (incrementDate) ? 1 : -1 

        if(displayMonth == 12 && incrementDate) {
            setYear(displayYear + 1)
            setMonth(1)
        }
        else if(displayMonth == 1 && !incrementDate) {
            setYear(displayYear - 1)
            setMonth(12)
        }
        else {
            const newMonth = displayMonth + changeInTime
            setMonth(newMonth)
        }
    }

    // This method is meant to create an array representing
    // all days to be displayed given a month. Information included
    // in the Array will be the amount of days not in the month,
    // the days which are not Events, and the actual User Events
    const formatCalendarEvents = (userEvents : UserEvent[]) => {
       let dayCounter = 1;
       let calendar : any = []

       // Pad out all of the days that are not apart of the beginning of the month
       const daysNotInMonth = getPaddingDays(new Date(displayYear, displayMonth - 1, 1))
       for(let i =0; i < daysNotInMonth; i++)
           calendar.push('pad')
       setPadDays(daysNotInMonth - 1)

       // Place the User events into the Array
       for (let i =0; i < userEvents.length; i++) {
           // Format the Event in order to use the event date
           const eventDueDate = userEvents[i].eventDueDate;
           const dateSpliceIndex = eventDueDate.indexOf('T')
           let eventDay = eventDueDate.substring(dateSpliceIndex - 2, dateSpliceIndex); 
           if(eventDay.indexOf('0') == 0) eventDay = (eventDay.substring(0))

           // Place null days, which represent "empty days" until
           // we arrive at the day which the user has an event
           for(let i = dayCounter; i < +(eventDay); i++)
               calendar.push(null)
           // Push the users event into the array and update 
           // the day tracker
           dayCounter = +eventDay + 1 
           calendar.push(userEvents[i])
       }
       // Fill in the rest of the days in the month
       let daysInMonth = new Date(displayYear, displayMonth, 0).getDate();

       for(let i = dayCounter; i < daysInMonth + 1; i++)
           calendar.push(null)
        return calendar
    }

    // If the user Events in the state ever change, compute the data
    // needed for the Calendar
    useEffect( ()=> {
        const dateRange = ( displayMonth < 9 ?
            `${displayYear}-0${displayMonth}` : `${displayYear}-${displayMonth}`) 

        let userEvents = ( state.events[dateRange] == undefined ?
                 [] : state.events[dateRange] )

        // When no Folders are selected
        if(folderName == "") setEvents(formatCalendarEvents(userEvents))

        // Only use Events from the provided Folder
        else {
            const folderEvents = state.folderEvents[folderName]
            const eventIDs = userEvents.map( (userEvent : UserEvent ) => userEvent.eventID )        

            folderEvents == undefined ? 
                setEvents(formatCalendarEvents([])) :
                setEvents(
                    formatCalendarEvents(
                        folderEvents.filter( (e: UserEvent) => eventIDs.includes(e.eventID) )
                    ))
        }
    }, [state.events, folderName , displayMonth, displayYear])

    // Formats the HTML for the User to see their events on a Calendar 
    // -  Null signifies a day without any events,
    // -  'Pad' signifies a day which does not belong to the month
    // -  An Event signifies a User Event
    const UserCalendar = () => {
        return (
            <div className="calendarDisplay">
            {eventsInMonth.map((eventDay : any, i: number) => (
                (eventDay == 'pad') ? (
                    <div className="paddingDay event"/>
                ) :
                eventDay == null ? (
                <div className = "nonEventDay event" key={i}>
                    <p>{i - paddingDays}</p>
                </div> ) : (
                <div className = "eventDay event" key={i} onClick={()=>updateModal(eventDay)} >
                    <div className="eventName">
                        <p>{i - paddingDays}</p>
                        <h3>
                            <div style={{ background: `${eventDay.eventColor}`}}/>
                            {eventDay.eventName}
                        </h3>
                    </div>
                </div>
            )))}
        </div>
        )
    }

    // Display all the events of the User into a custom HTML calendar
    return (
        <>
        <div className="calendarContainer">
            <h1 className="calenBackgroundWord">CALENDAR</h1>
                <div className="calendarNavigation">
                    <div className="displayContent">
                        <h1>{displayYear}: {Months[displayMonth]}</h1>
                        <span className="searchContainer">
                            <FolderMenu 
                                open={true}
                                multiple={false}
                                activeNote={ null }
                                selectFolder={searchByFolder} 
                                onEmptyMsg = {"Search By Folder : "}/>
                        </span>
                        <div className= "calendarNavButtons">
                            <button onClick={ () => updateDates(false) }>
                                <FontAwesomeIcon icon={faLongArrowAltLeft} />
                                Prev
                            </button>
                            <button onClick={ () => updateDates(true) }>
                                Next
                                <FontAwesomeIcon icon={faLongArrowAltRight} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="days">
                    <h2>Sun</h2>
                    <h2>Mon</h2>
                    <h2>Tue</h2>
                    <h2>Wed</h2>
                    <h2>Thu</h2>
                    <h2>Fri</h2>
                    <h2>Sat</h2>
                </div>
                <div className="heroSection">
                    <UserCalendar/>
                    <div className="displayEvent">
                        <h2>Event Display : </h2>
                        { activeEvent != undefined ? 
                        <>
                            <h3>{activeEvent.eventName}</h3>
                            <h4>{activeEvent.eventDueDate}</h4>
                            <p>{activeEvent.eventDescription}</p>
                        </> :
                        <>
                        </>
                        }
                    </div>
                </div>
        </div>
        </>
    )
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faNewspaper , faCircleQuestion, 
    faCalendarDays, faScroll, faFolder, faListCheck } from '@fortawesome/free-solid-svg-icons'

import { ColorThemes } from '../State/action-types/color-actions';
import { State } from '../State/reducers/root-reducer';
import { UserProfile } from '../Types/state-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function NavigationLayout() {
    type colorState = { colorTheme: ColorThemes };
    let colorState : colorState = useSelector((state : State) => state.color)

    type appState = { currentUser: UserProfile };
    const state : appState = useSelector((state : State) => state.auth)

    return(
        <nav className= {`navigationBar ${colorState.colorTheme}`}>
                <div className= {`navTitle ${colorState.colorTheme}`}>
                <Link to='/'><span>TIME FINDER LOGO</span></Link>
                <Link to='/profile'>
                    { state.currentUser !== null ? <h1>{state.currentUser.userName}</h1> : <></> }
                </Link>
                </div>
            <ul className ={`navigationLinks ${colorState.colorTheme}`}>
            { state.currentUser == null ? (
                <>
                <li><Link to='/reviews'  >
                     <FontAwesomeIcon icon={faMagnifyingGlass}/>
                     Reviews </Link>
                </li>
                <li><Link to='/aboutus' > 
                    <FontAwesomeIcon icon={faNewspaper} />
                    About us </Link>
                </li>
                <li><Link to='/help'> 
                    <FontAwesomeIcon icon={faCircleQuestion} />
                    Help</Link>
                </li>    
                </>
            ) : (
                <>
                <li><Link to='/'  >
                    <FontAwesomeIcon icon={faCalendarDays} />
                     Home 
                </Link></li>
                <li><Link to='/events'> 
                    <FontAwesomeIcon icon={faListCheck} />
                    Events </Link>
                </li>
                <li><Link to='/notes'>
                    <FontAwesomeIcon icon={faScroll} />
                     Notes</Link>
                </li>   
                <li><Link to='/folders'> 
                    <FontAwesomeIcon icon={faFolder} />
                    Folders</Link>
                </li>   
                </>
            )}
            </ul>
        </nav>
    )
}

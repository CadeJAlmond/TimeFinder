import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPen, faCaretRight, faCaretLeft, faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

import { loginUser, logoutUser, updateColorTheme } from '../State/action-creators/profile-action-creators';
import { changeColorTheme } from '../State/action-creators/color-actions-creators';
import { getFolders } from '../State/action-creators/folder-action-creators';
import { getEvents } from '../State/action-creators/event-action-creators';

import { ColorThemes } from '../State/action-types/color-actions';
import { UserProfile } from '../Types/state-types';
import { Link, useNavigate } from 'react-router-dom';
import { State } from '../State/reducers/root-reducer';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function SideBar() {
    const[inputs, setInputs] = useState({
        name: "",
        password: "",
    })

    enum menuState { OPEN  = "OPEN", CLOSE = "CLOSE" }
    const[isMenuOpen, setMenuDisplay] = useState<menuState>(menuState.OPEN)

    type appState = { currentUser: UserProfile };
    const state : appState = useSelector((state : State) => state.auth)

    type colorState = { colorTheme: ColorThemes };
    let colorState : colorState = useSelector((state : State) => state.color)

    const updateUserFields = (e : any) => {
        const target = e.target as HTMLInputElement
        setInputs( prev => ({ ...prev, [target.name]: target.value }) )
    }

    const navigate = useNavigate();

    useEffect( () => {
        getFolders()
        if(state.currentUser != null) {
            getEvents(state.currentUser.userName)
        }
        navigate('/')
    }, [state.currentUser] )

    const formSubmit = async (e : any) => {
        e.preventDefault()
        try {
            loginUser(inputs)
        }
        catch(e){
            console.log(e)
        }
    }

    const changeColor = (e : any) => {
        const target = e.target as HTMLInputElement
        const tName = target.name
        switch(tName) {
            case "WARM-01": 
                changeColorTheme(ColorThemes.WARM_THEME)
                if(colorState.colorTheme != ColorThemes.WARM_THEME)
                    updateColorTheme({"colorTheme" : ColorThemes.WARM_THEME})
                break
            case "COOL-01":
                changeColorTheme(ColorThemes.COOL_THEME)
                if(colorState.colorTheme != ColorThemes.COOL_THEME)
                    updateColorTheme({"colorTheme" : ColorThemes.COOL_THEME})
                break
            default:
                break
        }
    }

    const closeSideMenu = () => {
        if(state.currentUser != undefined)
            isMenuOpen == menuState.OPEN ? 
                setMenuDisplay(menuState.CLOSE) :
                setMenuDisplay(menuState.OPEN)
    }

    return(
        <div className={`sideBar ${isMenuOpen}`}>
            { isMenuOpen == menuState.OPEN ? (
            <div className={`content`}>
                <div>
                    <span onClick = { () => closeSideMenu()}>TIME FINDER
                        {state.currentUser != undefined ?
                            <FontAwesomeIcon icon={faChevronCircleLeft}/> : <></>} 
                    </span>
                    <p>Managa tasks, plan events and prepare for everything 
                        that the gift great of life has in store for you !
                    </p>
                </div>
                { state.currentUser == null ? (
                <>
                <div className={`inputs`}>
                    <input type="text" placeholder="Username" name='name' onChange={ (e)=> updateUserFields(e)}></input>
                    <input type="password" placeholder="Password" name='password' onChange={ (e)=> updateUserFields(e)}></input>
                    <button onClick = { (e) => formSubmit(e) } >
                        <FontAwesomeIcon icon={faCaretRight} />
                        Login
                    </button>
                </div>
                <Link to='/register'><button> 
                    <FontAwesomeIcon icon ={faUserPen} /> 
                    Register
                </button></Link>
                </>
                ) : 
                <button onClick = { ()=> logoutUser() } >
                    <FontAwesomeIcon icon={faCaretLeft} />
                    Logout
                </button>
                }
                {state.currentUser != null ? 
                <ul>
                    <li>Profile</li>
                    <Link to='/contacts'><li>Contacts</li></Link>
                </ul> 
                : <></> }
                <h3>Color Themes</h3>
                <div className={`colorTheme`}>
                    <button className="WARM-01" name="WARM-01" onClick ={(e) => changeColor(e)}> Warm </button>
                    <button className="COOL-01" name="COOL-01" onClick ={(e) => changeColor(e)}> Cool </button>
                </div>
                <div className={"buttonIcons"}>
                    <li>Facebook</li>
                    <li>Youtube</li>
                    <li>Instagram</li>
                    <li>TikTok</li>
                </div>
            </div>
            ) :
            <div className={`content`}>
                <span onClick = { () => closeSideMenu()}>
                <FontAwesomeIcon icon={faChevronCircleRight} />
                </span>
            </div>
        }
        </div>
    )
}

import { State } from '../State/reducers/root-reducer';
import { UserProfile } from '../Types/state-types';
import CalendarDisplay from './CalendarDisplay';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function HomePage() {

    type appState = { currentUser: UserProfile };
    const state : appState = useSelector((state : State) => state.auth)

    const LandingPage = () => {
        return (
            <>
                <div>
                    <h2>Welcome to Time Finder :</h2>
                    <p>The world greatest organizational tool and productivity tool ! Start a free account today. Add the vertical orange thing here on the h2.</p>
                </div>
                <div className={`homePost`}>
                    <div className={`content`}>
                        <h1>Plan :</h1>
                            <p>Better</p>
                            <p>Smarter</p>
                            <p>Faster </p>
                            <div className ={`button`}>
                                <Link to='/register'><button>Register</button></Link>
                            </div>
                    </div>
                    <div className={`imgCard`}>
                            <img src="https://plus.unsplash.com/premium_photo-1661775621655-a7f03b54db88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGxhbm5lcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"></img>
                    </div>
                </div> 
            </>
        )
    }

    return (
        <div className={`homePageContainer`}>
            { state.currentUser == null ? ( <LandingPage/> ) : ( <CalendarDisplay/>)}
        </div>
    )
}
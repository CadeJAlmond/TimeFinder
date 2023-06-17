import { ColorThemes } from '../State/action-types/color-actions'
import { State } from '../State/reducers/root-reducer'
import NavigationLayout from './NavigationLayout'
import { useSelector } from 'react-redux'
import {Outlet} from 'react-router-dom'
import SideBar from './SideBar'

export default function RootLayout() {
    type colorState = { colorTheme: ColorThemes };
    let colorState : colorState = useSelector((state : State) => state.color)

    return(
        <>
        <div className={`appContainer ${colorState.colorTheme}`}>
            <SideBar/>
            <div className={`homeContainer ${colorState.colorTheme}`}>
                <NavigationLayout/>
                <Outlet/>
            </div>
        </div>
        </>
    )
}
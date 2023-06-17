import { resetPassword, updateUserBio } from '../State/action-creators/profile-action-creators';
import { UserProfile, UserNotes } from '../Types/state-types';
import { State } from '../State/reducers/root-reducer';
import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

export default function NavigationLayout() {
    type appState = {
        currentUser: UserProfile,
        events: {[key: string]: any},
        folders: string[],
        notes: UserNotes[]
     };
 
    const state : appState = useSelector((state : State) => state.auth)

     console.log(state)

    const[inputs, setInputs] = useState({
        password: "",
        oldpassword: "",
        passwordConfirm   : "",
        oldpasswordConfirm: ""
    })

    const [userBio, setBio ] = useState( state.currentUser != undefined 
        ? state.currentUser.bio  : "" )

    const formRef = useRef<HTMLFormElement>(null);

    const updatePasswordFields = (e : any) =>{
        const target = e.target as HTMLInputElement
        setInputs( prev => ({ ...prev, [target.name]: target.value }) )
    }

    const updateBioFields = (e : any) => {
        const target = e.target as HTMLInputElement
        setBio(target.value)
    }

    const changePassword = () => {
        const oldPassword        = inputs.oldpassword
        const oldPasswordConfirm = inputs.oldpasswordConfirm
        const password        = inputs.password
        const passwordConfirm = inputs.passwordConfirm

        if(oldPassword == oldPasswordConfirm)
            if(password == passwordConfirm) {
                formRef.current?.reset()

                resetPassword({"password" : inputs.password,
                                "oldpassword" : inputs.oldpassword})                
                return
        }
        // PASSWORDS DO NOT MATCH    
        console.log("PASSWORDS NOT MATCH")
    }

    const changeUserBio = () => { 
        if(userBio != state.currentUser?.email)
            updateUserBio(userBio)
    }

    return(
        <div className="profileContainer">
            <div className="profileInfoSection">
                <div className="profile">
                    <img></img>
                    <div className="profileName">
                        <h3>{state.currentUser != null ? state.currentUser.userName : "" }</h3>
                    </div>
                    <textarea value = {userBio} onChange = { (e) => updateBioFields(e) }/>
                    <button onClick ={()=> changeUserBio()} >Update Profile Bio</button>
                </div>
                <form ref={formRef}>
                <h3>Reset Password : </h3>
                    <div>
                        <input placeholder="Password"
                               name="oldpassword"
                               type="password"
                               onChange= {(e) => updatePasswordFields(e)}></input>
                        <input placeholder="Confirm password"
                               name="oldpasswordConfirm"
                               type="password"
                               onChange= {(e) => updatePasswordFields(e)}></input>
                    </div>    
                    <input placeholder="New Password"
                           name="password"
                           type="password"
                           onChange= {(e) => updatePasswordFields(e)}></input>
                    <input placeholder="Confirm New Password"
                           name="passwordConfirm"
                           type="password"
                           onChange= {(e) => updatePasswordFields(e)}></input>
                </form>
                <button onClick ={()=> changePassword()} >Reset Password</button>
            </div>
            <div className="profileStats">
                <div className="card">
                    <h2> Events created :  ???{}</h2>
                </div>
                <div className="card">
                    <h2> Notes created : {state.notes.length}</h2>
                </div>
                <div className="card">
                    <h2>Folders created : {state.folders.length} </h2>
                </div>
                <div className="card">
                    <h2>Friends : ??? </h2>
                </div>
            </div>
        </div>
    )
}
import { requestFriend, searchUsers, getFriends, getPending  } from "../State/action-creators/profile-action-creators";
import { State } from "../State/reducers/root-reducer";
import { UserProfile } from "../Types/state-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function SearchUsersPage() { 
    type appState = { 
        currentUser: UserProfile,     
        users: UserProfile[],
        friends: UserProfile[] 
    }

    const state : appState = useSelector((state : State) => state.auth)

    const[displayProfile, setProfile] = useState<UserProfile>()
    const[friends, setFriends] = useState<UserProfile []>([])
    const[users, setUsers    ] = useState<UserProfile []>([])

    enum userSearch {
        SEARCH_ALL = "SEARCH_ALL",
        SEARCH_FRIENDS = "SEARCH_FRIENDS",
        SEARCH_PENDING = "SEARCH_PENDING"
    }

    const[searchType, setSearchType] = useState<userSearch>(userSearch.SEARCH_ALL)

    const makeReq = (e: any) => {
        const target = e.target as HTMLInputElement
        let tValue = target.value
        searchType == userSearch.SEARCH_ALL ? (
            searchUsers(tValue)
        ) : ( tValue = "" )

        if(tValue == "")
            setProfile(null)
    }

    const sendFriendReq = (user : UserProfile) => {
        requestFriend(user!.userId)
    }

    const filterDisplayedUsers = (targetName : string) => {
        switch(targetName) {
            case "friends" : 
                setSearchType(userSearch.SEARCH_FRIENDS)
                getFriends(state.currentUser!.userName)
                return
            case "pending" :
                setSearchType(userSearch.SEARCH_PENDING)
                getPending(state.currentUser!.userName)
                return
            default :
                setSearchType(userSearch.SEARCH_ALL)
        }
    }

    useEffect( () => {
        if(state.currentUser != undefined) {
            getFriends(state.currentUser.userName)
            getPending(state.currentUser.userName)
        }
    },[])

    useEffect( () => {
        setUsers(state.users != undefined ? state.users.filter( user =>
            ( user?.userName != state.currentUser!.userName ) &&
            !( state.friends.map( friend => (friend!.userName) ).includes(user!.userName) )
        ) : [])
        setFriends(state.friends == undefined ? [] : state.friends )
    },[state.friends, state.users])

    console.log(state.friends)
    return (
        <div className="usersContainer">
            <div className="searchContainer">
                <h1>Contacts</h1>
                <input onChange= { (e) => makeReq(e) } placeholder="Search"/>

                <div className="userDisplayOptions">
                    <div className="card" onClick= { () => filterDisplayedUsers("friends")}>
                        <h4>Friends</h4>
                    </div>
                    <div className="card" onClick = { () => filterDisplayedUsers("pending")}>
                        <h4>Pending</h4>
                    </div>
                    <div className="card" onClick = { () => filterDisplayedUsers("") }>
                        <h4> All </h4>
                    </div>
                </div>
                <div className="friendProfile">
                    { searchType == userSearch.SEARCH_FRIENDS ?
                     friends.map( user =>  
                        <div className="profile" onClick={() => setProfile(user)}>
                            <img></img>
                            <h3>{user?.userName} <button onClick ={() => sendFriendReq(user)}> ADD FRIEND</button> </h3>
                            <p>{user?.email}</p>
                    </div>) :
                     users.map( user =>  
                    <div className="profile" onClick={() => setProfile(user)}>
                        <img></img>
                        <h3>{user?.userName} <button onClick ={() => sendFriendReq(user)}> ADD FRIEND</button> </h3>
                        <p>{user?.email}</p>
                    </div>
                    )}
                </div>
            </div>
            <div className="profileContainer">
                <div className="column">
                    <div className="userInformation">
                        { displayProfile != null ? (
                        <>
                        <h1>{displayProfile?.userName}</h1>
                        <p>{displayProfile?.bio}</p>
                        <textarea/>
                        </>
                        ) : <></>}

                        </div>
                        <div className="chatBox">

                        </div>
                </div>
            </div>
        </div>
    )
}
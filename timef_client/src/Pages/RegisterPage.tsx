import { regUser } from '../State/action-creators/profile-action-creators'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function RegisterPage() {
    const[inputs, setInputs] = useState({
        name: "",
        email: "",
        userIcon: "",
        password: "",
    })

    const updateUserFields = (e : any) =>{
        const target = e.target as HTMLInputElement
        setInputs( prev => ({ ...prev, [target.name]: target.value }) )
    }

    const navigate = useNavigate();

    const formSubmit = async (e : any) =>{
        e.preventDefault()
        try{
            regUser(inputs)
            navigate("/")
        }
        catch(e){
            console.log(e)
        }
    }

    return (
        <div className="authFormContainer">
            <form>
            <input type="text" placeholder="Username" name='name' onChange={ (e)=> updateUserFields(e)}></input>
            <input type="text" placeholder="Email" name='email' onChange={ (e)=> updateUserFields(e)}></input>
            <input type="password" placeholder="Password" name='password' onChange={ (e)=> updateUserFields(e)}></input>
            <button onClick={ (e)=> formSubmit(e)}> Register Account</button>
            </form>
        </div>
    )
}
import { useState, type FormEvent, type ChangeEvent } from "react";
import { supabase } from "../lib/supabase";

interface registrationDetail {
    email: string,
    username: string
    password: string,
};


function Registration_form(){

    const [registerData, setRegisterData] = useState<registrationDetail>({
        email: '',
        username: '',
        password: ''
    })

    const [message, setMessage] = useState('')

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target
        setRegisterData((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e: FormEvent){
        e.preventDefault()
        try {
            const {data, error: signUpError} = await supabase.auth.signUp({
                email: registerData.email,
                password: registerData.password
            })

            if(!signUpError){
                setMessage('check your email for confirmation')
                setRegisterData({
                    email: '',
                    username: '',
                    password: ''
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
             <form onSubmit={handleSubmit} style={{border: '1px solid black', width:'70%',
                    margin: '1em auto', height: '300px', display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-evenly', alignItems: 'center'}} >

                <h1 style={{textTransform: 'capitalize'}}>registration form</h1>
                
                <div>
                    <label htmlFor='email'>
                    email
                    </label>
                    <input 
                        type="email"
                        id='email'
                        name='email'
                        value={registerData.email}
                        onChange={handleChange}
                        autoFocus
                    />
                </div>
                
                <div>
                    <label htmlFor="username">
                        username
                    </label>
                    <input 
                        type="text"
                        id="username" 
                        name='username'
                        value={registerData.username}
                        onChange={handleChange}
                    />
                </div>
                
                <div>
                    <label htmlFor="password">
                        password
                    </label>
                    <input 
                        type="password"
                        id="password"
                        name='password'
                        value={registerData.password}
                        onChange={handleChange} />
                </div>

                <div>
                    <button>register account</button>
                </div>
            </form>
            <h2 style={{color: 'red', textAlign: 'center'}}>{message}</h2>
        </div>
    )
}

export default Registration_form
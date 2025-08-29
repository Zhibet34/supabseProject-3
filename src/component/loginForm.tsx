import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

interface loginInterface {
    email: string,
    password: string
}

function LoginForm(){
    const [loginData, setLoginData] = useState<loginInterface>({
        email: '',
        password: ''
    });

    const homeRedirect = useNavigate()

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setLoginData((prev)=>({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = async (e:FormEvent)=>{
        e.preventDefault();
        try {
            const {error: loginError} = await supabase.auth.signInWithPassword({
                email: loginData.email,
                password: loginData.password
            });

            if (loginError){
                console.log(loginError)
                return
            }
            homeRedirect('/')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>login form</h1>
            <div>
                <label htmlFor="email">
                    email
                </label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    autoFocus
                />
            </div>

            <div>
                <label htmlFor="password">
                    password
                </label>
                 <input 
                    type="password"
                    id="password"
                    name="password"  // Move this up
                    value={loginData.password}
                    onChange={handleChange}
                />
            </div>

            <div>
                <button>login</button>
            </div>
        </form>
    )
}

export default LoginForm
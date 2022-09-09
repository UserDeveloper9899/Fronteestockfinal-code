import {createContext,useState,useEffect,React} from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate} from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children})=>
{
    let[authTokens,setAuthToken]=useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let[user,setUser]=useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
let[loading,setloading]=useState(true)
    const navg=useNavigate();
    let loginUser = async(e)=>
    {
        e.preventDefault();
        console.log('Form Submitted');
        let response=fetch('http://127.0.0.1:8000/token',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
                body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
            })
            let data=await response.json()
            if(response.status === 200)
            {
                setAuthToken(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens',JSON.stringify(data))
                navg('/')
            }
            else
            {
                alert("Something went wrong");
            }
            // console.log('data:',data)
        }

        let logout= () =>{
            setAuthToken(null)
            setUser(null)
            localStorage.removeItem('authTokens')
            navg('/login')
        }

        let updateToken= async()=>
        {
            let response=fetch('http://127.0.0.1:8000/token/refresh/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                    body:JSON.stringify({'refresh': authTokens.refresh})
                })
                let data=await response.json()
                if(response.status === 200)
                {
                    setAuthToken(data)
                    setUser(jwt_decode(data.access))
                    localStorage.setItem('authTokens',JSON.stringify(data))
                    navg('/')
                }
                else
                {
                    logout();
                }
                // console.log('data:',data)  
        }
    let contextData={
        user:user,
        loginUser:loginUser,
        logout:logout
    }

useEffect(()=>
{
    let fourMin=1000*60*4
    let interval=setInterval(()=>
    {
        if(authTokens){
            updateToken()
        }
    },2000)
return()=>clearInterval(interval)
},[authTokens,loading])


    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>

    )
}
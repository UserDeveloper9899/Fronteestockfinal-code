import React ,{useContext}from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
  let {loginUser}=useContext(AuthContext);
  return (
    <div>
    <h2 align="center">LoginPage</h2>
    
    <form align="center"  onSubmit={loginUser}>
    <input type="text" name="username" placeholder="Enter ur name"/>
    <br/><br/>
    <input type="password" name="password" placeholder="Enter password"/><br/><br/>
    <input type="submit"/>
    </form>
    
    </div>
  )
}

export default LoginPage
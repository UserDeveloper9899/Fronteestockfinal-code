import React from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
const PrivateRoute = ({children,...rest}) => {
  let {user}=useContext(AuthContext)
  return (
    <BrowserRouter>
    <Routes>
    <Route {...rest}>{ user ? children :  <Navigate to="/login" />}</Route>
    </Routes>
    </BrowserRouter>
    );
}

export default PrivateRoute;
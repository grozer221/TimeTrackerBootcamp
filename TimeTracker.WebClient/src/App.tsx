import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {Error} from "./components/Error/Error";
import './App.css';
import 'antd/dist/antd.css';
import {LogInPage} from "./components/Pages/Auth/LogInPage";
import {useDispatch} from "react-redux";
import {authActions} from "./store/auth/auth.actions";

export const App = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(authActions.meAsync())
    },[])

    return (
        <Routes>
            <Route index element={<h1>## Huge TimeTracker ##</h1>}/>

            <Route path={"auth/*"}>
                <Route path="LogIn" element={<LogInPage/>} />
            </Route>

            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
}
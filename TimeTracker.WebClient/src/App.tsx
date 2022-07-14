import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {LogInPage} from "./pages/Auth/LogInPage";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "./store/auth/auth.actions";
import {RootState} from "./store/store";
import {AuthenticatedApp} from './AuthenticatedApp';
import './App.css';
import 'antd/dist/antd.css';

export const App = () => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authActions.meAsync())
    }, [])

    if (isAuth)
        return <AuthenticatedApp/>

    return (
        <Routes>
            <Route path={"auth/*"}>
                <Route path="login" element={<LogInPage/>}/>
            </Route>
            <Route path={"*"} element={<Navigate to={"/auth/login"}/>}/>
        </Routes>
    );
}
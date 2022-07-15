import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {LogInPage} from "./pages/auth/AuthLoginPage/LogInPage";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "./store/auth/auth.actions";
import {RootState} from "./store/store";
import {AuthenticatedApp} from './AuthenticatedApp';
import {Notifications} from "./components/Notifications/Notifications";
import {NavigateTo} from "./components/NavigateTo/NavigateTo";
import 'antd/dist/antd.css';
import './App.css';

export const App = () => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authActions.meAsync())
    }, [])

    return (
        <>
            <Notifications/>
            <NavigateTo/>
            {isAuth
                ? <AuthenticatedApp/>
                : <Routes>
                    <Route path={"auth/*"}>
                        <Route path="login" element={<LogInPage/>}/>
                    </Route>
                    <Route path={"*"} element={<Navigate to={"/auth/login"}/>}/>
                </Routes>
            }
        </>
    );
}
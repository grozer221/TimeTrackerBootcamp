import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Error} from "./components/Error/Error";
import './App.css';
import 'antd/dist/antd.css';
import {LogInPage} from "./components/Pages/Auth/LogInPage";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "./store/auth/auth.actions";
import {RootState} from "./store/store";
import {AppLayout} from "./components/AppLayout/AppLayout";


const Conponent = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        navigate(-1)
    },[])

    return (
        <AppLayout>
            <Routes>
                <Route index element={<h1>## Huge TimeTracker ##</h1>}/>
                <Route path={'*'} element={<Error/>}/>
            </Routes>
        </AppLayout>
    )
}


export const App = () => {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authActions.meAsync())
    }, [])

    if (isAuth){
        return <Conponent/>
    }

    return (
        <Routes>
            <Route path={"auth/*"}>
                <Route path="LogIn" element={<LogInPage/>}/>
            </Route>
            <Route path={"*"} element={<Navigate to={"/auth/login"}/>}/>
        </Routes>

    );
}
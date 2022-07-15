import React, {useEffect} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import {LogInPage} from "./pages/auth/AuthLoginPage/LogInPage";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "./store/auth/auth.actions";
import {RootState} from "./store/store";
import {Notifications} from "./components/Notifications/Notifications";
import {NavigateTo} from "./components/NavigateTo/NavigateTo";
import {Loading} from "./components/Loading/Loading";
import {CalendarPage} from "./pages/CalendarPage/CalendarPage";
import {CalendarDaysCreatePage} from "./pages/calendarDays/CalendarDaysCreatePage/CalendarDaysCreatePage";
import {Error} from "./components/Error/Error";
import {CalendarDaysUpdatePage} from "./pages/calendarDays/CalendarDaysUpdatePage/CalendarDaysUpdatePage";
import {CalendarDaysRemovePage} from "./pages/calendarDays/CalendarDaysRemovePage/CalendarDaysRemovePage";
import {AppLayout} from "./components/AppLayout/AppLayout";
import 'antd/dist/antd.css';
import './App.css';

export const App = () => {
    const initialised = useSelector((state: RootState) => state.app.initialised)
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)
    const dispatch = useDispatch()
    const location = useLocation();
    // @ts-ignore
    const popup = location.state && location.state.popup;

    useEffect(() => {
        dispatch(authActions.meAsync())
    }, [])

    if (!initialised)
        return <Loading/>

    return (
        <>
            <Notifications/>
            <NavigateTo/>
            <AppLayout>
                <Routes location={popup || location}>
                    <Route path={'calendar/*'} element={<CalendarPage/>}>
                        <Route path={'*'} element={<Error/>}/>
                    </Route>
                    <Route path={"auth/*"}>
                        <Route path="login" element={<LogInPage/>}/>
                    </Route>
                    <Route path={'error'} element={<Error/>}/>
                    <Route path={'error/:statusCode'} element={<Error/>}/>
                    <Route path={'*'} element={<Error/>}/>
                </Routes>
                {popup && (
                    <Routes>
                        <Route path={'calendar/*'}>
                            <Route path={'days/*'}>
                                <Route path="create" element={<CalendarDaysCreatePage/>}/>
                                <Route path="update/:date" element={<CalendarDaysUpdatePage/>}/>
                                <Route path="remove" element={<CalendarDaysRemovePage/>}/>
                                <Route path="remove/:date" element={<CalendarDaysRemovePage/>}/>
                            </Route>
                        </Route>
                    </Routes>
                )}
            </AppLayout>
        </>
    );
}
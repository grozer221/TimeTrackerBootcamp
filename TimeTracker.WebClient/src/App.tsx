import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
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
import {CalendarDaysViewPage} from "./pages/calendarDays/CalendarDaysViewPage/CalendarDaysViewPage";
import {AuthLoginPage} from './pages/auth/AuthLoginPage/AuthLoginPage';
import 'antd/dist/antd.css';
import './App.css';
import './styles/Table.css';
import './styles/AntDesignOverride.css';

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
            {isAuth
                ? <AppLayout>
                    <Routes location={popup || location}>
                        <Route index element={<Navigate to={'/time-tracker'}/>}/>
                        <Route path={'calendar/*'} element={<CalendarPage/>}>
                            <Route path={'*'} element={<Error/>}/>
                        </Route>
                        <Route path={'error'} element={<Error/>}/>
                        <Route path={'error/:statusCode'} element={<Error/>}/>
                        <Route path={'*'} element={<Error/>}/>
                    </Routes>
                    {popup && (
                        <Routes>
                            <Route path={'calendar/*'}>
                                <Route path={'days/*'}>
                                    <Route path=":date" element={<CalendarDaysViewPage/>}/>
                                    <Route path="create" element={<CalendarDaysCreatePage/>}/>
                                    <Route path="update/:date" element={<CalendarDaysUpdatePage/>}/>
                                    <Route path="remove" element={<CalendarDaysRemovePage/>}/>
                                    <Route path="remove/:date" element={<CalendarDaysRemovePage/>}/>
                                </Route>
                            </Route>
                        </Routes>
                    )}
                </AppLayout>
                : <Routes>
                    <Route path={"auth/*"}>
                        <Route path="login" element={<AuthLoginPage/>}/>
                    </Route>
                    <Route path={'*'} element={<Navigate to={'/auth/login'}/>}/>
                </Routes>
            }
        </>
    );
}
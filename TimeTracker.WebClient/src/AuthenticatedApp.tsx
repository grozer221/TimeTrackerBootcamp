import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {AppLayout} from "./components/AppLayout/AppLayout";
import {Error} from "./components/Error/Error";
import {CalendarPage} from "./pages/CalendarPage/CalendarPage";
import {CalendarDaysCreatePage} from "./pages/calendarDays/CalendarDaysCreatePage/CalendarDaysCreatePage";
import {CalendarDaysRemovePage} from "./pages/calendarDays/CalendarDaysRemovePage/CalendarDaysRemovePage";
import {CalendarDaysUpdatePage} from "./pages/calendarDays/CalendarDaysUpdatePage/CalendarDaysUpdatePage";

export const AuthenticatedApp = () => {
    const navigate = useNavigate()
    const location = useLocation();
    // @ts-ignore
    const popup = location.state && location.state.popup;

    return (
        <AppLayout>
            <Routes location={popup || location}>
                <Route path={'calendar/*'}>
                    <Route index element={<CalendarPage/>}/>
                    <Route path={'days/*'}>
                        <Route path="create" element={<CalendarDaysCreatePage/>}/>
                    </Route>
                    <Route path={'*'} element={<Error/>}/>
                </Route>
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
    )
}
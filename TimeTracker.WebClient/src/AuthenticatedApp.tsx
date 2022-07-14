import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {AppLayout} from "./components/AppLayout/AppLayout";
import {Error} from "./components/Error/Error";
import {CalendarPage} from "./pages/CalendarPage/CalendarPage";
import {CalendarDaysCreatePage} from "./pages/calendarDays/CalendarDaysCreatePage/CalendarDaysCreatePage";

export const AuthenticatedApp = () => {
    const navigate = useNavigate()
    const location = useLocation();
    // @ts-ignore
    const background = location.state && location.state.background;

    useEffect(() => {
        navigate(-1)
    }, [])

    return (
        <AppLayout>
            <Routes location={background || location}>
                <Route path={'calendar/*'}>
                    <Route index element={<CalendarPage/>}/>
                    <Route path={'days/*'}>
                        <Route path="create" element={<CalendarDaysCreatePage/>}/>
                    </Route>
                    <Route path={'*'} element={<Error/>}/>
                </Route>
                <Route path={'*'} element={<Error/>}/>
            </Routes>
            {background && (
                <Routes>
                    <Route path={'calendar/*'}>
                        <Route path={'days/*'}>
                            <Route path="create" element={<CalendarDaysCreatePage/>}/>
                        </Route>
                    </Route>
                </Routes>
            )}
        </AppLayout>
    )
}
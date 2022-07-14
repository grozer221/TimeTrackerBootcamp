import {Link, Route, Routes, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {AppLayout} from "./components/AppLayout/AppLayout";
import {Button} from "antd";
import {Error} from "./components/Error/Error";
import {Calendar} from "./pages/Calendar/Calendar";

export const AuthenticatedApp = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate(-1)
    }, [])

    return (
        <AppLayout>
            <Routes>
                <Route path={'calendar'} element={<Calendar/>}/>
                <Route path={'*'} element={<Error/>}/>
            </Routes>
        </AppLayout>
    )
}
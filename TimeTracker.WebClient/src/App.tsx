import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Error} from "./components/Error/Error";
import './App.css';
import 'antd/dist/antd.css';

export const App = () => {
    return (
        <Routes>
            <Route index element={<h1>Huge TimeTracker</h1>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    );
}
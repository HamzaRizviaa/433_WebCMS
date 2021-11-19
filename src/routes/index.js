import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={Home}/>
            <Route path='abc' element={<h1>HOW</h1>}/>
        </Routes>
    )
}

export default AppRoutes

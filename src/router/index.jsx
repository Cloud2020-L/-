// App - List - Edit - Means
// Login
// Register
import App from '../App';
import ListList from '../pages/ListList';
import Edit from '../pages/Edit';
import Means from '../pages/Means';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import ListTable from '../pages/ListTable';

const BaseRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<App></App>}>
                    <Route path='/listtable' element={<ListTable></ListTable>}></Route>
                    <Route path='/listlist' element={<ListList></ListList>}></Route>
                    <Route path='/edit' element={<Edit></Edit>}></Route>
                    <Route path='/edit/:id' element={<Edit></Edit>}></Route>
                    <Route path='/means' element={<Means></Means>}></Route>
                </Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/register' element={<Register></Register>}></Route>
            </Routes>
        </Router>
    );
};

export default BaseRouter;

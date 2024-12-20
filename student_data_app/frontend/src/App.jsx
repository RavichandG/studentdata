import { useState } from 'react'
import { useEffect,useRef } from 'react';
import './App.css'
import { Routes } from 'react-router';
import { Route } from 'react-router';
import Loginpage from './components/Loginpage';
import StudentsTable from './components/StudentsTable';
import ProtectedRoutes from './ProtectedRoutes';
function App() {
  
  

  return (
    <>
     <Routes>
      <Route path='/' element={<Loginpage></Loginpage>}></Route>
      <Route element={<ProtectedRoutes></ProtectedRoutes>}>
       <Route path='/details/student' element={<StudentsTable></StudentsTable>}></Route>
      </Route>
     </Routes>
    </>
  );

}

export default App

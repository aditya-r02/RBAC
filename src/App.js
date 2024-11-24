import data from "./data/users";
import './App.css';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setList } from "./redux/UserList";

function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(setList(data));
  },[])

  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center relative">
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<Dashboard/>} path='/dashboard'/>
      </Routes>
    </div>
  );
}

export default App;

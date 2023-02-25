import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from './components/register/Register';
import Login from './components/login/Login';
import Recipe from './components/recipe/Recipe';
import Addnew from './components/recipe/Addnew';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Recipe/>}/>
        <Route path='/addnew' element={<Addnew/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

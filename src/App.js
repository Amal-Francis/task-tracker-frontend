import Home from "./Home";
import Login from "./Login";
import Register from './Register';
import Dashboard from './Dashboard';
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  
  </BrowserRouter>
  )
}

export default App;

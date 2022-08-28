import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Index from './routes/Index'
import Login from './routes/Login'
import Register from './routes/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

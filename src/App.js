import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import View from "./pages/View"
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import { useAuth } from './context/AuthProvider';

function App() {

  const { user } = useAuth();


  return (
    <>

      <BrowserRouter>
        <ToastContainer theme="colored" />
        {user ? <><Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/product/:id" element={<View />}></Route>
          </Routes>
          <Footer /></> : <Login />
        }

      </BrowserRouter>



    </>
  );
}

export default App;

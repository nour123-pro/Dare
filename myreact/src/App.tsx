import './assets/style.css'
import './Components/NavBar'
import './assets/style.css'
import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MainPage from './Components/MainPage'
import SingleBrandPage from './Components/SingleBrandPage'
import Loader from './Components/Loader'
import SignIn from './Components/SignIn'
import Login from './Components/Login'
import SingleProductPage from './Components/SingleProductPage'
import "./App.css";
import Cart2 from './Components/Cart2'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AdminPanel from './Components/AdminPanel'
import CheckOutPage from './Components/CheckOutPage'
import { CartProvider } from './Contexts/CartContext'
function App() {
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
     <CartProvider>
    <GoogleOAuthProvider clientId="1074491542320-rhsjnlvkvskfeh4ookrdl25muk14vrjc.apps.googleusercontent.com" >
      {isLoading ? (
        <Loader />
      ) : (
        < div className='fade-in'>
        <Router>
         
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/brand" element={<SingleBrandPage brandSelectedId={null} />} />
            <Route path='/Welcome' element={<SignIn></SignIn>}></Route>
            <Route path='/WelcomeOldUser' element={<Login></Login>}></Route>
          <Route path='/Dare' element={<SingleProductPage ></SingleProductPage>}></Route>
          <Route path='/Cart2' element={<Cart2></Cart2>}></Route>
          <Route path='/Managment' element={<AdminPanel></AdminPanel>}></Route>
          <Route path='/Check' element={<CheckOutPage></CheckOutPage>}></Route>
          </Routes>
         
        </Router>
        </div>
      )}
      </GoogleOAuthProvider>
      </CartProvider>
    </>
  );
}

export default App;


import { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Cart,
  Checkout,
  Home,
  Login,
  ProductDetails,
  ProductList,
  SignUp,
  MyAccountLayout,
  AccountDetails,
  Orders,
  OrderSuccess,
  OrderFailed,
  MyWishlist,
} from './pages/index';
import {
  Header,
  Footer
} from './components/index';



function App() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, []);

//  useEffect(() => {
//   console.log("USER:", JSON.parse(localStorage.getItem("user")));
//   console.log("TOKEN:", localStorage.getItem("token"));
//   }, []);

  return (
   <BrowserRouter>
   <div>
    <Header />
    <div className='mainContent mainwindow'>
      <Routes>
        <Route path='/' exact={true} element={<Home/>}/>
        <Route path='/login' exact={true} element={<Login/>}/>
        <Route path='/signup' exact={true} element={<SignUp/>}/>
        <Route path='/products/:categorySlug' exact={true} element={<ProductList/>}/>
        <Route path='/products/:categorySlug/:id' exact={true} element={<ProductDetails/>}/>
        <Route path='/cart' exact={true} element={<Cart/>}/>
        <Route path='/checkout' exact={true} element={<Checkout/>}/>
        <Route path='/order-success' exact={true} element={<OrderSuccess/>}/>
        <Route path='/order-failed' exact={true} element={<OrderFailed/>}/>
        <Route path='/my-account' exact={true} element={<MyAccountLayout />}>
          <Route index element={<AccountDetails />} />
          <Route path='orders' element={<Orders />} />
          <Route path='wishlist' element={<MyWishlist />} />
        </Route>

      </Routes>
    </div>
   </div>
   <Footer />
   </BrowserRouter>
  )
}

export default App

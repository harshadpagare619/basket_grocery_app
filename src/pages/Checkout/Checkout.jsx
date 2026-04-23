import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { clearCart} from '../../features/cart/cartSlice';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import axios from 'axios';

function Checkout() {

  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: '',
    streetLine1: '',
    streetLine2: '',
    city: '',
    pincode: '',
    phone: '',
    email: '',
    notes: ''
  })

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const shipping = subtotal > 200 ? 0 : 50;
  const grandTotal = subtotal + shipping;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, []);

  useEffect(() => {

    if(!token) {
      navigate("/login", { state :  {from : "/checkout"} });
      return;
    }

    if (cartItems.length === 0) {
      navigate("/cart");
      return;
    }

    if(location.state?.from !== "/cart") {
      navigate("/cart");

      return;
    }

  }, [token, cartItems, navigate, location.state]);


  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  // testing handlePayment

  const handlePayment = (e) => {
    e.preventDefault();
  
    const payload = {
      items: cartItems.map((item) => ({
        productId: item._id,
        productName: item.name,
        productImage: item.image,
        productSize: item.size,
        productSizeUnit:item.sizeUnit,
        quantity: item.quantity,
        productPrice: item.unitPrice,
      })),
      deliveryAddress: form,
      totalAmount: grandTotal
    };

    console.log("Order Payload before payment: ", payload);

    const rzp = new window.Razorpay({
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: grandTotal * 100,
    currency: "INR",
    name: "Basket Grocery App",
    description: "payment",

    handler: async function (response) {
    try {
    const orderPayload = {
      ...payload,
      paymentInfo: {
        id: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature,
        status: "success",
      },
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_PORT}/api/orders`,
      orderPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(clearCart());

    setTimeout(() => {
      navigate("/order-success", { state: { order: res.data } });
    }, 200);

    } catch (err) {
    console.error("Order save failed:", err);

    setTimeout(() => {
      navigate("/cart");
    }, 200);
    }
    },

      modal: {
        ondismiss: function () {
          // user closed payment popup
          navigate("/cart");
        },
      },


      theme: {
        color: "#634C9F",
      }
  });
  
    rzp.open();
  }

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (

    <div className='container checkout-page'>

       <div className="mb-3 breadcrumbs">
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumb-1">
            <Link  href="/">
              Home
            </Link>
            <Link
              href={`/cart`}
            >
             Cart
            </Link>
            <Typography className="active-breadcrumb">Checkout</Typography>
          </Breadcrumbs>
        </div>
      </div>


      <form className='checkout-grid' onSubmit={handlePayment}>

      <div className='billing-section'>
        <h4 className='section-title'>Billing Information</h4>

        <div className='form-group'>
          <label>Full Name</label>
          <input 
          type="text" 
          placeholder='Full Name'
          name='name'
          value={form.name}
          onChange={handleChange}
          required
          />
        </div>

        <div className='form-group'>
          <label>Address Line 1</label>
          <input 
          type="text" 
          placeholder='Address Line 1'
          name='streetLine1'
          value={form.streetLine1}
          onChange={handleChange}
          required
          />
        </div>

        <div className='form-group'>
          <label>Address Line 2</label>
          <input 
          type="text" 
          placeholder='Address Line 2'
          name='streetLine2'
          value={form.streetLine2}
          onChange={handleChange}
          />
        </div>

        <div className='form-row'>
          <div className='form-group'>
            <label>City</label>
            <input
            type="text" 
            placeholder='City'
            name='city'
            value={form.city}
            onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label>Pin Code</label>
            <input 
            type="number" 
            placeholder='Pin Code'
            name='pincode'
            value={form.pincode}
            onChange={handleChange}
            required
            />
          </div>
        </div>

        <div className='form-row'>
          <div className='form-group'>
            <label>Email</label>
            <input 
            type="text" 
            placeholder='Email'
            name='email'
            value={form.email}
            onChange={handleChange}
            required
            />
          </div>

          <div className='form-group'>
            <label>Phone No</label>
            <input 
            type="number" 
            placeholder='Phone No'
            name='phone'
            value={form.phone}
            onChange={handleChange}
            required
            />
          </div>
        </div>

        <div className='form-group'>
          <label>Order Notes (optional)</label>
          <textarea 
          placeholder='Order notes...' 
          rows="4"
          name='notes'
          value={form.notes}
          onChange={handleChange}
          />
        </div>

      </div>

      <div className='summary-section'>
        <h4 className='section-title'>Order Summary</h4>

       
        <div className='summary-total'>
          <span>Total</span>
          <span>₹{subtotal}</span>
        </div>

        <button type='submit' className='pay-btn'>Make Payment</button>

      </div>

      </form>
      
    </div>
  )
}

export default Checkout



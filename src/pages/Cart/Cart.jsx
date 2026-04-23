import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import CartCounterBox from '../../components/CartCounterBox/CartCounterBox';
import EmptyCart from '../../assets/images/empty_cart.png'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


function Cart() {

  const cartItems = useSelector(state => state.cart.items);
  const token = useSelector((state) => state.user.token);

  const cartSubtotal = cartItems.reduce (
    (acc, item) => acc + item.quantity * item.unitPrice, 0
  );

  const shipping = cartSubtotal >= 200 ? 0 : 50;

  const total = cartSubtotal + shipping;

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
  }

  const handleCheckout = () => {
    if(!token) {
      navigate("/login", {state: { from : "/cart"}});
      return;
    }

    navigate("/checkout", {state: {from : "/cart"}});
  }

  return (
    <div className='container cart-Page'>

    <div className="mb-3 breadcrumbs">
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumb-1">
            <Link  href="/">
              Home
            </Link>
            {/* <Link
              href="/material-ui/getting-started/installation/"
            >
              {categorySlug.replace(/-/g, ' ')}
            </Link> */}
            <Typography className="active-breadcrumb">Cart</Typography>
          </Breadcrumbs>
        </div>
      </div>

    {
      cartItems?.length === 0 ?
       <div className="empty-cart text-center">

      <img
        src={EmptyCart}
        alt="Empty Cart"
        style={{
          width: "240px",
          height: "auto",
        }}
      />

      <h4>Your cart is empty</h4>
      <p>Add items in your cart</p>

      <button
        className="btn"
        style={{
          background: "#634C9F",
          color: "#fff"

        }}
        onClick={() => navigate('/')}
      >
        Start Shopping
      </button>

    </div>
      :
      <div className='row cart-section'>

      <div className='col-md-8'>

        <div className='cart-header d-flex '>
          <div className='flex-grow-1'>Product</div>
          <div className='price-col'>Price</div>
          <div className='qty-col'>Quanitity</div>
          <div className='subtotal-col'>Subtotal</div>
        </div>

        {cartItems.map(item => (
          <div className='cart-item d-flex align-items-center' key={item._id}>
          <div className='product-info d-flex align-items-center flex-grow-1'>
            <img src={item.image} alt="product image" />
            <span>{item.name}</span>
          </div>

          <div className='price-col'>{item.unitPrice}</div>

          <div className='qty-col'>
            <CartCounterBox product={item} variant='listing' />
            
          </div>

          <div className='subtotal-col'>{item.quantity * item.unitPrice}</div>

        </div>
        ))}

        


      </div>

      <div className='col-md-4'>
        <div className='cart-summary-box'>

          <h5 className='summary-title'>Cart Totals</h5>

          <div className='summary-row'>
            <span>Subtotal</span>
            <span>₹{cartSubtotal}</span>
          </div>

          <div className='summary-divider'></div>

          <div className='summary-row'>
            <span>Shipping Charges</span>
            <span>₹{shipping}</span>
          </div>

          <div className=' total-divider'></div>

          <div className='summary-row total-row'>
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className='checkout-btn' onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
        

      </div>

    </div>
    }

    

    </div>
  )
}

export default Cart
import { useDispatch, useSelector } from "react-redux";
import {addToCart, increaseQuantity, decreaseQuantity} from '../../features/cart/cartSlice';

function CartCounterBox({product, variant = 'listing'}) {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    
    if(!product || !product._id) {
        return null;
    }

    const itemInCart = cartItems.find(item => item._id === product._id);

    const handleAdd = () => {
        dispatch(addToCart(product));
    };

    const handleIncrease = () => {
        dispatch(increaseQuantity(product._id));
    }

    const handleDecrease = () => {
        dispatch(decreaseQuantity(product._id));
    }

    if(!itemInCart) {
        return variant === 'listing' ? 
        (
            <button className="add-cart-btn" onClick={handleAdd}>Add To Cart</button>
        )
        : null
    }

  return (
    <div className="add-cart-btn d-flex">
        <button className="counterOp" onClick={handleDecrease}>-</button>
        <span>{itemInCart.quantity}</span>
        <button className="counterOp" onClick={handleIncrease}>+</button>
    </div>
  )
}

export default CartCounterBox
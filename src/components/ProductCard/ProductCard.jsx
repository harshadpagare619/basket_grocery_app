import React from 'react'
import ProductImg from '../../assets/images/Product_Image.png'
import { MdFavoriteBorder } from "react-icons/md";
import CartCounterBox from '../CartCounterBox/CartCounterBox';
import {Link} from 'react-router-dom'


function ProductCard({product}) {

    const {_id, name, images, category, price, newPrice, size, sizeUnit} = product;

  return (
 
    <div className='product-card d-flex'>
        <button className='wishlist-btn'>
            <MdFavoriteBorder />
        </button>

        <div className='product-image'>
            <Link to={`/products/${category?.slug}/${_id}`}>
                <img src={images} alt="Product image" />
            </Link>
        </div>

        <div className='product-title'>
            <Link className='product-title-heading'  to={`/products/${category?.slug}/${_id}`}>
                <h4 className='product-title-heading'>{name}</h4>
            </Link>  
        </div>

        <div className='product-weight'>
            <p>{size} {sizeUnit}</p>
        </div>

        <div className='product-bottom'>
            {newPrice < price 
            ? 
            <div className='price-box d-flex'>
                <span className='new-price'>₹ {newPrice}</span>
                <span className='old-price'>₹ {price}</span>
            </div> 
            : 
            <div>
             <span className='new-price'>₹ {price}</span>
            </div>    
            }

            {/* <div className='price-box d-flex'>
                <span className='new-price'>₹ {newPrice}</span>
                <span className='old-price'>₹ {price}</span>
            </div>  */}
            
            {/* <button className='add-cart-btn'>Add to Cart</button> */}
            <CartCounterBox product={product} variant='listing' />
        </div>
    </div>
  )
}

export default ProductCard
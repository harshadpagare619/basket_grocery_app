import { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import { MdArrowForward } from "react-icons/md";
import ProductCard from '../../components/ProductCard/ProductCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CartCounterBox from '../../components/CartCounterBox/CartCounterBox';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function ProductDetails() {

  const [tabValue, setTabValue] = useState(0);
  const {categorySlug, id} = useParams();
  const [productData, setProductData] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [selectedImage, setSelectedImages] = useState(null);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async() => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_PORT}/api/products/${id}`);
      
        setProductData(res.data);
        setSelectedImages(res.data.images?.[0]);

        const productsList = await axios.get(`${import.meta.env.VITE_BASE_PORT}/api/products`);
        setAllProducts(productsList.data);

      } catch (error) {
        console.log('Failed to fetch products', error);
      }
    }

    fetchProducts();
  }, [id]);

  const relatedProducts = allProducts.filter((item) => item.category?._id === productData.category?._id && item._id !== productData._id).slice(0,5);

  const handleClick = (e) => {
    e.preventDedault();
  }

  return (
    <div className='container product-details'>

    <div className="mb-3 breadcrumbs">
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumb-1">
            <Link  href="/">
              Home
            </Link>
            <Link
              href={`/products/${categorySlug}`}
            >
              {categorySlug.replace(/-/g, ' ')}
            </Link>
            <Typography className="active-breadcrumb">{productData.name}</Typography>
          </Breadcrumbs>
        </div>
      </div>


    <div className='productDetails-main row'>

    <div className='pd-iamge-section col-md-6'>
      <div className='pd-main-image'>
        <img src={selectedImage} alt="product imaege" />
      </div>

      <div className='pd-image-thumbnail'>
        <img src={selectedImage} alt="product image thumbnail" />
      </div>
    </div>

    <div className='pd-details-section col-md-6'>

      <div className='pd-title'>
        <h1>{productData.name}</h1>
      </div>

      <div className='box1'>
        <div className='pd-ratingBrand'>
          <div className='d-flex pd-rating gap-2'>
            <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
            <p>4.5</p>
          </div>

          <div className='pd-brand d-flex'>
            <p>Brand: </p>
            <p className='pd-brandName'>{productData.brand?.name}</p>
          </div>
        </div>

        <div className='d-flex pd-morePd'>
          <p>View All {productData.brand?.name} products</p>
          <MdArrowForward />
        </div>
      </div>

      <hr  className='pd-divider'/>

      <div className='box2'>
        <div className='pd-priceSize'>
          {productData.newPrice < productData.price ? 
          <div className='pd-price'>
            <span className='pd-newPrice'>₹{productData.newPrice}</span>
            <span className='pd-oldPice'>₹{productData.price}</span>
          </div>
          : 
          <div className='pd-price'>
            <span className='pd-newPrice'>₹{productData.price}</span>
          </div>
          }
          
          <div className='pd-size'>{productData.size} {productData.sizeUnit}</div>
        </div>

        <div className='pd-atc'>
          {/* <button className='add-cart-btn'>Add to Cart</button> */}
          <CartCounterBox product={productData} variant='listing' />
          {
            productData.countInStock <=20 ?
             <p>only few left in stocks</p> 
             : 
             ""
          }
          
        </div>
      </div>

      <div className="pd-meta-box">
        <div>🚚 Shipping within 30 minutes</div>
        <div>💳 Payment: Card, UPI, COD</div>
        <div>🛡️ No return if opened</div>
      </div>

      <div className="pd-actions">
        <button>♡ Add to wishlist</button>
        
      </div>


    </div>

    </div>

    <div className='pd-tabs'>
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        className='custom-tabs'
        TabIndicatorProps={{ className: "custom-tab-indicator"}}
      >
        <Tab label="Description"  className='custom-tab'/>
        <Tab label="Reviews (2)"  className='custom-tab'/>
      </Tabs>

      <Box className="tab-content-box">
        {tabValue === 0 && (
        <Typography component="div" className="tab-content-text">
          {productData.description}

        </Typography>
        )}

        {tabValue === 1 && (
        <Typography component="div" className="tab-content-text">
          {productData.description}
        </Typography>
        )}
      </Box>


    </div>

    <div className='pd-related'>
      <h4>Related Products</h4>

      <div className='pd-relatedPd'>
        {
          relatedProducts.length > 0 
          ?
          (
            relatedProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))
          )
          :
          ""
        }
        {/* <ProductCard product={productData} variant='listing' />
        <ProductCard product={productData} variant='listing' />
        <ProductCard product={productData} variant='listing' />
        <ProductCard product={productData} variant='listing' />
        <ProductCard product={productData} variant='listing' /> */}
      </div>
    </div>

    </div>
  )
}

export default ProductDetails
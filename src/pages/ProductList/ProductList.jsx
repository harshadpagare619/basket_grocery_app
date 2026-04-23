import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';
import emptyList from '../../assets/images/empty_orders.png'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Button } from "@mui/material";

function ProductList({product}) {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, []);

  
  const handleClick = (e) => {
    e.preventDedault();
  }

  const {categorySlug} = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_PORT}/api/products`);
        setAllProducts(res.data);

        const matched = res.data.filter((prod) => prod.category?.slug === categorySlug);
        setFilteredProducts(matched);
      } catch (error) {
        console.log('Failed to fetch products: ', error);
      }
    };

    fetchProducts();
  }, [categorySlug]);

 

  return (
    <div className="container mt-4 mb-4 p-0">
      <div className="mb-3 breadcrumbs">
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumb-1">
            <Link  href="/">
              Home
            </Link>
        
            <Typography className="active-breadcrumb">{categorySlug.replace(/-/g, ' ')}</Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-capitalize">{categorySlug.replace(/-/g, ' ')}</h4>
        <div className="productList d-flex ">
          {
            filteredProducts.length > 0 ?
            ( 
              filteredProducts.map((item) => (
              <ProductCard key={item._id} product={item} variant='listing' />
            ))
            ) : 
            (
              <div className="emptyProdList w-100">
                <img src={emptyList} alt="empty product image" />

                <div className="prodEmptyMsg">
                   <h5 className="empty-title">
                  No products found
                </h5>

                <p className="empty-subtitle">
                Start shpopping for other products
                </p>

                <Link href="/">
                  <Button
                  variant="contained"
                  className="empty-btn"
                  >
                  Start Shopping
                  </Button>
                </Link>
                </div>

               
                </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ProductList
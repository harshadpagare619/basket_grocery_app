import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import axios from "axios";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import ProductImg from '../../assets/images/Product_Image.png';
import ProductCard from "../../components/ProductCard/ProductCard";
import PromotionBanners from "../../components/PromotionBanners/PromotionBanners";
import Features from '../../components/Features/Features'


const HOME_CATEGORY_LIMIT = 6;

function Home() {

  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categoryProducts, setCategoryProduct] = useState([]);
  const [cat1, setCat1] = useState([]);
  const [cat2, setCat2] = useState([]);

  useEffect(() => {
    window.scrollTo(0,0);
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_PORT}/api/category`);
        setCategories(res.data);
        
      } catch (error) {
        console.error('Failed to fetch Categories data :', error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFeatureProducts = async () => {
      try{
        const res = await axios.get(`${import.meta.env.VITE_BASE_PORT}/api/products?featured=true&limit=5`);
        setFeaturedProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }

    fetchFeatureProducts();
  }, []);


  useEffect(() => {
    const fetchCatProduct = async() => {
      try {
        const catId1 = categories[0]?.id;

        const catId2 = categories[3]?._id;

        if(!catId1 || !catId2) return;

        const cat1 = await axios.get(`${import.meta.env.VITE_BASE_PORT}/api/products?category=${catId1}&limit=5`);
        setCat1(cat1.data);

        const cat2 = await axios.get(`${import.meta.env.VITE_BASE_PORT}/api/products?category=${catId2}&limit=5`);
        setCat2(cat2.data);

        
       } catch (error) {
        console.error("Failed to fetch category products :", error);
      }
    }

    if(categories.length > 0) {
      fetchCatProduct();
    }
  }, [categories]);



  // useEffect(() => {
  //   const fetchCategoryProducts = async () => {
  //     try {
  //       const res = await axios.get(`${import.meta.env.VITE_BASE_PORT}/api/products?category=${categoryId}&limit=5`);
  //       setCategoryProduct(res.data);
  //     } catch (error) {
  //       console.log("Failed to fetch category Products", error);
  //     }
  //   };

  //   if(categoryId) {
  //     fetchCategoryProducts();
  //   }
  // },[categoryId])
  
  return (
    <div className="main container">
     
      <HomeBanner/>

      <Features />

      <section className="home-categories my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-1 fw-semibold">Shop by Categories</h5>
            
          </div>

          <Link to="/" className="view-all-btn">View All →</Link>
        </div>

        <div className="category-card">
          <div className="row g-0">
            {
              categories.slice(0, HOME_CATEGORY_LIMIT).map((item) => (
                <div className=" col-sm-3 col-md-2 category-cell" key={item.slug}>
                  <Link className="category-link" to={`/products/${item.slug}`}>
                  <img src={item.images} alt="category image" />
                  <p>{item.name}</p>
                  </Link>
                </div>  
              ))
            }
          </div>

          
        </div>

      </section>

      <div className="home-products my-4 py-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-3 fw-semibold">Fresh From Farms</h5>
              </div>

              <Link to="/" className="view-all-btn">View All →</Link>
            </div>

            <div className="productList d-flex">
              {
              cat1.map((item) => (
                <ProductCard  key={item._id} product={item} variant='listing'/>
              ))
            }
            </div>
      </div>

      <div className="home-products my-4 py-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-3 fw-semibold">Fresh From Farms</h5>
              </div>

              <Link to="/" className="view-all-btn">View All →</Link>
            </div>

            <div className="productList d-flex">
              {
              featuredProducts.map((item) => (
                <ProductCard  key={item._id} product={item} variant='listing'/>
              ))
            }
            </div>
      </div>

      <PromotionBanners />

      <div className="home-products my-4 py-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-3 fw-semibold">Munchies</h5>
              </div>

              <Link to="/" className="view-all-btn">View All →</Link>
            </div>

            <div className="productList d-flex">
              {
              cat2.map((item) => (
                <ProductCard  key={item._id} product={item} variant='listing'/>
              ))
            }
            </div>
      </div>
     
    </div>
  )
}

export default Home
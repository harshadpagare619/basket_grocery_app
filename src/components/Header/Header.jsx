import {useEffect, useState, useRef} from 'react'
import Logo from '../../assets/images/basket_logo.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import LocationSelect from '../LocationSelect/LocationSelect';
import SearchBar from '../SearchBar/SearchBar';
import AccountBtn from '../AccountBtn/AccountBtn';
import Divider from '@mui/material/Divider';
import CartButton from '../CartButton/CartButton';


function Header() {

  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => 
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 

  useEffect(() => {
   const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_PORT}/api/category`);
      setCategories(res.data);
      
      } catch (error) {
      console.log("Data fetching error: ", error);
    }
   }

   fetchCategories();
  }, [])

  return (
   <header className='sticky-top'>

    <div className='headerRow1'>

      {/* header bar 1 - promo strip */}

      <div className='promo-strip d-flex justify-content-center'>
        <p>Free Delivery on order above <span>₹ 200</span></p>
      </div>

      {/* header bar 2 - utility bar */}

      <div className='container d-flex justify-content-between utilitybar'>
        <div className='utlityLeft'>
          <Link>Contact Us</Link>
          <Link>Order Tracking</Link>
          <Link>Newsletter</Link>
        </div>

        <div className='utlityRight'>
          <Link>English ▾</Link>
          <Link>INR ▾</Link>
          
        </div>
      </div>

      <Divider className='headerDivider' />

    </div>

     <div className='headerRow2 sticky-top'>

      {/* header bar 3 - Header Main navigation bar */}

      <div className='container d-flex justify-content-between headerMainNavigation'>
        
        <div className='mainNavLeft d-flex'>
          <div className='header-logo'>
            <Link to='/'>
            <img src={Logo} alt="logo" />
            </Link>
          </div>

          <div><LocationSelect /></div>
          
          <SearchBar />

        </div>
 
        <div className='mainNavRight d-flex gap-3'>
          <AccountBtn />

          <CartButton />


        </div>
      </div>

       <Divider className='headerDivider' />

      {/* header bar 4 - Header Navigation bar */}

      {/* <div className='container d-flex headerNavigation'>
        <Link to='/'>Home</Link>

        <div className='categoryDropdown'>
          Categories ▾
          <div className='categoryMenu'>
            {
              categories.map((item) => (
                <Link key={item._id} to={`/products/${item.slug}`}>
                  {item.name}
                </Link>
              ))
            }
          </div>
        </div>


        {
          categories.slice(0,4).map((item) => (
            <Link key={item._id} to={`/products/${item.slug}`} >{item.name}</Link>
          ))
        }
        
      </div>  */}

       <div className="container d-flex align-items-center headerNavigation">
      <Link to="/">Home</Link>

      <div
        className="categoryDropdown"
        ref={dropdownRef}
      >
        <span
          className="categoryTrigger"
          onClick={toggleDropdown}
        >
          Categories ▾
        </span>

        {open && (
          <div className="categoryMenu">
            {categories.map((item) => (
              <Link
                key={item._id}
                to={`/products/${item.slug}`}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {categories.slice(0, 4).map((item) => (
        <Link key={item._id} to={`/products/${item.slug}`}>
          {item.name}
        </Link>
      ))}
    </div>

      <Divider className='headerDivider' />

    </div>

    </header>
  )
}

export default Header
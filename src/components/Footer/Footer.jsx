
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Divider from '@mui/material/Divider';
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_PORT}/api/category`);
        setCategories(res.data);
      } catch (error) {
        console.error('Data fetching error :', error);
      }
    }

    fetchCategories();
  }, [])

  return (
       <footer className="footer">

      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h4>Join our newsletter</h4>
            <p>Register now to get latest updates on promotions & coupons</p>
          </div>

          <div className="newsletter-form">
            <div className='w-100'>
              <input
              type="email"
              placeholder="Enter your email address"
            />
            <button>SEND</button>
            </div>
            

            <p className="newsletter-policy text-center">
            By subscribing you agree to our <span>Terms & Conditions</span> and <span>Privacy & cookies Policy</span>.
            </p>
          </div>
        </div>

        
      </div>

      <Divider />

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="row">

            {/* Help */}
            <div className="col-md-3 col-sm-6">
              <h6>Do you need help?</h6>

              <div className="footer-contact">
                <FaPhoneAlt />
                <div>
                  <small>Monday - Friday, 08 AM - 9PM</small>
                  <p>(098) 7654 - 321</p>
                </div>
              </div>

              <div className="footer-contact">
                <FaEnvelope />
                <p>info@example.com</p>
              </div>
            </div>

            {/* Categories */}
            <div className="col-md-2 col-sm-6">
              <h6>Shop by Categories</h6>
              <ul>
               {categories.map(item => (
                   <li key={item._id}><Link to={`/products/${item.slug}`}>{item.name}</Link></li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div className="col-md-3 col-sm-6">
              <h6>Let us help you</h6>
              <ul>
                <li>My Orders</li>
                <li>Order Tracking</li>
                <li>Returns & Replacements</li>
                <li>Refund & Return Policies</li>
                <li>Shipping Rates & Policies</li>
                <li>Help Center</li>
              </ul>
            </div>

            {/* About */}
            <div className="col-md-2 col-sm-6">
              <h6>Get to know us</h6>
              <ul>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>Cookies Settings</li>
                <li>Store Locations</li>
                <li>Become an Affiliate partner</li>
              </ul>
            </div>

            {/* Social */}
            <div className="col-md-2 col-sm-12">
              <h6>Follow us on Social Media</h6>
              <div className="footer-social">
                <span><FaFacebookF /></span>
                <span><FaTwitter /></span>
                <span><FaInstagram /></span>
                <span><FaLinkedinIn /></span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Creator */}
      <div className='contentCreator'>
         <div className='contentDiv'>
            <h6>Design & Developed by - Harshad Pagare</h6>
          </div>
      </div>

    </footer>

  )
}

export default Footer
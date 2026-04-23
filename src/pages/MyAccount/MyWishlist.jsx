import {useEffect} from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import wishlistImage from '../../assets/images/my_wishlist.png'


function MyWishlist() {

  useEffect(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant"
        });
      }, []);

  return (
    <div className="empty-wishlist-wrapper">
      
      {/* Image */}
      <img
        src={wishlistImage}
        alt="Empty Wishlist"
        className="empty-wishlist-img"
      />

      {/* Title */}
      <h5 className="empty-title">
        Nothing is in your wishlist
      </h5>

      {/* Subtitle */}
      <p className="empty-subtitle">
        Add items in your wishlist
      </p>

      {/* Button */}
      <Link to="/">
        <Button
          variant="contained"
          className="empty-btn"
        >
          Add Item
        </Button>
      </Link>

    </div>
  )
}

export default MyWishlist
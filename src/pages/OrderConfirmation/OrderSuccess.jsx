import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";

function OrderSuccess() {
  return (
    <div className="main container">
     <div className='d-flex justify-content-center align-items-center orderMessage'>
      
      <FaCheckCircle />
      {/* Title */}
      <h5 className="empty-title mt-4 mb-2">
        Your Order is Confirmed!
      </h5>

      {/* Subtitle */}
      <p className="empty-subtitle mt-2 mb-2">
        We’ll send you a shipping confirmation email as soon as your order  ships
      </p>

      {/* Button */}
      <Link to="/my-account/orders">
        <Button
          variant="contained"
          className="empty-btn"
        >
          Check Status
        </Button>
        </Link>

     </div>

    </div>
  )
}

export default OrderSuccess
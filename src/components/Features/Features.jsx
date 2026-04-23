import React from 'react';
import { MdOutlineLocalShipping } from "react-icons/md";
import { MdOutlineHeadphones } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { MdOutlineCurrencyExchange } from "react-icons/md";


function Features() {
  return (
    <div className='features container'>
        <div className='row features-row'>

            <div className='col-md-3'>
                <div className='feature-card'>
                    <div className='feature-icon'>
                        <MdOutlineLocalShipping />
                    </div>

                    <div className='feature-text'>
                        <h6>Free Shipping</h6>
                        <p>Free Shipping on order above ₹200</p>
                    </div>
                </div>
            </div>

             <div className='col-md-3'>
                <div className='feature-card'>
                    <div className='feature-icon'>
                        <MdOutlineHeadphones />
                    </div>

                    <div className='feature-text'>
                        <h6>Customer Support 24/7</h6>
                        <p>Instant access to support</p>
                    </div>
                </div>
            </div>

             <div className='col-md-3'>
                <div className='feature-card'>
                    <div className='feature-icon'>
                        <MdOutlineSecurity />
                    </div>

                    <div className='feature-text'>
                        <h6>100% Secure Payement</h6>
                        <p>We ensure your money is save</p>
                    </div>
                </div>
            </div>

             <div className='col-md-3'>
                <div className='feature-card'>
                    <div className='feature-icon'>
                        <MdOutlineCurrencyExchange />
                    </div>

                    <div className='feature-text'>
                        <h6>Money-back Guarantee</h6>
                        <p>30 Days money-back guarrantee </p>
                    </div>
                </div>
            </div>


        </div>
    </div>
  )
}

export default Features
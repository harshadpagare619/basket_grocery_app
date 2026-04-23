import React from 'react';
import HeroImage from '../../assets/images/hero_image.png'
import Button from '@mui/material/Button';
import {MdArrowForward} from 'react-icons/md';
import Banner1 from '../../assets/images/vegetable_basket.png'
import Banner2 from '../../assets/images/baby_diaper.png'
import Banner3 from '../../assets/images/bathing_products.png'

function HomeBanner() {
  return (
    <div className='home-banner'>
        <div className='row'>

            <div className='col-md-8'>
                <div className='banner banner-lg'>
                    <div className='banner-content'>
                        <p className='banner-subtitle'></p>
                        <h3 className='home-banne-title'>Get the best quality products at the affordable prices</h3>

                        <button className='shopButton'>Shop Now</button>
                    </div>

                    <div className='banner-image'>
                        <img src={Banner1} alt="Banner 1 image vegetable" />
                    </div>
                </div>
            </div>

            <div className='col-md-4 d-flex flex-column gap-2'>
                <div className='banner  banner-sm banner-sm1' >
                    <div className='banner-content'>
                       <p className='banner-subtitle2'>Baby Diaper</p>
                        <h4 className='banner-title2'>Upto 10% Off</h4>
                        <button className='btn btn-light btn-sm'>Shop Now</button>
                    </div>

                    <div className='banner-image'>
                        <img src={Banner2} alt="fruits" />
                    </div>
                </div>

                <div className='banner banner-sm'>
                    <div className='banner-content'>
                        <p className='banner-subtitle'>Bathing Essentials</p>
                        <h4 className='banner-title'>15% discount*</h4>
                        <button className='btn btn-light btn-sm'>Shop Now</button>
                    </div>

                    <div className='banner-image'>
                        <img src={Banner3} alt="groceries" />
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default HomeBanner
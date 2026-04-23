import React from 'react'
import Banner1 from '../../assets/images/milk_products.png'
import Banner2 from '../../assets/images/baby_diaper.png'
import Banner3 from '../../assets/images/bathing_products.png'


function PromotionBanners() {
  return (
    <div className='promo-row'>
        <div className='row'>

            <div className='col-md-4'>
                <div className='banner banner-promo2'>
                    <div className='banner-content'>
                        <p className='banner-subtitle'>Dairy Products</p>
                        <h4 className='banner-title'>10% discount*</h4>
                        <button className='btn btn-light btn-sm'>Shop Now</button>
                    </div>
                    
                    <div className='banner-image'>
                        <img src={Banner1} alt="fruits" />
                    </div>
                </div>
            </div>

            <div className='col-md-4'>
                <div className='banner banner-promo'>
                    <div className='banner-content'>
                        <p className='banner-subtitle2'>Baby Diaper</p>
                        <h4 className='banner-title2'>10% discount*</h4>
                        <button className='btn btn-light btn-sm'>Shop Now</button>
                    </div>
                    
                    <div className='banner-image'>
                        <img src={Banner2} alt="fruits" />
                    </div>
                </div>
            </div>

            <div className='col-md-4'>
                <div className='banner banner-promo3'>
                    <div className='banner-content'>
                        <p className='banner-subtitle'>Bathing Essentials</p>
                        <h4 className='banner-title'>15% discount*</h4>
                        <button className='btn btn-light btn-sm'>Shop Now</button>
                    </div>
                    
                    <div className='banner-image'>
                        <img src={Banner3} alt="fruits" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PromotionBanners
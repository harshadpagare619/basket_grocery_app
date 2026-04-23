import { useEffect } from "react";
import { Link } from "react-router-dom"
import { CartCounterBox } from "../../components"


function ProductCard ({product}) {
    const {_id, name, images, size, sizeUnit, price, newPrice, inStock, category} = product;

    useEffect(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant"
        });
      }, []);

    return (
        <div className={`productCard w-100`} key={_id}>
            <div className="text-center">
                <img src={images} alt={name} className="productImg" />
            </div>

            <div className="prdDetails">
                <h6><Link to={`/products/${category?.slug}/${_id}`}>{name}</Link></h6>

                <div className="prdSize d-flex">
                    <p className="mr-1">{size}</p>
                    <p>{sizeUnit}</p>
                </div>

                <div className="d-flex w-100 prdPrice align-items-center">
                    {
                        newPrice < price ?
                        (
                            <div className="d-flex align-items-center">
                                <p className="mr-1">₹ {newPrice}</p>
                                <p className="priceStrike">₹{price}</p>
                            </div>    
                        ) : 
                        (
                            <p>₹{price}</p>
                        )
                    }

                    <CartCounterBox product={product} variant="listing" />
                </div>
            </div>
        </div>
    )
}

export default ProductCard
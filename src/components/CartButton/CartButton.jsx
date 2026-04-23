import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

function CartButton() {
  return (
    <div>
      <Link
        to="/cart"
        className="text-decoration-none text-dark"
      >
        <div className="d-flex flex-column align-items-center">
          <MdShoppingCart size={24} />

          <div
            className="d-flex align-items-center"
            style={{
              fontSize: "14px",
              fontFamily: "Inter, sans-serif",
              marginTop: "4px",
              padding: "0px 4px"
            }}
          >
            Cart
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CartButton;
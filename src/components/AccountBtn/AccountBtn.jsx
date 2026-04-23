import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { MdAccountCircle } from "react-icons/md";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function AccountBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);

  const [open, setOpen] = useState(false);
  const accountWrapper = useRef(null);

  const handleToggle = () => {
    if (isLoggedIn) {
      setOpen((prev) => !prev);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountWrapper.current && !accountWrapper.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
   <div className="accountDropdownWrapper position-relative" ref={accountWrapper}>
  {!isLoggedIn ? (
    <Link to="/login" className="accountLink">
      <div className="accountBtn">
        <MdAccountCircle size={24} />
        <div className="accountText">Account</div>
      </div>
    </Link>
  ) : (
    <>
      <div onClick={handleToggle} className="accountBtn loggedIn">
        <MdAccountCircle size={24} />

        <div className="accountText d-flex align-items-center">
          Account

          <KeyboardArrowDownIcon
            className={`accountArrow ${open ? "rotate" : ""}`}
          />
        </div>
      </div>

      {open && (
        <div className="accountMenu">
          <Link
            to="/my-account"
            className="accountMenuItem"
            onClick={() => setOpen(false)}
          >
            My Account
          </Link>

          <Link
            to="/my-account/orders"
            className="accountMenuItem"
            onClick={() => setOpen(false)}
          >
            Orders
          </Link>

          <Link
            to="/my-account/wishlist"
            className="accountMenuItem"
            onClick={() => setOpen(false)}
          >
            Wishlist
          </Link>

          <div className="accountDivider"></div>

          <button onClick={handleLogout} className="accountMenuItem logoutBtn">
            Logout
          </button>
        </div>
      )}
    </>
  )}
</div>
  );
}

export default AccountBtn;
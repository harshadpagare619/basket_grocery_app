import { useEffect } from 'react';
import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';


function MyAccountLayout() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
    }, []);

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("persist:root");

    navigate("/");
  }

  return (
   <div className="container my-5 myaccount-page">
      <div className="myaccount-wrapper">

        {/* Sidebar */}
        <div className="myaccount-sidebar">
          {/* <h5 className="myaccount-title">My Account</h5> */}

          <div className="myaccount-links">
            <NavLink
              to=""
              end
              className={({ isActive }) =>
                isActive ? "myaccount-link active" : "myaccount-link"
              }
            >
              My Account
            </NavLink>

            <NavLink
              to="orders"
              className={({ isActive }) =>
                isActive ? "myaccount-link active" : "myaccount-link"
              }
            >
              My Orders
            </NavLink>

            <NavLink
              to="wishlist"
              className={({ isActive }) =>
                isActive ? "myaccount-link active" : "myaccount-link"
              }
            >
              My Wishlist
            </NavLink>

            
          </div>

          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        {/* Content */}
        <div className="myaccount-content">
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default MyAccountLayout
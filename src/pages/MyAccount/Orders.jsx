import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { MdVisibility } from 'react-icons/md'
import emptyOrder from '../../assets/images/empty_orders.png'

const Orders = () => {

  const { user, token} = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  console.log("user data: ", user)

  useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
    }, []);

    // useEffect(() => {
    //     const fetchAllOrders = async () => {
    //       try {
    //         const res = await axios.get(`${import.meta.env.VITE_BASE_PORT}/api/orders`,
    //           {
    //             headers: {
    //               Authorization : `Bearer ${token}`,
    //             },
    //           }
    //         );

    //         setOrders(res);
    //       } catch (error) {
    //         console.log("error: ",error);
    //       }
    //     }

    //     fetchAllOrders();

    //     console.log("order data: ", orders);
    // }, [])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_BASE_PORT}/api/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        
        setOrders(res.data);
      } catch (error) {
        console.error("ORDERS FETCH ERROR:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id && token) {
      fetchOrders();
    }

    
  }, [user, token]);


  const userId = user?._id;

  const filteredOrders = orders.filter((order) => {
    return order?.user?._id === userId || order?.user === userId;
  });


  return (
    <>
    {
      filteredOrders?.length === 0 ?
      <div className="empty-wishlist-wrapper">
      
      {/* Image */}
      <img
        src={emptyOrder}
        alt="Empty Wishlist"
        className="empty-wishlist-img"
      />

      {/* Title */}
      <h5 className="empty-title">
        No order is placed yet
      </h5>

      {/* Subtitle */}
      <p className="empty-subtitle">
        Add products and place an order
      </p>

      {/* Button */}
      <Link to="/">
        <Button
          variant="contained"
          className="empty-btn"
        >
          Start Shopping
        </Button>
      </Link>

    </div>
      :
    
      <div className="table-responsive mt-4">
        <table className="table table-bordered v-align">
          <thead className="thead-dark">
            <tr>
              <th>Order ID</th>
              
              <th>Order Amount</th>
              <th>Order Status</th>
              <th>Actions</th>
            </tr>
            
          </thead>

          <tbody>
           {
            filteredOrders?.length !==0 && filteredOrders.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  
                  <td>₹ {item.totalAmount}</td>
                  <td>{item.orderStatus}</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className='secondary' color='secondary'><MdVisibility /></Button>
                    </div>
                  </td>
                </tr>
              )
            })
           }
          </tbody>
        </table>
      </div>
    }
    </>


  );
};

export default Orders;
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {fetchSearchResults, setQuery, clearResults} from '../../features/search/searchSlice';
import { FiSearch } from "react-icons/fi";

function SearchBar() {
  const dispatch = useDispatch();
  const {query, results, loading} = useSelector((state) => state.search);
  const wrapperRef = useRef();

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setQuery(value));

    if(value.trim().length > 1) {
      dispatch(fetchSearchResults(value));
    } else {
      dispatch(clearResults());
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        dispatch(clearResults());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  return (
    <div  ref={wrapperRef} className="search-wrapper">

      <div className="search-box">
        <FiSearch
        size={18}
        className="search-icon"
        />

        <input
        className="search-input"
        type="text"
        placeholder="Search for products"
        value={query}
        onChange={handleChange}
        />
      </div>
      

      {
        loading && (
        <div className="search-dropdown">
          Loading...
        </div>
        )  
      }

      {
        Array.isArray(results) && results.length > 0 && (
          <ul className="search-dropdown search-list">
            {
              results.map((product) => (
                <li
                key={product._id}
                // className="list-group-item d-flex align-items-center"
                style={{
                  padding: "8px 14px",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => 
                  (e.currentTarget.style.background = "#f8f9fa")
                }
                onMouseLeave={(e) => 
                (e.currentTarget.style.background = "transparent")
                }
                >
                  <Link
                  to={`/product/${product._id}`}
                  // className="d-flex align-items-center text-decoration-none w-100"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    width: "100%",
                  }}
                  >
                    <img 
                    src={product.images?.[0]}
                    alt={product.name}
                    className="search-img"
                    />
                    <div>
                      <div className="search-name">
                        {product.name}
                      </div>
                      <small className="search-brand">
                        {product.brand?.name}
                      </small>
                    </div>
                  </Link>
                </li>
              ))
            }
          </ul>
        )
      }

       {query.length > 1 &&
        !loading &&
        Array.isArray(results) &&
        results.length === 0 && (
          <div
            style={{
              position: "absolute",
              top: "105%",
              minWidth: "180px",
              width: "100%",
              backgroundColor: "#ffffff",
              border: "1px solid #eaeaea",
              borderRadius: "4px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
              padding: "12px",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              color: "#777",
              zIndex: 1000,
            }}
          >
            No results found
          </div>
        )}

    </div>
  );
}

export default SearchBar
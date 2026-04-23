import { useState, useEffect } from "react";
import { Button, Menu, MenuItem, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const cities = [
    "Mumbai",
    "Pune",
    "Delhi",
    "Kolkata",
    "Hyderabad",
    "Bangalore",
    "Chennai",
    "Surat",
    "Ahmedabad"
];

function LocationSelect() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCity, SetSelectedCity] = useState("");

    const open = Boolean(anchorEl);

    useEffect(() => {
        const savedCity = localStorage.getItem("selectedCity");
        if (savedCity) {
            SetSelectedCity(savedCity);
        }
    }, []);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleSelect = (city) => {
        SetSelectedCity(city);
        localStorage.setItem("selectedCity", city);
        handleClose();
    };

   
  return (
   <>
    <Button
        onClick={handleClick}
        disableRipple
        sx={{
          backgroundColor: "#ffffff",
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          padding: "12px 12px",
          minWidth: "180px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          textTransform: "none",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          fontWeight: 400,
          color: "#212121",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          transition: "all 0.2s ease",

          "&:hover": {
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            borderColor: "#d0d0d0",
          },

          "&:active": {
            boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <LocationOnIcon sx={{ fontSize: 18, color: "#666" }} />
          {selectedCity || "Select Location"}
        </Box>

        <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#666" }} />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: "6px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            minWidth: "180px"
          },
        }}
      >
        {cities.map((city) => (
          <MenuItem
            key={city}
            onClick={() => handleSelect(city)}
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
            }}
          >
            {city}
          </MenuItem>
        ))}
      </Menu>
   </>
  )
}

export default LocationSelect;
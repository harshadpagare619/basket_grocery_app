import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = `${import.meta.env.VITE_BASE_PORT}/api/users`;

export const loginUser = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/signin`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Login failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/signup`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Signup failed");
    }
  }
);

export const googleLoginUser = createAsyncThunk(
  "user/googleLogin",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/authWithGoogle`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Google login failed");
    }
  }
);
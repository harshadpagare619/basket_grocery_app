import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, googleLoginUser } from "./userActions";

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    // ===================== LOGIN =====================
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;

      const user = action.payload.user || action.payload.userData || null;
      const token = action.payload.token || action.payload.accessToken || null;

      state.isLoggedIn = !!token;
      state.user = user;
      state.token = token;

      if (user) localStorage.setItem("user", JSON.stringify(user));
      if (token) localStorage.setItem("token", token);
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Login failed";
    });

    // ===================== SIGNUP =====================
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;

      const user = action.payload.user || action.payload.userData || null;
      const token = action.payload.token || action.payload.accessToken || null;

      state.isLoggedIn = !!token;
      state.user = user;
      state.token = token;

      if (user) localStorage.setItem("user", JSON.stringify(user));
      if (token) localStorage.setItem("token", token);
    });

    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Signup failed";
    });

    // ===================== GOOGLE LOGIN =====================
    builder.addCase(googleLoginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(googleLoginUser.fulfilled, (state, action) => {
      state.loading = false;

      const user = action.payload.user || action.payload.userData || null;
      const token = action.payload.token || action.payload.accessToken || null;

      state.isLoggedIn = !!token;
      state.user = user;
      state.token = token;

      if (user) localStorage.setItem("user", JSON.stringify(user));
      if (token) localStorage.setItem("token", token);
    });

    builder.addCase(googleLoginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Google login failed";
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
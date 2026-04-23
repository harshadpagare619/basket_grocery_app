import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from '../../assets/images/basket_logo.png'
import { loginUser, googleLoginUser } from "../../features/user/userActions";
// import {initializeApp} from "firebase/app"
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import firebaseApp from "../../config/firebase";
import {FcGoogle} from 'react-icons/fc';

function Login() {

 const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, loading, error } = useSelector((state) => state.user);

  const auth = getAuth(firebaseApp);
  const googleProvider = new GoogleAuthProvider();

  const redirectPath = location.state?.from || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectPath);
    }
  }, [isLoggedIn, navigate, redirectPath]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // EMAIL + PASSWORD LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(resultAction)) {
      navigate(redirectPath);
    }
  };

  // GOOGLE LOGIN
  const signInWithGoogle = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      const fields = {
        name: googleUser.displayName,
        email: googleUser.email,
        firebaseUid: googleUser.uid,
      };

      const resultAction = await dispatch(googleLoginUser(fields));

      if (googleLoginUser.fulfilled.match(resultAction)) {
        navigate(redirectPath);
      }
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  return (
    <div className="loginSection">
      <div className="loginCard">
        <div className="auth-logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <h2 className="loginTitle">Welcome back!</h2>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-forgot">
            <Link>Forgot password?</Link>
          </div>

          {error && <p className="text-danger text-center mt-2">{error}</p>}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          <div className="auth-divider">OR</div>

          <button
            className="btn-outline"
            onClick={signInWithGoogle}
            disabled={loading}
          >
            <FcGoogle className="mr-2" /> Login with Google
          </button>

          <p className="auth-footer-text">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
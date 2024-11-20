import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../CSS/Auth.css"; // Se usa el mismo archivo CSS para mantener el estilo
import bgImg from "../images/bgImg.jpg";
import logo from "../images/TradeMateLogoTransparent.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config.js";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)({
  "& label": {
    color: "#c9cfd1",
    letterSpacing: "0.09em",
    fontSize: "15px",
  },
  "& label.Mui-focused": {
    color: "#db0606",
    letterSpacing: "0.09em",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#c9cfd1",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "#db0606",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#db0606",
  },
  "& .MuiInputBase-input": {
    fontSize: "15px",
    letterSpacing: "0.09em",
  },
  "&.custom-margin": {
    marginBottom: "15px",
  },
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Lógica de Firebase para iniciar sesión
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/home-register"); // Redirige al usuario después del login exitoso
      })
      .catch(() => {
        setError("Invalid email or password");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="signup-page">
      <div className="auth-box">
        {/* Sección izquierda con imagen */}
        <div className="leftside">
          <img src={bgImg} alt="Background" />
        </div>

        {/* Sección derecha con el formulario */}
        <div className="rightside">
          <div className="logo">
            <img src={logo} alt="Trademate Logo" />
          </div>
          <h4 className="register-your-profile">
            <span>LOGIN</span> TO YOUR ACCOUNT
          </h4>

          {/* Formulario */}
          <form onSubmit={handleLogin}>
            <CustomTextField
              label="Email"
              type="email"
              variant="standard"
              fullWidth
              required
              autoComplete="off"
              className="custom-margin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomTextField
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              required
              autoComplete="off"
              className="custom-margin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="error-msg">{error}</div>}
            <div className="submit-div">
              <p>
                Don’t have an account? <Link to="/register">Register</Link>
              </p>
              <button type="submit" className="submit-btn">
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="form-footer">
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../CSS/Auth.css";
import bgImg from "../images/bgImg.jpg";
import logo from "../images/trademateLogoTransparent.png";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config.js";

// Estilos personalizados para los inputs
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

const Register = () => {
  // Estados para el formulario
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para eventos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Inicializar navigate para redirección
  const navigate = useNavigate();

  // Manejo del envío del formulario
  const handleRegistration = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Registro de usuario con Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/home-register"); // Redirige a HomeRegister
      })
      .catch((err) => {
        setError(err.message); // Muestra el error si ocurre
      })
      .finally(() => {
        setLoading(false); // Finaliza el estado de carga
      });
  };

  return (
    <div className="signup-page">
      <div className="auth-box">
        <div className="leftside">
          <img src={bgImg} alt="bgImg" />
        </div>
        <div className="rightside">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <h4 className="register-your-profile">
            <span>REGISTER</span> YOUR ACCOUNT
          </h4>
          <form className="custom-form" onSubmit={handleRegistration}>
            <CustomTextField
              label="Full Name"
              type="text"
              variant="standard"
              fullWidth
              required
              autoComplete="off"
              className="custom-margin"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
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
                Already have an account? <Link to="/login">Login</Link>
              </p>
              <button type="submit" className="submit-btn">
                {loading ? "..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

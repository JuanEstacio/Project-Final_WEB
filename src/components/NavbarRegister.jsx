import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"; // Asegúrate de importar esto
import { auth } from "../firebase/config"; // Importa tu configuración de Firebase
import logo from "../images/TradeMateLogoTransparent.png";

const NavbarRegister = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra sesión en Firebase
      navigate("/"); // Redirige a la página principal
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <header className="custom-navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="rightside">
        <div className="links">
          <button
            className="auth-link"
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
              fontSize: "inherit",
              outline: "none", // Evita el contorno
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavbarRegister;

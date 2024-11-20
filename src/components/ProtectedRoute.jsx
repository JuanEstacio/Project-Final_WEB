import { Navigate } from "react-router-dom";
import { auth } from "../firebase/config"; // Importar autenticación de Firebase

const ProtectedRoute = ({ children }) => {
  // Si el usuario está autenticado, renderiza el contenido (children)
  return auth.currentUser ? children : <Navigate to="/not-found" />;
};

export default ProtectedRoute;

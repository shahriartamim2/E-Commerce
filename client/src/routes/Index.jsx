import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Error from "../pages/Error";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Profile from "../pages/Profile";
import EditProduct from "../pages/EditProduct";
import Dashboard from "../pages/Dashboard";
import { useSelector } from "react-redux";
import {
  selectCurrentUserType,
  selectIsAuthenticated,
  selectStatus,
  selectUser,
} from "../features/auth/authSlice";

const Index = () => {
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUserType = useSelector(selectCurrentUserType);

  const status = useSelector(selectStatus);

  const LoadingElement = () => <div>Loading...</div>;

  const PublicElement = ({ children }) => {
    return status === "loading" ? <LoadingElement /> : <>{children}</>;
  };
  const NormalElement = ({ children }) => {
    if (status === "loading") return <LoadingElement />;
    if (currentUserType === "Admin" || currentUserType === "Normal") {
      return <>{children}</>;
    } else {
      <div>You do not have access</div>
      // <Navigate to='/login' />
    }
  };
  const AdminElement = ({ children }) => {
    if (status === "loading") return <LoadingElement />;
    if (currentUserType === "Admin") {
      return <>{children}</>;
    } else {
      
      // <Navigate to="/login" />;
    }
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* ----------------PUBLIC_ELEMENT------------- */}
        <Route
          path="/"
          element={
            <PublicElement>
              <Home />
            </PublicElement>
          }
        />
        <Route
          path="/register"
          element={
            <PublicElement>
              <Register />
            </PublicElement>
          }
        />
        <Route
          path="/login"
          element={
            <PublicElement>
              <Login />
            </PublicElement>
          }
        />
        <Route
          path="*"
          element={
            <PublicElement>
              <Error />
            </PublicElement>
          }
        />

        {/* ----------------NORMAL_USER_ELEMENT------------- */}
        <Route
          path="/cart"
          element={
            <NormalElement>
              <Cart />
            </NormalElement>
          }
        />
        <Route
          path="/profile"
          element={
            <NormalElement>
              <Profile />
            </NormalElement>
          }
        />

        {/* ----------------ADMIN_USER_ELEMENT------------- */}
        <Route
          path="/products/edit/:id"
          element={
            <AdminElement>
              <EditProduct />{" "}
            </AdminElement>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminElement>
              <Dashboard />{" "}
            </AdminElement>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Index;

/* eslint-disable react/prop-types */
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
import Users from "@/components/Users";
import { useSelector } from "react-redux";
import {
  selectCurrentUserType,
  selectIsAuthenticated,
  selectStatus,
  selectUser,
} from "../features/auth/authSlice";
import CrudProduct from "@/components/CrudProduct";
import CrudCategory from "@/components/CrudCategory";
import EditAccess from "@/components/EditAccess";
import VerifyUser from "@/pages/VerifyUser";
import CheckEmail from "@/pages/CheckEmail";

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

      <Navigate to='/login' />
    }
  };
  const AdminElement = ({ children }) => {
    if (status === "loading") return <LoadingElement />;
    if (currentUserType === "Admin") {
      return <>{children}</>;
    } else {
      
      <Navigate to="/login" />;
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
          path="/api/users/activate/:token"
          element={
            <PublicElement>
              <VerifyUser />
            </PublicElement>
          }
        />
        <Route
          path="/check-email"
          element={
            <PublicElement>
              <CheckEmail />
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
        >
          <Route path="crud-users" element={<Users />}>
            <Route path="edit-access/:id" element={<EditAccess />} />
          </Route>
          <Route path="crud-product" element={<CrudProduct />}>
            <Route path="edit-product/:id" element={<EditProduct />} />
          </Route>
          <Route path="crud-category" element={<CrudCategory />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Index;

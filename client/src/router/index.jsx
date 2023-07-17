import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/Home";
import TableProduct from "../components/TableProduct";
import FormProduct from "../components/FormProduct";
import Register from "../pages/Register";
import TableCategory from "../components/TableCategory";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";
import FormCategory from "../components/FormCategory";
import ProductDetail from "../pages/ProductDetail";
const loader = () => {
  if (!localStorage.getItem("access_token")) throw redirect("/login");
  return null;
};
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Navbar />
            <TableProduct />
          </>
        ),
        loader: loader,
      },
      {
        path: "/categories",
        element: (
          <>
            <Navbar />
            <TableCategory />
          </>
        ),
        loader: loader,
      },
      {
        path: "/addProducts",
        element: (
          <>
            <Navbar />
            <FormProduct />
          </>
        ),
        loader: loader,
      },
      {
        path: "/addCategories",
        element: (
          <>
            <Navbar />
            <FormCategory />
          </>
        ),
        loader: loader,
      },
      {
        path: "/edit/:id",
        element: (
          <>
            <Navbar />
            <FormProduct />
          </>
        ),
        loader: loader,
      },
      {
        path: "/register",
        element: (
          <>
            <Navbar />
            <Register />
          </>
        ),
        loader: loader,
      },
      ,
      {
        path: "/login",
        element: <Login />,
        loader: () => {
          if (localStorage.getItem("access_token")) throw redirect("/");
          return null;
        },
      },
      {
        path: "/customers",
        element: <Layout />,
        children: [
          {
            path: "/customers/home",
            element: <Home />,
          },
          {
            path: "/customers/detail/:slug/:id",
            element: <ProductDetail />,
          },
        ],
      },
    ],
  },
]);

export default router;

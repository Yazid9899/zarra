import { useEffect, useState } from "react";
import Image from "react-bootstrap/esm/Image";
import ProductCard from "../components/ProductCard";
import { NavLink, Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="navbar bg-secondary d-flex justify-content-between">
        <div>
          <Image
            className="nav-image"
            src="https://cdn.freebiesupply.com/logos/large/2x/zara-2-logo-black-and-white.png"
          />
        </div>
        <div>
          <NavLink to="/" className="btn btn-sm btn-outline-light">
            back to admin page
          </NavLink>
        </div>
      </div>
      <ProductCard />
      <Outlet />
    </>
  );
}

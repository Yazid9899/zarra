import { useEffect, useState } from "react";

export default function useFetchProduct() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productById, setproductById] = useState({});

  const fetchProduct = async (url, method, payload) => {
    try {
      setLoading(true);
      let options = {};
      if (method === "POST") {
        options = {
          method: method,
          body: payload,
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, options);
      }
      if (method === "GET") {
        options = {
          method: method,
        };
        const response = await fetch(url, options);
        const dataJson = await response.json();
        setProducts(dataJson);
      }
      if (method === "getById") {
        options = {
          method: "GET",
        };
        const response = await fetch(url, options);
        const dataJson = await response.json();
        setproductById(dataJson);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, fetchProduct, productById };
}

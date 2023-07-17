import { useEffect } from "react";
import useFetchProduct from "../hooks/useFetchProduct";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import {
  deleteProduct,
  fetchProduct,
  fetchProductById,
} from "../store/action/actionCreator";

export default function TableProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.products);

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEditProduct = (id) => {
    dispatch(fetchProductById(id))
      .then((res) => {
        navigate(`/edit/${id}`, { state: { editProduct: res } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toRupiah = (value) => {
    return value.toLocaleString("id-ID");
  };
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <div className="main-content">
        <div className=" d-flex justify-content-between mt-3">
          <h3>PRODUCTS</h3>
          <NavLink className="btn btn-lg btn-outline-primary" to="/addProducts">
            Add New Product
          </NavLink>
        </div>
        <table className=" table table-hover table-product">
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>CREATEDBY</th>
              <th>IMAGE</th>
              <th>DELETE / EDIT</th>
            </tr>
          </thead>
          <tbody id="table-product">
            {products?.map((product) => (
              <tr key={product.id}>
                <td className="align-middle">{product.id}</td>
                <td className="align-middle">{product.name}</td>
                <td className="align-middle">{product.Category.name}</td>
                <td className="align-middle">
                  {"Rp. " + toRupiah(product.price)}
                </td>
                <td className="align-middle">{product.User.email}</td>
                <td>
                  <img
                    className="align-middle image-table-product"
                    src={product.mainImg}
                  />
                </td>
                <td className="align-middle">
                  <div
                    onClick={() => handleDeleteProduct(product.id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    <i className="bi bi-trash3"></i>
                  </div>
                  <div
                    onClick={() => handleEditProduct(product.id)}
                    className="btn btn-outline-success btn-sm mx-2"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

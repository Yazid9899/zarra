import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import useFetchProduct from "../hooks/useFetchProduct";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  fetchCategory,
  putProduct,
} from "../store/action/actionCreator";
import Swal from "sweetalert2";

export default function FormProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { errorMessage } = useSelector((state) => state.products);
  const { editProduct } = useLocation()?.state ?? {};
  const { category } = useSelector((state) => state.category);
  const [productform, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    mainImg: "",
    categoryId: "",
    images1: "",
    images2: "",
    images3: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProductForm({
      ...productform,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (editProduct) {
        const data = await dispatch(putProduct(editProduct.id, productform));
        if (data?.err) {
          throw data.err;
        }
        navigate("/");
        Swal.fire({
          title: "Edit Product Success",
          icon: "success",
          confirmButtonText: "retry",
        });
      } else {
        const data = await dispatch(addProduct(productform));
        if (data?.err) {
          throw data.err;
        }
        navigate("/");
        Swal.fire({
          title: "Product Added",
          icon: "success",
          confirmButtonText: "retry",
        });
      }
      // navigate("/");
    } catch (err) {
      Swal.fire({
        title: err,
        icon: "error",
        confirmButtonText: "retry",
      });
    }
  };
  useEffect(() => {
    dispatch(fetchCategory());
    if (errorMessage) {
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
    if (editProduct) {
      setProductForm({
        name: editProduct.name,
        description: editProduct.description,
        price: editProduct.price,
        mainImg: editProduct.mainImg,
        categoryId: editProduct.categoryId,
        images1: editProduct.Images[0].imgUrl,
        images2: editProduct.Images[1].imgUrl,
        images3: editProduct.Images[2].imgUrl,
        id1: editProduct.Images[0].id,
        id2: editProduct.Images[1].id,
        id3: editProduct.Images[2].id,
      });
    }
  }, [dispatch, errorMessage]);
  return (
    <>
      <div className="row ">
        <Col md={{ span: 7, offset: 2 }} className="mt-5">
          <h1>FORM PRODUCT</h1>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name:</label>
              <input
                name="name"
                value={productform.name}
                onChange={handleChange}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Main Image</label>
              <input
                name="mainImg"
                value={productform.mainImg}
                onChange={handleChange}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">description</label>
              <textarea
                name="description"
                value={productform.description}
                onChange={handleChange}
                className="form-control"
                rows="3"
              ></textarea>
            </div>

            <div className="col-md-6">
              <label className="form-label">Price</label>
              <input
                name="price"
                value={productform.price}
                onChange={handleChange}
                type="number"
                className="form-control"
              />
            </div>
            <div className="col-md-5">
              <label className="form-label">Category</label>
              <select
                name="categoryId"
                value={productform.categoryId}
                onChange={handleChange}
                className="form-select"
              >
                {category.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">images Url:</label>
              <input
                name="images1"
                value={productform.images1}
                onChange={handleChange}
                type="text"
                className="form-control"
              />
              <input
                name="images2"
                value={productform.images2}
                onChange={handleChange}
                type="text"
                className="form-control"
              />
              <input
                name="images3"
                value={productform.images3}
                onChange={handleChange}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                add Product
              </button>
            </div>
          </form>
        </Col>
      </div>
    </>
  );
}

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../store/action/actionCreator";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function FormCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage } = useSelector((state) => state.category);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
  });
  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setCategoryForm({
      ...categoryForm,
      name: value,
    });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = await dispatch(addCategory(categoryForm));
      if (data?.err) {
        throw data.err;
      }
      navigate("/categories");
      Swal.fire({
        title: "Category Added",
        icon: "success",
        confirmButtonText: "retry",
      });
    } catch (err) {
      Swal.fire({
        title: err,
        icon: "error",
        confirmButtonText: "retry",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mt-5 main-content">
      <div className="col-md-6 mb-3">
        <h3 className="form-label">New Category Name</h3>
        <input
          name="name"
          onChange={handleChange}
          placeholder="Enter Here"
          type="text"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

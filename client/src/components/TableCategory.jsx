import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategory } from "../store/action/actionCreator";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TableCategory() {
  const navigate = useNavigate();
  const { category } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const deleteHandle = async (id) => {
    try {
      dispatch(deleteCategory(id));
      Swal.fire({
        title: "Category Deleted",
        icon: "success",
        confirmButtonText: "ok",
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch, deleteHandle]);
  return (
    <>
      <div className="main-content">
        <div>
          <h1>CATEGORIES</h1>
          <NavLink
            className="btn btn-lg btn-outline-primary"
            to="/addCategories"
          >
            Add New Category
          </NavLink>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {category?.map((el) => (
              <tr key={el.id}>
                <th>{el.id}</th>
                <td>{el.name}</td>
                <td>
                  <button
                    onClick={() => deleteHandle(el.id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

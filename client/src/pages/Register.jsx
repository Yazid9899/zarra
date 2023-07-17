import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/action/actionCreator";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [RegisterForm, setRegisterForm] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setRegisterForm({
      ...RegisterForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await dispatch(register(RegisterForm));
      if (data?.err) {
        throw data.err;
      }
      navigate("/");
      Swal.fire({
        title: "Register Success",
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
    <div className="row main-content">
      <div className="col-md-6 offset-md-1 mt-5">
        <form className="row g-3" onSubmit={handleSubmit}>
          <h1>REGISTER FORM</h1>
          <div className="col-md-6">
            <label className="form-label">Email address</label>
            <input
              name="email"
              value={RegisterForm.email}
              onChange={handleChange}
              type="email"
              className="form-control"
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              name="password"
              value={RegisterForm.password}
              onChange={handleChange}
              type="password"
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label">Phone Number</label>
            <input
              name="phoneNumber"
              value={RegisterForm.phoneNumber}
              onChange={handleChange}
              type="number"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              name="address"
              value={Register.address}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-6">
            <button type="submit" className="btn btn-primary">
              add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../Apis/authApi";
import { MiniLoader } from "../Components/Page/Common";
import { toastNotify } from "../Helper/Index";
import inputHelper from "../Helper/inputHelper";
import { apiResponse } from "../Interface";
import { SD_Roles } from "../Utility/SD";

function Register() {
  const navigate = useNavigate();
  const [setUserRegister] = useRegisterUserMutation();
  const [error, SetErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    Email: "",
    Password: "",
    Role: "",
    Name: "",
  });
  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await setUserRegister({
      UserName: userInput.Email,
      Password: userInput.Password,
      Role: userInput.Role,
      Name: userInput.Name,
    });
    if (response.data) {
      toastNotify("Registeration successfully! Please login to continue. ");
      navigate("/login");
    } else if (response.error) {
      toastNotify(response.error.data.errorList[0], "error");
    }
    setLoading(false);
  };
  return (
    <div className="container text-center">
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              required
              name="Email"
              value={userInput.Email}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="Name"
              value={userInput.Name}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name="Password"
              value={userInput.Password}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <select
              className="form-control form-select"
              name="Role"
              value={userInput.Role}
              onChange={handleUserInput}
              required
            >
              <option value="">--Select Role--</option>
              <option value={SD_Roles.CUSTOMER}>Customer</option>
              <option value={SD_Roles.ADMIN}>Admin</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          {error && <p className="text-danger">{error}</p>}
          {loading ? (
            <MiniLoader />
          ) : (
            <button type="submit" className="btn btn-success">
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Register;

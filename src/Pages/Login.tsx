import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../Apis/authApi";
import { MiniLoader } from "../Components/Page/Common";
import inputHelper from "../Helper/inputHelper";
import { apiResponse, userModel } from "../Interface";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
function Login() {
  const navigate = useNavigate();
  const [error, SetErrorMessage] = useState("");
  const dispatch = useDispatch();
  const [setUserLogin] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    UserName: "",
    Password: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit triggered");
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await setUserLogin({
      UserName: userInput.UserName,
      Password: userInput.Password,
    });
    if (response.data) {
      console.log(response.data);
      const { token } = response.data.result!;

      const { unique_name, nameid, email, role }: userModel = jwt_decode(token);
      console.log(unique_name + nameid + email + role + "extracted value");
      localStorage.setItem("token", token);
      dispatch(setLoggedInUser({ unique_name, nameid, email, role }));
      navigate("/");
    } else if (response.error) {
      console.log(response.error.data.errorMessage[0]);
      SetErrorMessage(response.error.data.errorMessage[0]);
    }
    setLoading(false);
  };
  return (
    <div className="container text-center">
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Login</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              name="UserName"
              value={userInput.UserName}
              onChange={handleUserInput}
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="Password"
              value={userInput.Password}
              onChange={handleUserInput}
            />
          </div>
        </div>

        <div className="mt-2">
          {error && <p className="text-danger">{error}</p>}
          {loading ? (
            <MiniLoader />
          ) : (
            <button
              type="submit"
              className="btn btn-success"
              style={{ width: "200px" }}
            >
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { useLoginUserMutation } from "../Apis/authApi";
import inputHelper from "../Helper/inputHelper";
import { apiResponse } from "../Interface";
import {SD} from "../Utility/SD"
function Login() {
  const [error, SetErrorMessage] = useState("");
  const [setUserLogin] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await setUserLogin({
      UserName: userInput.userName,
      Password: userInput.password,
    });
    if (response.data) {
      console.log(response.data);
      const {token}= response.data.result!;
      localStorage.setItem("token",token);
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
              name="userName"
              value={userInput.userName}
              onChange={handleUserInput}
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
            />
          </div>
        </div>

        <div className="mt-2">
          {
            error && <p className="text-danger">{error}</p>
            
          }
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: "200px" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

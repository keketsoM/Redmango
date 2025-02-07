import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInitialPaymentMutation } from "../../../Apis/paymentApi";
import inputHelper from "../../../Helper/inputHelper";
import { apiResponse, cartItemModel } from "../../../Interface";
import { RootState } from "../../../Storage/Redux/store";
import { MainLoader } from "../Common";
function CartPickUpDetails() {
  const [isloading, setloading] = useState<boolean>(false);
  const [initiatePayment] = useInitialPaymentMutation();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.userAuthstore);
  const shoppingCartFromDb: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartstore.cartItems ?? []
  );

  let grandTotal = 0;
  let totalItem = 0;
  const initialUserData = {
    name: userData.unique_name,
    email: userData.email,
    phoneNumber: "",
  };

  shoppingCartFromDb.map((cartItem: cartItemModel) => {
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
    totalItem += cartItem.quantity ?? 0;
  });
  const [userInput, setUserInput] = useState(initialUserData);
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setloading(true);
    const { data }: apiResponse = await initiatePayment(userData.nameid);
    console.log(data);
    const orderSummmary = { grandTotal, totalItem };
    navigate("/payment", {
      state: { apiResult: data?.result, userData, orderSummmary },
    });
  };
  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        Pickup Details
      </h1>
      <hr />
      <form className="col-10 mx-auto" onSubmit={() => handleSubmit}>
        <div className="form-group mt-3">
          Pickup Name
          <input
            type="text"
            value={userInput.name}
            className="form-control"
            placeholder="name..."
            name="name"
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="form-group mt-3">
          Pickup Email
          <input
            type="email"
            value={userInput.email}
            className="form-control"
            placeholder="email..."
            name="email"
            onChange={handleUserInput}
            required
          />
        </div>

        <div className="form-group mt-3">
          Pickup Phone Number
          <input
            type="number"
            value={userInput.phoneNumber}
            className="form-control"
            placeholder="phone number..."
            name="phoneNumber"
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: "ghostwhite" }}>
            <h5>Grand Total : {grandTotal.toFixed(2)}</h5>
            <h5>No of items : {totalItem}</h5>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-success form-control mt-3"
          disabled={isloading}
        >
          {isloading ? <MainLoader /> : "Looks Good? Place Order!"}
        </button>
      </form>
    </div>
  );
}

export default CartPickUpDetails;

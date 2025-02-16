import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { getStatusColour } from "../../../Helper/Index";
import { cartItemModel } from "../../../Interface";
import { RootState } from "../../../Storage/Redux/store";
import { SD_Roles, SD_Status } from "../../../Utility/SD";
import { OrderSummaryProps } from "./OrderSummaryProps";
function OrderSummary({ data, userInput }: OrderSummaryProps) {
  const badgeTypeColour = getStatusColour(data.status!);
  const userData = useSelector((state: RootState) => state.userAuthstore);
  const nextStatus: any =
    data.status! === SD_Status.CONFIRMED
      ? { color: "info", value: SD_Status.BEING_COOKING }
      : data.status! === SD_Status.BEING_COOKING
      ? { color: "warning", value: SD_Status.READY_FOR_PICKUP }
      : data.status! === SD_Status.READY_FOR_PICKUP && {
          color: "success",
          value: SD_Status.COMPLETED,
        };
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-success">Order Summary</h3>
        <span className={`btn btn-outline-${badgeTypeColour} fs-6`}>
          {data.status}
        </span>
      </div>
      <div className="mt-3">
        <div className="border py-3 px-2">Name : {userInput.name} </div>
        <div className="border py-3 px-2">Email : {userInput.email} </div>
        <div className="border py-3 px-2">Phone : {userInput.phoneNumber}</div>
        <div className="border py-3 px-2">
          <h4 className="text-success">Menu Items</h4>
          <div className="p-3">
            {data.cartItems?.map((cartItems: cartItemModel, index: number) => {
              return (
                <div className="d-flex" key={index}>
                  <div className="d-flex w-100 justify-content-between">
                    <p>{cartItems.menuItem?.name}</p>
                    <p>
                      ${cartItems.menuItem?.price} x ${cartItems.quantity}
                    </p>
                  </div>
                  <p style={{ width: "70px", textAlign: "right" }}>
                    $
                    {(cartItems.menuItem?.price ?? 0) *
                      (cartItems.quantity ?? 0)}
                  </p>
                </div>
              );
            })}

            <hr />
            <h4 className="text-danger" style={{ textAlign: "right" }}>
              ${data.cartTotal?.toFixed(2)}
            </h4>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back to Orders
        </button>
        {userData.role === SD_Roles.ADMIN && (
          <div>
            <button className="btn btn-danger mx-2">Cancel</button>
            <button className={`btn btn-${nextStatus.color}`}>
              {nextStatus.value}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderSummary;

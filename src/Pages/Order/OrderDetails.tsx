import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../Apis/orderApi";
import OrderSummary from "../../Components/Page/Order/OrderSummary";
function OrderDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderDetailsQuery(id);
  let userInput, OrderDetails;
  if (!isLoading && data.result) {
    console.log(data);

    userInput = {
      name: data.result[0].pickupName,
      email: data.result[0].pickupEmail,
      phoneNumber: data.result[0].pickupPhoneNumber,
    };

    OrderDetails = {
      id: data.result[0].orderHeaderId,
      cartItems: data.result[0].cartItem,
      cartTotal: data.result[0].cartTotal,
      status: data.result[0].status,
    };
  }
  return (
    <>
      <div
        className="container my-5 mx-auto p-5 w-100"
        style={{ maxWidth: "750px" }}
      >
        {!isLoading && OrderDetails && userInput && (
          <OrderSummary data={OrderDetails} userInput={userInput} />
        )}
      </div>
    </>
  );
}

export default OrderDetails;

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import toastNotify from "../../../Helper/toastNotify";
import { cartItemModel } from "../../../Interface";
import { OrderSummaryProps } from "../Order/OrderSummaryProps";

const PaymentForms = ({ data, userInput }: OrderSummaryProps) => {
  const [isProcessing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.

      return;
    }
    setProcessing(true);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toastNotify("An unexpected error occured.", "error");
      setProcessing(false);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      console.log(result);

      // {
      //   "pickupName": "string",
      //   "pickupPhoneNumber": "string",
      //   "pickupEmail": "string",
      //   "applicationUserId": "string",
      //   "orderTotal": 0,
      //   "status": "string",
      //   "stripePaymentIntentID": "string",
      //   "totalItems": 0,
      //   "orderDetailCreateDTO": [
      //     {
      //       "menuItemId": 0,
      //       "quantity": 0,
      //       "itemName": "string",
      //       "price": 0
      //     }
      //   ]
      // }
      const orderDetailsDTO: any = [];
      data.cartItems.forEach((item: cartItemModel) => {
        const temOrderDetail: any = {};
        temOrderDetail["menuItemId"] = item.menuItem?.id;
        temOrderDetail["quantity"] = item.quantity;
        temOrderDetail["itemName"] = item.menuItem?.name;
        temOrderDetail["price"] = item.menuItem?.price;
        orderDetailsDTO.push(temOrderDetail);
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="btn btn-success mt-5 w-100">Submit</button>
    </form>
  );
};
export default PaymentForms;

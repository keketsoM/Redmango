import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { OrderSummary } from "../Components/Page/Order/Index";
import {PaymentForms} from "../Components/Page/Payment/Index";


function Payments() {
  const {
    state: { apiResult, userInput },
  } = useLocation();
  const stripePromise = loadStripe(
    "pk_test_51PpckWBCwh1VidzxJHIxSYTOYGuCYHdmwKtLynVS8LAPu5xpQWipxg21SJWWywkVBkqZrfDa1idY8m9myQlGL1dp00CT8ZzEFU"
  );
  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="container m-5 p-5">
        <div className="row">
          <div className="col-md-7">
            <OrderSummary data={apiResult} userInput={userInput} />
          </div>
          <div className="col-md-4 offset-md-1">
            <h3 className="text-success">Payment</h3>
            <div className="mt-5">
              <PaymentForms data={apiResult} userInput={userInput} />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payments;

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import PaymentForm from "../Components/Page/Payment/PaymentForm";

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
      <PaymentForm />
    </Elements>
  );
}

export default Payments;

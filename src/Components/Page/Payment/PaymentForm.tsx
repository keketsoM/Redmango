
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useState } from 'react';
import toastNotify from '../../../Helper/toastNotify';

function PaymentForm() {
  const [isProcessing,setProcessing] =useState(false);
  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
     
    const handleSubmit = async (event) => {
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
        redirect:"if_required"
      });
  
      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        toastNotify("An unexpected error occured.","error");
        setProcessing(false);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
        console.log(result)
      }
    };
  return (
    <form  onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="btn btn-success mt-5 w-100">Submit</button>
    </form>
  );
}

export default PaymentForm;

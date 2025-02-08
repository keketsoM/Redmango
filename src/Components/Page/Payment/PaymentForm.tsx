import {PaymentElement} from '@stripe/react-stripe-js';

function PaymentForm() {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
}

export default PaymentForm;

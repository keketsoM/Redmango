import { cartItemModel } from "../../../Interface";

export interface OrderSummaryProps {
  data: {
    id?: number;
    cartItems?: cartItemModel[];
    cartTotal?: number;
    userId?:string;
    stripePaymentIntentId?:string;
    status?:string;
    
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}

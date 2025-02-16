import { cartItemModel } from "../../../Interface";
import { SD_Status } from "../../../Utility/SD";

export interface OrderSummaryProps {
  data: {
    id?: number;
    cartItems?: cartItemModel[];
    cartTotal?: number;
    userId?:string;
    stripePaymentIntentId?:string;
    status?:SD_Status;
    
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}

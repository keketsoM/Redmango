import { cartItemModel } from "../../../Interface";

export interface OrderSummaryProps {
  data: {
    id?: number;
    cartItems: cartItemModel[];
    cartTotal?: number;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}

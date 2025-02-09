import { shoppingCartModel } from "../../../Interface";

export interface OrderSummaryProps {
  data: {
    id: number;
    cartItem: shoppingCartModel[];
    cartTotal: number;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}

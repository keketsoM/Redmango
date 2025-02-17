import OrderHeaderModel from "../../../Interface/OrderHeaderModel";

export default interface OrderListType {
  isLoading: boolean;
  orderData: OrderHeaderModel[];
}

import menuItemModel from "./menuItemModule";

export default interface OrderDetail {
  orderDetailsId?: number;
  orderHeaderId?: number;
  menuItemId?: number;
  menuItem?: menuItemModel;
  quantity?: number;
  itemName?: string;
  price?: number;
}

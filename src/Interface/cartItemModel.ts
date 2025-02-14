import menuItemModel from "./menuItemModel";

export default interface cartItemModel {
  cartItemId?: number;
  quantity?: number;
  shoppingCartId?: number;
  menuItemId?: number;
  menuItem?: menuItemModel;
}

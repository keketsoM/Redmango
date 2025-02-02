import menuItemModel from "./menuItemModule";

export default interface cartItemModel {
  cartItemId?: number;
  quantity?: number;

  menuItemId?: number;
  menuItem?: menuItemModel;
}

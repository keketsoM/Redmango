import { useDispatch, useSelector } from "react-redux";
import { useUpdateShoppingCartMutation } from "../../../Apis/ShoppingCartApi";
import { cartItemModel } from "../../../Interface";
import {
  removeFromCart,
  updateQuantity,
} from "../../../Storage/Redux/shoppingCartSlice";
import { RootState } from "../../../Storage/Redux/store";
function CartSummary() {
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartstore.cartItems ?? []
  );
  const userData = useSelector((state: RootState) => state.userAuthstore);
  const dispatch = useDispatch();
  if (!shoppingCartFromStore) {
    return <div>Shopping Cart Empty</div>;
  }

  const handleUpdateQuality = (
    updateQuantityBy: number,
    cartItem: cartItemModel
  ) => {
    if (
      (updateQuantityBy === -1 && cartItem.quantity === 1) ||
      updateQuantityBy === 0
    ) {
      //remove the item
      updateShoppingCart({
        userId: userData.nameid,
        menuItemId: cartItem.menuItemId,
        updateQuantityBy: 0,
      });
      dispatch(removeFromCart({ cartItem, quantity: 0 }));
    } else {
      //update the quantity with the new quantity
      updateShoppingCart({
        userId: userData.nameid,
        menuItemId: cartItem.menuItem?.id,
        updateQuantityBy: updateQuantityBy,
      });
      dispatch(
        updateQuantity({
          cartItem,
          quantity: cartItem.quantity! + updateQuantityBy,
        })
      );
    }
  };

  return (
    <div className="container p-4 m-2">
      <h4 className="text-center text-success">Cart Summary</h4>

      {shoppingCartFromStore.map((cartItem: cartItemModel, index: number) => (
        <div
          className="d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3"
          style={{ background: "ghostwhite" }}
        >
          <div className="p-3">
            <img
              src={cartItem.menuItem?.image}
              alt=""
              width={"120px"}
              className="rounded-circle"
            />
          </div>
          <div className="p-2 mx-3" style={{ width: "100%" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 style={{ fontWeight: 300 }}>{cartItem.menuItem?.name}</h4>
              <h4>
                R {(cartItem.menuItem!.price * cartItem.quantity!).toFixed(2)}
              </h4>
            </div>
            <div className="flex-fill">
              <h4 className="text-danger">R {cartItem.menuItem?.price}</h4>
            </div>
            <div className="d-flex justify-content-between">
              <div
                className="d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow  "
                style={{
                  width: "100px",
                  height: "43px",
                }}
              >
                <span style={{ color: "rgba(22,22,22,.7)" }} role="button">
                  <i
                    className="bi bi-dash-circle-fill"
                    onClick={() => handleUpdateQuality(-1, cartItem)}
                  ></i>
                </span>
                <span>
                  <b>{cartItem.quantity}</b>
                </span>
                <span style={{ color: "rgba(22,22,22,.7)" }} role="button">
                  <i
                    className="bi bi-plus-circle-fill"
                    onClick={() => handleUpdateQuality(1, cartItem)}
                  ></i>
                </span>
              </div>

              <button
                className="btn btn-danger mx-1"
                onClick={() => handleUpdateQuality(0, cartItem)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartSummary;

import { useSelector } from "react-redux";
import { cartItemModel } from "../../../Interface";
import { RootState } from "../../../Storage/Redux/store";

function CartPickUpDetails() {
  const shoppingCartFromDb: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartstore.cartItems ?? []
  );
  let grandTotal = 0;
  let totalItem = 0;
  shoppingCartFromDb.map((cartItem: cartItemModel) => {
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
    totalItem += cartItem.quantity ?? 0;
  });
  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        Pickup Details
      </h1>
      <hr />
      <form className="col-10 mx-auto">
        <div className="form-group mt-3">
          Pickup Name
          <input
            type="text"
            className="form-control"
            placeholder="name..."
            name="name"
            required
          />
        </div>
        <div className="form-group mt-3">
          Pickup Email
          <input
            type="email"
            className="form-control"
            placeholder="email..."
            name="email"
            required
          />
        </div>

        <div className="form-group mt-3">
          Pickup Phone Number
          <input
            type="number"
            className="form-control"
            placeholder="phone number..."
            name="phoneNumber"
            required
          />
        </div>
        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: "ghostwhite" }}>
            <h5>
              Grand Total : {grandTotal.toFixed(2)}
            </h5>
            <h5>No of items : {totalItem}</h5>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-success form-control mt-3"
        >
          Looks Good? Place Order!
        </button>
      </form>
    </div>
  );
}

export default CartPickUpDetails;

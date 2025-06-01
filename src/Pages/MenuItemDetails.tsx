import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMenuItemQuery } from "../Apis/MenuItemApi";
import { useUpdateShoppingCartMutation } from "../Apis/ShoppingCartApi";
import { MainLoader, MiniLoader } from "../Components/Page/Common";
import { toastNotify } from "../Helper/Index";
import { apiResponse } from "../Interface";
import { RootState } from "../Storage/Redux/store";
// userId =f3443504-018c-4d9d-beba-1bfebdc249a9
function MenuItemDetails() {
  const { menuItemId } = useParams();
  const { data, isLoading } = useGetMenuItemQuery(menuItemId);
  const navigate = useNavigate();
  const [updateQuantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData = useSelector((state: RootState) => state.userAuthstore);
  const handleAddToCart = async () => {
    if (!userData.nameid) {
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);
    console.dir(updateQuantity);
    const response: apiResponse = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: updateQuantity,
      userId: userData.nameid,
    });
    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to cart successfully");
    }
    setIsAddingToCart(false);
  };

  function handleAddQuantity(count: number) {
    setQuantity(updateQuantity + count);
  }
  function handleMinusQuantity(count: number) {
    updateQuantity <= 0 ? setQuantity(0) : setQuantity(updateQuantity - count);
  }

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        <div className="col-7">
          <h2 className="text-success">{data.result.name}</h2>
          <span>
            <span className="badge text-bg-dark pt-2">
              {data.result.category}
            </span>
          </span>
          <span>
            <span className="badge text-bg-light pt-2">
              {data.result.specialTag}
            </span>
          </span>
          <p className="pt-2">{data.result.description}</p>
          <span style={{ fontWeight: "bold" }}>R{data.result.price}</span>{" "}
          &nbsp;&nbsp;&nbsp;
          <span
            className="pb-lg-2 p-lg-3 "
            style={{ border: "1px solid #333", borderRadius: "30px" }}
          >
            <i
              onClick={() => handleMinusQuantity(1)}
              className="bi bi-dash p-1"
              style={{ cursor: "pointer" }}
            ></i>
            <span className="mt-3 px-3">{updateQuantity}</span>
            <i
              onClick={() => handleAddQuantity(1)}
              className="bi bi-plus p-1"
              style={{ cursor: "pointer" }}
            ></i>
          </span>
          <div className="row pt-4">
            <div className="col-5">
              {isAddingToCart ? (
                <button className="btn btn-success form-control">
                  <MiniLoader />
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart()}
                  className="btn btn-success form-control"
                >
                  Add to Cart
                </button>
              )}
            </div>

            <div onClick={() => navigate(-1)} className="col-5 ">
              <button className="btn btn-secondary form-control">
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <div className="col-5 col-sm-2">
          <img
            src={data.result.image}
            width="100%"
            style={{ borderRadius: "50%" }}
            alt="No content"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default MenuItemDetails;

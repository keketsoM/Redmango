import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMenuItemQuery } from "../Apis/MenuItemApi";
import { useUpdateShoppingCartMutation } from "../Apis/ShoppingCartApi";
// userId =f3443504-018c-4d9d-beba-1bfebdc249a9
function MenuItemDetails() {
  const { menuItemId } = useParams();
  const { data, isLoading } = useGetMenuItemQuery(menuItemId);
  const navigate = useNavigate();
  const [updateQuantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    console.dir(updateQuantity)
    const response = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantity:updateQuantity,
      userId: "f3443504-018c-4d9d-beba-1bfebdc249a9",
    });
    console.dir(response)
    setIsAddingToCart(false);
  };

  function handleAddQuantity(count: number) {
    setQuantity(updateQuantity + count);
  }
  function handleMinusQuantity(count: number) {
    updateQuantity <= 0 ? setQuantity(0) : setQuantity(updateQuantity - count);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        <div className="col-7">
          <h2 className="text-success">{data.result.name}</h2>
          <span>
            <span
              className="badge text-bg-dark pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              {data.result.category}
            </span>
          </span>
          <span>
            <span
              className="badge text-bg-light pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              {data.result.specialTag}
            </span>
          </span>
          <p style={{ fontSize: "20px" }} className="pt-2">
            {data.result.description}
          </p>
          <span className="h3">R{data.result.price}</span> &nbsp;&nbsp;&nbsp;
          <span
            className="pb-2  p-3"
            style={{ border: "1px solid #333", borderRadius: "30px" }}
          >
            <i
              onClick={() => handleMinusQuantity(1)}
              className="bi bi-dash p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
            <span className="h3 mt-3 px-3">{updateQuantity}</span>
            <i
              onClick={() => handleAddQuantity(1)}
              className="bi bi-plus p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
          </span>
          <div className="row pt-4">
            <div className="col-5">
              <button
                onClick={() => handleAddToCart()}
                className="btn btn-success form-control"
              >
                Add to Cart
              </button>
            </div>

            <div onClick={() => navigate(-1)} className="col-5 ">
              <button className="btn btn-secondary form-control">
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <div className="col-5">
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

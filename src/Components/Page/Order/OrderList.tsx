import { useNavigate } from "react-router-dom";
import getStatusColour from "../../../Helper/getStatusColour";
import OrderHeaderModel from "../../../Interface/OrderHeaderModel";
import { MainLoader } from "../Common";
import OrderListProps from "./OrderListType";
function OrderList({ isLoading, orderData }: OrderListProps) {
  const navigate = useNavigate();

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table px-5">
          <div className="p-2">
            <div className="row border">
              <div className="col-1 d-none d-md-block d-lg-block d-xl-block">
                ID
              </div>
              <div className="col-2">Name</div>
              <div className="col-2 d-none d-md-block d-lg-block d-xl-block">
                Phone
              </div>
              <div className="col-2">Total</div>
              <div className="col-1">Items</div>
              <div className="col-lg-1 col-md-1 col-2 ">Date</div>
              <div className="col-2">Status</div>
              <div className="col-1"></div>
            </div>
            {orderData.map((orderItem: OrderHeaderModel) => {
              const badgeColor = getStatusColour(orderItem.status!);
              return (
                <div className="row border p-0" key={orderItem.orderHeaderId}>
                  <div className="col-1 d-none d-md-block d-lg-block d-xl-block">
                    {orderItem.orderHeaderId}
                  </div>
                  <div className="col-2">{orderItem.pickupName}</div>
                  <div className="col-2 d-none d-md-block d-lg-block d-xl-block">
                    {orderItem.pickupPhoneNumber}
                  </div>
                  <div className="col-2">
                    $ {orderItem.orderTotal?.toFixed(2)}
                  </div>
                  <div className="col-1">{orderItem.totalItems}</div>
                  <div className="col-lg-1 col-md-1 col-2 ">
                    {new Date(orderItem.orderDate!).toLocaleDateString()}
                  </div>
                  <div className="col-2">
                    <span className={`badge bg-${badgeColor}`}>
                      {orderItem.status}
                    </span>
                  </div>
                  <div className="col-1">
                    <button
                      onClick={() =>
                        navigate(
                          `/order/orderDetails/${orderItem.orderHeaderId}`
                        )
                      }
                      className="btn btn-success"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default OrderList;

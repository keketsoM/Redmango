import { useSelector } from "react-redux/es/hooks/useSelector";
import { useGetAllOrderQuery } from "../../Apis/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import OrderList from "../../Components/Page/Order/OrderList";
import withAuth from "../../HOC/withAuth";
import { RootState } from "../../Storage/Redux/store";
import { SD_Status } from "../../Utility/SD";

const filterOption = [
  "All",
  SD_Status.CONFIRMED,
  SD_Status.BEING_COOKING,
  SD_Status.READY_FOR_PICKUP,
  SD_Status.CANCELLED
]

function MyOrders() {
  const userId = useSelector((state: RootState) => state.userAuthstore.nameid);
  const { data, isLoading } = useGetAllOrderQuery(userId);
  console.log(userId);
  console.log(data);
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
            <h1 className="text-success">My Orders</h1>
          </div>
          <OrderList isLoading={isLoading} orderData={data.result} />
        </>
      )}
    </>
  );
}

export default withAuth(MyOrders);

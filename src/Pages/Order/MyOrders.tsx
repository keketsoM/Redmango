import { useSelector } from "react-redux/es/hooks/useSelector";
import { useGetAllOrderQuery } from "../../Apis/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import OrderList from "../../Components/Page/Order/OrderList";
import withAuth from "../../HOC/withAuth";
import { RootState } from "../../Storage/Redux/store";
function MyOrders() {
  const userId = useSelector((state: RootState) => state.userAuthstore.nameid);
  const { data, isLoading } = useGetAllOrderQuery(userId);
  console.log(data);
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data.result} />
      )}
    </>
  );
}

export default withAuth(MyOrders);

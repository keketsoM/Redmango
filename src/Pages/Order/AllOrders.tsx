
import { useGetAllOrderQuery } from "../../Apis/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import OrderList from "../../Components/Page/Order/OrderList";


import withAdminAuth from "../../HOC/withAdminAuth";
function MyOrders() {

  const { data, isLoading } = useGetAllOrderQuery("");
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

export default withAdminAuth(MyOrders);

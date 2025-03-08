import { useEffect, useState } from "react";
import { useGetAllOrderQuery } from "../../Apis/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import OrderList from "../../Components/Page/Order/OrderList";

import withAdminAuth from "../../HOC/withAdminAuth";
import { inputHelper } from "../../Helper/Index";
import { SD_Status } from "../../Utility/SD";
function AllOrders() {
  const [orderData, setOrderData] = useState([]);
  const [filter, setFilters] = useState({ searchString: "", status: "" });
  const [apiFilter, setApiFilters] = useState({ searchString: "", status: "" });
  const { data, isLoading } = useGetAllOrderQuery({
    ...(apiFilter && {
      userId: "",
      searchString: apiFilter.searchString,
      status: apiFilter.status,
    }),
  });

  const filterOption = [
    "All",
    SD_Status.CONFIRMED,
    SD_Status.BEING_COOKING,
    SD_Status.READY_FOR_PICKUP,
    SD_Status.CANCELLED,
  ];
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, filter);
    setFilters(tempData);
  };

  const handleFilters = () => {
    setApiFilters({ searchString: filter.searchString, status: filter.status });
  };

  useEffect(() => {
    if (data) {
      setOrderData(data.result);
    }
  }, [data]);

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
            <h1 className="text-success">Orders List</h1>
            <div className="d-flex " style={{ width: "40%" }}>
              <input
                type="text"
                className="form-control mx-2"
                placeholder="Search Name, Email or Phone"
                name="searchString"
                // value={}
                onChange={handleChange}
              />
              <select
                className="form-select w-50 mx-2"
                onChange={handleChange}
                name="status"
              >
                {filterOption.map((item, index) => (
                  <div key={index}>
                    <option value={item === "All" ? "" : item}>{item}</option>
                  </div>
                ))}
              </select>
              <button
                className="btn btn-outline-success"
                onClick={() => handleFilters()}
              >
                Filter
              </button>
            </div>
          </div>
          <OrderList isLoading={isLoading} orderData={orderData} />
        </>
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);

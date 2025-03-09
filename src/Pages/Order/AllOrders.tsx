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
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
  });
  const [apiFilter, setApiFilters] = useState({ searchString: "", status: "" });
  const { data, isLoading } = useGetAllOrderQuery({
    ...(apiFilter && {
      userId: "",
      searchString: apiFilter.searchString,
      status: apiFilter.status,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize,
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
  const handlePaginationClick = (direction: string) => {
    if (direction === "prev") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber - 1 });
    } else if (direction === "next") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber + 1 });
    }
  };
  useEffect(() => {
    if (data) {
      setOrderData(data.apiResponse.result);
      const { TotalRecords } = JSON.parse(data.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);
  console.log(totalRecords);
  const getPageDetails = () => {
    const dataStartNumber =
      (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartNumber}
             -
            ${
              dataEndNumber < totalRecords ? dataEndNumber : totalRecords
            } of ${totalRecords}`;
  };
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
          <div className="d-flex mx-5 justify-content-end align-items-center">
            <div className="mx-2">{getPageDetails()}</div>
            <button
              className="btn btn-outline-primary px-3 mx-2"
              disabled={pageOptions.pageNumber === 1}
              onClick={() => handlePaginationClick("prev")}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              onClick={() => handlePaginationClick("next")}
              className="btn btn-outline-primary px-3 mx-2"
              disabled={
                pageOptions.pageNumber * pageOptions.pageSize >= totalRecords
              }
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);

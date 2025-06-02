import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteMenuItemMutation,
  useGetAllMenuItemQuery,
} from "../../Apis/MenuItemApi";
import { MainLoader } from "../../Components/Page/Common";
import { menuItemModel } from "../../Interface";

function MenuItemList() {
  const [deleteMenuItem] = useDeleteMenuItemMutation();
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllMenuItemQuery(null);
  console.log(data);
  console.dir(data.result);

  const handleMenuItemDelete = async (id: number) => {
    deleteMenuItem(id);
    toast.promise(
      deleteMenuItem(id),
      {
        pending: "Processing your request",
        success: "Menu Item Deleted Successfully",
        error: "Error encoutnered",
      },
      {
        theme: "dark",
      }
    );
  };
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">MenuItem List</h1>
            <button
              onClick={() => navigate(`/MenuItem/MenuItemUpsert`)}
              className="btn btn-success"
            >
              Add New Menu Item
            </button>
          </div>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Image</div>
              <div className="col-1 d-none d-md-block d-lg-block d-xl-block">
                ID
              </div>
              <div className="col-2">Name</div>
              <div className="col-2">Category</div>
              <div className="col-1">Price</div>
              <div className="col-2">Special Tag</div>
              <div className="col">Action</div>
            </div>
            {data.result.map((menuItem: menuItemModel) => {
              return (
                <div className="row border" key={menuItem.id}>
                  <div className="col-1">
                    <img
                      src={menuItem.image}
                      alt="MenuItems Images "
                      style={{ width: "100%", maxWidth: "120px" }}
                    />
                  </div>
                  <div className="col-1 d-none d-md-block d-lg-block d-xl-block">
                    {menuItem.id}
                  </div>
                  <div className="col-2">{menuItem.name}</div>
                  <div className="col-2">{menuItem.category}</div>
                  <div className="col-1">${menuItem.price}</div>
                  <div className="col-2">{menuItem.specialTag}</div>
                  <div className="col">
                    <button
                      onClick={() =>
                        navigate(`/MenuItem/MenuItemUpsert/${menuItem.id}`)
                      }
                      className="btn btn-success"
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleMenuItemDelete(menuItem.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
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

export default MenuItemList;

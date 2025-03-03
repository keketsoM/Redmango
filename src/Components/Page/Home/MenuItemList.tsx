import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllMenuItemQuery } from "../../../Apis/MenuItemApi";
import { menuItemModel } from "../../../Interface";
import { setMeunItem } from "../../../Storage/Redux/menuItemSlice";
import { RootState } from "../../../Storage/Redux/store";
import { MainLoader } from "../Common";
import MenuItemCard from "./MenuItemCard";
function MenuItemList() {
  const { data, isLoading } = useGetAllMenuItemQuery(null);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);
  const [menuItem, setMenuItems] = useState<menuItemModel[]>([]);
  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.searchItem
  );
  console.log(data);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMeunItem(data.result));
      setMenuItems(data.result);
      const tempCategoryList = ["All"];
      data.result.forEach((item: menuItemModel) => {
        if (tempCategoryList.indexOf(item.category) === -1) {
          tempCategoryList.push(item.category);
        }
      });
      setCategoryList(tempCategoryList);
    }
  }, [isLoading]);
  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(searchValue);
      setMenuItems(tempMenuArray);
    }
  }, [searchValue]);
  const handleFilters = (search: string) => {
    let tempMenuItems = [...data.result];

    if (search) {
      const tempSearchMenuItems = [...tempMenuItems];
      tempMenuItems = tempSearchMenuItems.filter((items: menuItemModel) =>
        items.name.toUpperCase().includes(search.toUpperCase())
      );
    }
    return tempMenuItems;
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center">
          {categoryList.map((categoryName, index) => (
            <li className="nav-item" key={index}>
              <button
                className={`nav-link p-0 pb-2 custom-buttons fs-5 ${
                  index === 0 && "active"
                }`}
              >
                {categoryName}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {menuItem.length > 0 &&
        menuItem.map((menuItem: menuItemModel, Index: number) => {
          return <MenuItemCard menuItem={menuItem} key={Index} />;
        })}
    </div>
  );
}

export default MenuItemList;

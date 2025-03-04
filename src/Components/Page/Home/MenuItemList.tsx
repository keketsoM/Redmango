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
      const tempMenuArray = handleFilters(searchValue, "ALL");
      setMenuItems(tempMenuArray);
    }
  }, [searchValue]);

  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    let localCategory;
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add("active");
        if (index === 0) {
          localCategory = "ALL";
        } else {
          localCategory = categoryList[index];
        }
        setSelectedCategory(localCategory);
        const tempArray = handleFilters(searchValue, localCategory);
        setMenuItems(tempArray);
      } else {
        button.classList.remove("active");
      }
    });
  };

  const handleFilters = (search: string, category: string) => {
    let tempArray =
      category === "ALL"
        ? [...data.result]
        : data.result.filter(
            (items: menuItemModel) =>
              items.category.toUpperCase() === category.toUpperCase()
          );

    if (search) {
      const tempSearchMenuItems = [...tempArray];
      tempArray = tempSearchMenuItems.filter((items: menuItemModel) =>
        items.name.toUpperCase().includes(search.toUpperCase())
      );
    }
    return tempArray;
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
                onClick={() => handleCategoryClick(index)}
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

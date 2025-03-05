import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllMenuItemQuery } from "../../../Apis/MenuItemApi";
import { menuItemModel } from "../../../Interface";
import { setMeunItem } from "../../../Storage/Redux/menuItemSlice";
import { RootState } from "../../../Storage/Redux/store";
import { SD_SortTypes } from "../../../Utility/SD";
import { MainLoader } from "../Common";
import MenuItemCard from "./MenuItemCard";
function MenuItemList() {
  const { data, isLoading } = useGetAllMenuItemQuery(null);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);
  const [sortName, setSortName] = useState(SD_SortTypes.NAME_A_Z);

  const [menuItem, setMenuItems] = useState<menuItemModel[]>([]);
  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.searchItem
  );
  const sortOptions: Array<SD_SortTypes> = [
    SD_SortTypes.PRICE_LOW_HIGH,
    SD_SortTypes.PRICE_HIGH_LOW,
    SD_SortTypes.NAME_A_Z,
    SD_SortTypes.NAME_Z_A,
  ];

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
      const tempMenuArray = handleFilters(
        searchValue,
        selectedCategory,
        sortName
      );
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
        const tempArray = handleFilters(searchValue, localCategory, sortName);
        setMenuItems(tempArray);
      } else {
        button.classList.remove("active");
      }
    });
  };

  const handleSortClick = (i: number) => {
    setSortName(sortOptions[i]);
    const tempArray = handleFilters(
      searchValue,
      selectedCategory,
      sortOptions[i]
    );
    setMenuItems(tempArray);
  };
  const handleFilters = (
    search: string,
    category: string,
    sortType?: SD_SortTypes
  ) => {
    let tempArray =
      category === "ALL"
        ? [...data.result]
        : data.result.filter(
            (items: menuItemModel) =>
              items.category.toUpperCase() === category.toUpperCase()
          );

    //search Functionality
    if (search) {
      const tempArray2 = [...tempArray];
      tempArray = tempArray2.filter((items: menuItemModel) =>
        items.name.toUpperCase().includes(search.toUpperCase())
      );
    }
    //sort
    if (sortType === SD_SortTypes.PRICE_LOW_HIGH) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => a.price - b.price);
    }
    if (sortType === SD_SortTypes.PRICE_HIGH_LOW) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => b.price - a.price);
    }
    if (sortType === SD_SortTypes.NAME_A_Z) {
      tempArray.sort(
        (a: menuItemModel, b: menuItemModel) =>
          a.name.toUpperCase().charCodeAt(0) -
          b.name.toUpperCase().charCodeAt(0)
      );
    }
    if (sortType === SD_SortTypes.NAME_Z_A) {
      tempArray.sort(
        (a: menuItemModel, b: menuItemModel) =>
          b.name.toUpperCase().charCodeAt(0) -
          a.name.toUpperCase().charCodeAt(0)
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
          <li className="nav-item dropdown" style={{ marginLeft: "auto" }}>
            <div
              className="nav-link dropdown-toggle text-dark fs-6 border"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortName}
            </div>
            <ul className="dropdown-menu">
              {sortOptions.map((sortType, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSortClick(index)}
                >
                  {sortType}
                </li>
              ))}
            </ul>
          </li>
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

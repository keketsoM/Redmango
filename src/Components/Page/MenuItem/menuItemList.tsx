import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetAllMenuItemQuery } from "../../../Apis/MenuItemApi";
import { menuItemModel } from "../../../Interface";
import { setMeunItem } from "../../../Storage/Redux/menuItemSlice";
import MenuItemCard from "./MenuItemCard";
function MenuItemList() {
  //const [menuItem, setMeunItem] = useState<menuItemModel[]>([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllMenuItemQuery(null);
  useEffect(() => {
    // fetch("https://localhost:44344/api/MenuItem")
    //   .then((Response) => Response.json())
    //   .then((data) => {
    //     console.dir(data);
    //     setMeunItem(data.result);
    //   });

    if (!isLoading) {
      dispatch(setMeunItem(data.result));
    }
  }, [isLoading]);
  if (isLoading) {
   return <div>still Loading...</div>;
  }
  return (
    <div className="container row">
      {data.result.length > 0 &&
        data.result.map((menuItem: menuItemModel, Index: number) => {
          return <MenuItemCard menuItem={menuItem} key={Index} />;
        })}
    </div>
  );
}

export default MenuItemList;

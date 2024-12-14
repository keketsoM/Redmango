import { useEffect, useState } from "react";
import { menuItemModel } from "../../../Interface";
import MenuItemCard from "./MenuItemCard";
function MenuItemList() {
  const [menuItem, setMeunItem] = useState<menuItemModel[]>([]);

  useEffect(() => {
    fetch("https://localhost:44344/api/MenuItem")
      .then((Response) => Response.json())
      .then((data) => {
        console.dir(data);
        setMeunItem(data.result);
      });
  }, []);
  return <div className="container row">{
    menuItem.length>0&& menuItem.map((menuItem,Index)=>{
      return <div>
        <MenuItemCard menuItem={menuItem} key={Index}/>
      </div>
    })
    
  }</div>;
}

export default MenuItemList;

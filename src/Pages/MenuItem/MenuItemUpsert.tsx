import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateMenuItemMutation,
  useGetMenuItemQuery,
  useUpdateMenuItemMutation,
} from "../../Apis/MenuItemApi";
import { MainLoader } from "../../Components/Page/Common";
import { inputHelper, toastNotify } from "../../Helper/Index";
import { SD_Categories } from "../../Utility/SD";

const Categories = [
  SD_Categories.APPETIZER,
  SD_Categories.BEVERAGES,
  SD_Categories.DESSERT,
  SD_Categories.ENTREE,
];
const menuItemData = {
  Name: "",
  Description: "",
  SpecialTag: "",
  Category: Categories[0],
  Price: "",
};

function MenuItemUpsert() {
  const [menuItemInput, setMenuInputs] = useState(menuItemData);
  const [imageToDisplay, setImageToDisplay] = useState<string>();
  const [imageToStore, setImageToStore] = useState<any>("");
  const [isloading, SetLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetMenuItemQuery(id);
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const [CreateMenuItem] = useCreateMenuItemMutation();

  useEffect(() => {
    if (data && data.result) {
      console.log("data" + data);
      const tempData = {
        Name: data.result.name,
        Description: data.result.description,
        SpecialTag: data.result.specialTag,
        Category: data.result.category,
        Price: data.result.price,
      };
      setMenuInputs(tempData);
      setImageToDisplay(data.result.image);
    }
  }, [data]);
  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInput);
    setMenuInputs(tempData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const imgType = file.name.split(".")[1].toLowerCase();
      const vaildImgTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = vaildImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToStore("");
        toastNotify("File Must be less then 1 MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore("");
        toastNotify("File Must be in jpeg, Jpg or png", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      setImageToStore(file);
      console.log("Image to Store set");
      reader.onload = (e) => {
        console.log(e);
        const imgUrl = e.target?.result as string;
        console.log("Image to display set");
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetLoading(true);
    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      SetLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("Name", menuItemInput.Name);
    formData.append("Description", menuItemInput.Description);
    formData.append("SpecialTag", menuItemInput.SpecialTag??"");
    formData.append("Category", menuItemInput.Category);
    formData.append("Price", menuItemInput.Price);
    if (imageToDisplay) {
      formData.append("Image", imageToStore);
    }
    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateMenuItem({ data: formData, id });

      toastNotify("Menu Item updated successfully", "success");
    } else {
      //create
      response = await CreateMenuItem(formData);
      toastNotify("Menu Item created successfully", "success");
    }

    if (response) {
      SetLoading(false);
      navigate("/MenuItem/MenuItemList");
    }
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {isloading && <MainLoader />}
      <h3 className="px-2 text-success">
        {id ? "Update Menu Item" : "Add Menu Item"}
      </h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="Name"
              value={menuItemInput.Name}
              onChange={handleMenuItemInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              rows={10}
              name="Description"
              value={menuItemInput.Description}
              onChange={handleMenuItemInput}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Special Tag"
              name="SpecialTag"
              value={menuItemInput.SpecialTag}
              onChange={handleMenuItemInput}
            />
            <select
              className="form-control mt-3 form-select"
              name="Category"
              value={menuItemInput.Category}
              onChange={handleMenuItemInput}
            >
              {Categories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="Price"
              value={menuItemInput.Price}
              onChange={handleMenuItemInput}
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control mt-3"
            />
            <div className="row">
              <div className="col-6">
                <button
                  onClick={() => handleSubmit}
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  className="btn btn-secondary form-control mt-3"
                  onClick={() => navigate("/MenuItem/MenuItemList")}
                >
                  Back to Menu Items
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToDisplay}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MenuItemUpsert;

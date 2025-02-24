import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMenuItemMutation } from "../../Apis/MenuItemApi";
import { inputHelper, toastNotify } from "../../Helper/Index";
const menuItemData = {
  Name: "",
  Description: "",
  SpecialTag: "",
  Category: "",
  Price: "",
};
function MenuItemUpsert() {
  const [menuItemInput, setMenuInputs] = useState(menuItemData);
  const [imageToDisplay, setImageToDisplay] = useState<string>();
  const [imageToStore, setImageToStore] = useState<any>("");
  const [isloading, SetLoading] = useState(false);
  const navigate = useNavigate();
  const [CreateMenuItem] = useCreateMenuItemMutation();
  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInput);
    setMenuInputs(tempData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const file = e.target.files && e.target.files[0];

    if (file) {
      const imgType = file.type.split("/")[1];
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
      reader.onload = (e) => {
        console.log(e);
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SetLoading(true);
    if (!imageToStore) {
      toastNotify("Please upload an image", "error");
      SetLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("Name", menuItemInput.Name);
    formData.append("Description", menuItemInput.Description);
    formData.append("SpecialTag", menuItemInput.SpecialTag);
    formData.append("Category", menuItemInput.Category);
    formData.append("Price", menuItemInput.Price);
    formData.append("Image", imageToStore);

    const response = await CreateMenuItem(formData);
    if (response) {
      console.log(response);
      SetLoading(false);
      navigate("/MenuItem/MenuItemList");
    }
  };

  return (
    <div className="container border mt-5 p-5">
      <h3 className="offset-2 px-2 text-success">Add Product</h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-5 offset-2">
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
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Category"
              name="Category"
              value={menuItemInput.Category}
              onChange={handleMenuItemInput}
            />
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
            <div className="text-center">
              <button
                onClick={() => handleSubmit}
                type="submit"
                style={{ width: "50%" }}
                className="btn btn-success mt-5"
              >
                Submit
              </button>
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

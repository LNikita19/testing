import React from "react";
import SaveButton from "../Buttons/saveButton";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";

const ImageUpload = ({
  selectedImage,
  setImage,
  setToggleSwitch,
  toggleSwitch,
  slideId,
  setActiveSlideId,
}) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange({ target: { files: [file] } });
  };
  const handleCancel = () => {
    setImage(null);
  };
  async function saveAboutData() {
    try {
      const payload = {
        id: slideId,
        Photo: selectedImage,
        Published: toggleSwitch,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${API_BASE_URL}/createaboutData`,
        payload,
        config
      );
      console.log(response?.data?.status);
      if (response?.data?.status) {
        toast.success("Updated Successfully");
      }
      setImage(response.data.data?.Photo);
      setToggleSwitch(response?.data?.data?.Published);
      setActiveSlideId(response?.data?.data?.id);
    } catch (e) {
      console.log("Error:", e);
    }
  }
  const handleSave = () => {
    saveAboutData();
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className="2xl:ml-[32px] lg:ml-[33px] flex flex-col items-center justify-center w-[250px] 2xl:h-[152px] lg:h-[150px] rounded bg-[#C2C2C28F]"
        onDoubleClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/*"
        />
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="uploaded"
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <img src="/Vector.png" alt="upload-icon" className="" />
        )}
        {!selectedImage && (
          <>
            <p className="text-sm text-gray-500 mt-[11px]">
              "Drag & Drop" or <br /> "Double click to upload image"
            </p>
            <p className="flex self-end lg:mt-[4px]  text-xs text-gray-400">
              SVG, PNG, JPG or GIF (max. 5MB)
            </p>
          </>
        )}
      </div>
      {/* <div className=" flex self-end mt-10 mr-2 ">
        <SaveButton onSave={handleSave} onCancel={handleCancel} />
      </div> */}
    </>
  );
};

export default ImageUpload;

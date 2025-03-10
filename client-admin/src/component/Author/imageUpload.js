import React, { useRef } from "react";

const ImageUpload = ({ selectedImage, setImage }) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setImage(objectURL);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange({ target: { files: [file] } });
  };

  return (
    <div
      className="pt-6 ml-[30px] flex flex-col items-center justify-center w-[250px] 2xl:h-[152px] lg:h-[150px] rounded bg-[#C2C2C28F] cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onDoubleClick={() => fileInputRef.current.click()} // Double-click to open file picker
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/*"
      />
      {selectedImage ? (
        <img src={selectedImage} alt="uploaded" className="w-full h-full object-cover rounded" />
      ) : (
        <>
          <img src="/Vector.png" alt="upload-icon" />
          <p className="text-sm text-center text-gray-500 mt-[11px]">"Drag & Drop" or "Double-click to upload"</p>
        </>
      )}
    </div>
  );
};

export default ImageUpload;

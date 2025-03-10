// import React, { useEffect, useState } from "react";
// import SaveButton from "../Buttons/saveButton";
// import axios from "axios";
// import { API_BASE_URL } from "../../config";
// import PublishButton from "../publish/publishButton";
// import { SaveChangesPopup } from "./savePopup";
// import { toast } from "react-toastify";

// const Heading = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [description, setDescription] = useState("");
//   const [heading, setHeading] = useState("");
//   const [smallheading, setSmallHeading] = useState("");

//   const [slideId, setSlideId] = useState(1);
//   const [toggleSwitch, setToggleSwitch] = useState(false);
//   const handleImageChange = (e) => {
//     const file = e.target.files[0] || e.dataTransfer.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleClick = () => {
//     document.getElementById("fileInput").click();
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     handleImageChange({ target: { files: [file] } });
//   };

//   async function saveHomeData() {
//     try {
//       const payload = {
//         id: 1,
//         Heading: heading,
//         Description: description,
//         Photo: selectedImage,
//         Published: toggleSwitch,
//         SmallHeading: smallheading
//       };
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/createData`,
//         payload,
//         config
//       );
//       if (response.data.status) {
//         toast.success("Data created successfully");
//       }
//     } catch (e) {
//       console.log("Error:", e);
//     }
//   }

//   function inputHeadingChange(e) {
//     setHeading(e.target.value);
//   }

//   function inputSmallHeading(e) {
//     setSmallHeading(e.target.value);
//   }
//   function inputDescriptionChange(e) {
//     setDescription(e.target.value);
//   }
//   const getHomeData = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/getData`);
//       setSlideId(response.data.data?.id || 1);
//       setDescription(response.data.data?.Description);
//       setHeading(response.data.data?.Heading);
//       setSmallHeading(response.data.data?.SmallHeading);

//       setSelectedImage(response.data.data?.Photo);
//       setToggleSwitch(response?.data?.data?.Published);
//     } catch (e) {
//       console.log("err", e);
//     }
//   };
//   useEffect(() => {
//     getHomeData();
//   }, []);
//   function onCancel() { }
//   async function handleSwitch(e, activeSlideId) {
//     // e.stopPropagation();
//     try {
//       const config = {
//         method: "PUT",
//         mode: "cors",
//         url: `${API_BASE_URL}/updateData/${1}`,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         data: { Published: toggleSwitch },
//       };
//       await axios(config);
//     } catch (e) {
//       console.log("Error:", e);
//     }
//   }
//   const [togglePop, setTogglePop] = useState(false);
//   const [activeSlideId, setActiveSlideId] = useState(null);
//   const openPopUp = (slideId) => {
//     console.log("trigger open for slide", slideId);
//     setActiveSlideId(slideId);
//     setTogglePop(true);
//     setToggleSwitch(!toggleSwitch);
//   };
//   const closePopUp = () => {
//     setActiveSlideId(null);
//     setTogglePop(false);
//   };
//   const onSaveChanges = async () => {
//     // Close the popup first
//     closePopUp();
//     // Proceed with saving changes
//     if (activeSlideId !== null) {
//       await handleSwitch(activeSlideId);
//     }
//   };
//   return (
//     <>
//       <SaveChangesPopup
//         open={togglePop}
//         onSave={onSaveChanges}
//         onClose={closePopUp}
//       />
//       <div className="2xl:ml-[90px] mt-[5rem] 2xl:w-[900px] h-auto lg:w-[700px] rounded-3xl bg-white shadow-lg border-2px border-[#361A0633] p-8">
//         <h2 className="text-[#361A06] text-2xl font-bold mb-6">Hero Section</h2>
//         <div className="flex flex-col font-['Roboto']">
//           <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Small Heading</label>
//           <input
//             type="text"
//             className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[460px] lg:w-[350px] rounded"
//             value={smallheading}
//             placeholder="Type Heading here...."
//             name="smallHeading"
//             onChange={(e) => inputSmallHeading(e)}
//           />

//           <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Main Heading</label>
//           <input
//             type="text"
//             className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[460px] lg:w-[350px] rounded"
//             value={heading}
//             placeholder="Type Heading here...."
//             name="mainHeading"
//             onChange={(e) => inputHeadingChange(e)}
//           />

//           <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Description</label>
//           <textarea
//             className="ml-[30px] text-[12px] border border-[#0000003B] px-2 py-2 rounded 2xl:w-[460px] lg:w-[360px] h-auto "
//             value={description}
//             placeholder="Type Description ...."
//             name="chapterDescription"
//             onChange={(e) => inputDescriptionChange(e)}
//           ></textarea>
//           <p className="ml-[30px] text-[12px] text-[#1A233899]">100/100 Words Remaining</p>

//           <SaveButton
//             open={togglePop}
//             onSave={onSaveChanges}
//             onClose={closePopUp}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Heading;

















import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";

const Heading = () => {
  const [id, setId] = useState(1);
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");
  const [smallheading, setSmallHeading] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getHomeData();
  }, []);

  const getHomeData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getData`);
      if (response.data.status) {
        const data = response.data.data;
        setId(data?.id || 1);
        setDescription(data?.Description || "");
        setHeading(data?.Heading || "");
        setSmallHeading(data?.SmallHeading || "");
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  const saveHomeData = async () => {
    try {
      const payload = {
        id,
        Heading: heading,
        Description: description,
        SmallHeading: smallheading,
      };

      const url = isEditing
        ? `${API_BASE_URL}/updateData/${id}`
        : `${API_BASE_URL}/createData`;

      const method = isEditing ? "PUT" : "POST";

      const response = await axios({
        method,
        url,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status) {
        toast.success(
          isEditing ? "Data updated successfully" : "Data created successfully"
        );
        setIsEditing(false);
        getHomeData(); // Refresh data in form
      }
    } catch (e) {
      console.error("Error saving data:", e);
    }
  };

  return (
    <>
      <div className="2xl:ml-[90px] mt-[5rem] 2xl:w-[900px] h-auto lg:w-[700px] rounded-3xl bg-white shadow-lg border-2px border-[#361A0633] p-8">
        <h2 className="text-[#361A06] text-2xl font-bold mb-6">Hero Section</h2>
        <div className="flex flex-col font-['Roboto']">
          <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">
            Small Heading
          </label>
          <input
            type="text"
            className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[460px] lg:w-[350px] rounded"
            value={smallheading}
            placeholder="Type Small Heading here..."
            onChange={(e) => setSmallHeading(e.target.value)}
          />

          <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">
            Main Heading
          </label>
          <input
            type="text"
            className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[460px] lg:w-[350px] rounded"
            value={heading}
            placeholder="Type Heading here..."
            onChange={(e) => setHeading(e.target.value)}
          />

          <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">
            Description
          </label>
          <textarea
            className="ml-[30px] text-[12px] border border-[#0000003B] px-2 py-2 rounded 2xl:w-[460px] lg:w-[360px] h-auto"
            value={description}
            placeholder="Type Description..."
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <p className="ml-[30px] text-[12px] text-[#1A233899]">
            100/100 Words Remaining
          </p>

          {/* Buttons */}
          <div className="font-['Roboto'] mb-[32px] ml-[2rem]  2xl:mt-[30px] lg:mt-[13px] space-x-4">
            <Button
              variant="outlined"
              onClick={() => setIsEditing(true)}
              style={{
                borderColor: "#FD8531",
                color: "#4A301C",
                fontSize: "14px",
                fontWeight: "500",
                borderRadius: "4px",
                padding: "6px,16px",
              }}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              onClick={saveHomeData}
              style={{
                backgroundColor: "#FD8531",
                color: "#FFF9E1",
                padding: "6px,16px",
                fontSize: "14px",
                fontWeight: "500",
                borderRadius: "4px",
              }}
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Heading;


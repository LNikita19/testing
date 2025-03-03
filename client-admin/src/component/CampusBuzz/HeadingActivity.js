import React, { useEffect, useState } from "react";
import SaveButton from "../Buttons/saveButton";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from "react-toastify";
import { SaveChangesPopup } from "../Home/savePopup";
import PublishButton from "../publish/publishButton";

const HeadingActivity = () => {
  const [selectedImage, setSelectedImage] = useState({});
  const handleImageChange = (slideId, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        setSelectedImage((prev) => {
          return { ...prev, [slideId]: reader.result };
        });
        setSlidesData((prevSlidesData) =>
          prevSlidesData.map((slide) =>
            slide.id === slideId ? { ...slide, Photo: reader.result } : slide
          )
        );
      };
      reader.onerror = (error) => {
        console.error("Error: ", error);
      };
    }
  };

  const onCancel = () => {};
  const handleClick = (slideId, e) => {
    document.getElementById("fileInput").click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (slideId, e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange(slideId, { target: { files: [file] } });
  };

  const [slidesData, setSlidesData] = useState([
    {
      id: 1,
      Heading: "",
      Description: "",
      Photo: "",
    },
  ]);

  const handleAddRow = () => {
    setSlidesData((prevSlidesData) => [
      ...prevSlidesData,
      {
        id: prevSlidesData.length + 1,
        Description: "",
        Heading: "",
        Photo: "",
      },
    ]);
  };
  const handleDescriptionChange = (slideId, value) => {
    setSlidesData((prevSlidesData) =>
      prevSlidesData.map((slide) =>
        slide.id === slideId ? { ...slide, Description: value } : slide
      )
    );
  };
  const handleHeadingChange = (slideId, value) => {
    setSlidesData((prevSlidesData) =>
      prevSlidesData.map((slide) =>
        slide.id === slideId ? { ...slide, Heading: value } : slide
      )
    );
  };

  const headingActivity = async (slideId) => {
    const slideData = slidesData.find((slide) => slide.id === slideId);
    try {
      const config = {
        method: "POST",
        mode: "cors",
        url: `${API_BASE_URL}/createactivityData`,
        headers: {
          "Content-Type": "application/json",
        },
        data: slideData,
      };
      const response = await axios(config);
      if (response?.data?.status) {
        toast.success("Data created successfully");
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };
  const getHeadingActivity = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getactivityData`);
      const fetchedData = response.data.data;
      const initialSwitchState = {};
      fetchedData.forEach((slide) => {
        initialSwitchState[slide.id] = slide.Published;
      });
      setSlidesData(response?.data?.data);
      if (response?.data?.data) {
        const images = response.data.data.reduce((prev, slide) => {
          return { ...prev, [slide.id]: slide.Photo };
        }, {});

        setSelectedImage(images);
      }
      setToggleSwitch(initialSwitchState);
      if (response?.data?.data.length === 0) {
        setSlidesData([
          {
            id: 1,
            Heading: "",
            Description: "",
            Photo: "",
          },
        ]);
      }
    } catch (e) {
      console.log("err", e);
    }
  };
  useEffect(() => {
    getHeadingActivity();
  }, []);

  const [togglePop, setTogglePop] = useState(false);
  const [activeSlideId, setActiveSlideId] = useState(null);
  const [toggleSwitch, setToggleSwitch] = React.useState({});
  // Open popup and set active slide
  const openPopUp = (slideId) => {
    setActiveSlideId(slideId); // Set the slide ID that is being edited
    setTogglePop(true);
  };

  // Reset active slide and close popup
  const closePopUp = () => {
    setActiveSlideId(null); // Reset the active slide ID
    setTogglePop(false);
  };

  // Handle the actual switch action when "Save" is clicked
  const onSaveChanges = async () => {
    // Close the popup first
    closePopUp();
    // Proceed with saving changes
    if (activeSlideId !== null) {
      await handleSwitch(activeSlideId);
    }
  };
  const handleSwitch = async (slideId) => {
    //e.stopPropagation();
    const slideData = slidesData.find((slide) => slide.id === slideId);
    const isPublished = !toggleSwitch[slideId];
    setToggleSwitch((prev) => ({
      ...prev,
      [slideId]: isPublished,
    }));
    try {
      const config = {
        method: "PUT",
        mode: "cors",
        url: `${API_BASE_URL}/updateActivityData/${slideId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { id: slideId, Published: isPublished },
      };
      const response = await axios(config);
      if (response?.data?.status) {
        toast.success("updated successfully");
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };
  return (
    <>
      {slidesData.length > 0 &&
        slidesData.map((slide) => (
          <div
            className="lg:ml-[40px] 2xl:w-[970px] 2xl:ml-[90px] lg:w-[800px] my-2 rounded-3xl"
            key={slide.id}
          >
            <SaveChangesPopup
              open={togglePop}
              onSave={onSaveChanges}
              onClose={closePopUp}
            />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${slide.id}a-content`}
                id={`panel${slide.id}a-header`}
              >
                <Typography className="text-opacity-60 text-[#1A2338]">{`${slide.id} News & Events`}</Typography>
                <span className="publish-button-wrapper">
                  <PublishButton
                    isPublished={toggleSwitch[slide.id]}
                    openPopUp={() => openPopUp(slide.id)}
                    slideId={slide.id}
                    className="flex justify-self-end"
                  />
                </span>
              </AccordionSummary>
              <AccordionDetails className="flex flex-col">
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <div className="flex flex-col font-['Roboto'] mt-10 ">
                      <label className="ml-[30px] text-opacity-60 text-sm font-semibold text-[#1A233899]">
                        Heading
                      </label>
                      <input
                        type="text"
                        className="mt-[10px] ml-[30px]   border border-1 border-[#0000003B] px-4 py-2 2xl:w-[460px] 2xl:h-[56px] lg:w-[350px] lg:h-[40px]  rounded"
                        value={slide.Heading}
                        onChange={(e) =>
                          handleHeadingChange(slide.id, e.target.value)
                        }
                        placeholder="Type heading here ....."
                        name="Heading"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col 2xl:ml-[10px] font-['Roboto']">
                    <h1 className="2xl:ml-[32px] lg:ml-[32px] pt-[26px] text-opacity-60 text-sm font-semibold text-[#1A233899]">
                      Photo
                    </h1>
                    <br />
                    <div
                      className="2xl:ml-[32px] lg:ml-[33px] flex flex-col items-center justify-center 2xl:w-[378px] lg:w-[250px] 2xl:h-[152px] lg:h-[150px] rounded bg-[#C2C2C28F]"
                      onDoubleClick={handleClick}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(slide.id, e)}
                    >
                      <label
                        htmlFor={`fileInput-${slide.id}`}
                        className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                      >
                        <input
                          type="file"
                          id={`fileInput-${slide.id}`}
                          style={{ display: "none" }}
                          onChange={(e) => handleImageChange(slide.id, e)}
                          accept="image/*"
                        />

                        {selectedImage[slide.id] ? (
                          <img
                            src={selectedImage[slide.id]}
                            alt="uploaded"
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <img
                            src="/Vector.png"
                            alt="upload-icon"
                            className=""
                          />
                        )}
                        {(!slide.Photo || !selectedImage[slide.id]) && (
                          <>
                            <p className="text-[12px] text-[#999999] mt-[11px]">
                              "Drag & Drop" or <br /> "Click to upload image"
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <label className=" ml-[30px]   text-opacity-60 text-sm font-semibold text-[#1A233899]">
                      Description
                    </label>
                    <textarea
                      className=" ml-[30px] border border-1 border-[#0000003B] px-4 py-2 rounded 2xl:text-sm lg:text-base font-semibold text-[#1A233899] 2xl:w-[460px] lg:w-[360px] 2xl:h-[180px] lg:h-[130px]"
                      placeholder="Type Description ...."
                      name="chapterDescription"
                      value={slide.Description}
                      onChange={(e) =>
                        handleDescriptionChange(slide.id, e.target.value)
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="flex self-end">
                  <SaveButton
                    onSave={() => headingActivity(slide.id)}
                    onCancel={onCancel}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      <button
        className="text-[#1A2338] font-['Roboto'] 2xl:ml-[860px] 2xl:mt-[8px] lg:ml-[600px]  w-[134px] h-[50px]  border-2 border-gray-500 rounded-lg mt-[4px]"
        onClick={handleAddRow}
      >
        ADD ROW +
      </button>
    </>
  );
};

export default HeadingActivity;

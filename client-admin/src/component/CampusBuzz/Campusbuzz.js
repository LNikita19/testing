import React, { useEffect, useState } from "react";

import SaveButton from "../Buttons/saveButton";
import { MdOutlineUploadFile } from "react-icons/md";
import HeadingActivity from "./HeadingActivity";
import { toast } from "react-toastify";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import PublishButton from "../publish/publishButton";
import { SaveChangesPopup } from "../Home/savePopup";

const Campusbuzz = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const [selectedImage, setSelectedImage] = useState({});
  const handleImageChange = (slideId, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        console.log(reader.result);
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
      Month: months[0],
      Year: currentYear,
      Heading: "",
      Description: "",
      Photo: "",
      Pdf: "",
    },
  ]);

  const handleAddRow = () => {
    setSlidesData((prevSlidesData) => [
      ...prevSlidesData,
      {
        id: prevSlidesData.length + 1,
        Year: currentYear,
        Month: months[0],
        Description: "",
        Heading: "",
        Photo: "",
        Pdf: "",
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
  const handleMonthChange = (slideId, value) => {
    setSlidesData((prevSlidesData) =>
      prevSlidesData.map((slide) =>
        slide.id === slideId ? { ...slide, Month: value } : slide
      )
    );
  };
  const handleYearChange = (slideId, value) => {
    setSlidesData((prevSlidesData) =>
      prevSlidesData.map((slide) =>
        slide.id === slideId ? { ...slide, Year: value } : slide
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

  const handlePdfUpload = (slideId, value) => {
    setSlidesData((prevSlidesData) =>
      prevSlidesData.map((slide) =>
        slide.id === slideId ? { ...slide, Pdf: value } : slide
      )
    );
  };
  const pdfData = async (slideId) => {
    const slideData = slidesData.find((slide) => slide.id === slideId);
    try {
      const config = {
        method: "POST",
        mode: "cors",
        url: `${API_BASE_URL}/pdfData`,
        headers: {
          "Content-Type": "application/json",
        },
        data: slideData,
      };
      const response = await axios(config);
      if (response?.data?.status) {
        toast.success("saved successfully");
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };
  const [toggleSwitch, setToggleSwitch] = React.useState({});
  const getPdfData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getpdfData`);
      const fetchedData = response.data.data;
      const initialSwitchState = {};
      fetchedData.forEach((slide) => {
        console.log();
        initialSwitchState[slide.id] = slide.Published;
      });
      setSlidesData(response.data.data);
      if (response?.data?.data) {
        const images = response.data.data.reduce((prev, slide) => {
          return { ...prev, [slide.id]: slide.Photo };
        }, {});

        setSelectedImage(images);
      }
      console.log(response?.data?.data);
      setToggleSwitch(initialSwitchState);
      if (response?.data?.data.length === 0) {
        setSlidesData([
          {
            id: 1,
            Month: months[0],
            Year: currentYear,
            Heading: "",
            Description: "",
            Photo: "",
            Pdf: "",
          },
        ]);
      }
    } catch (e) {
      console.log("err", e);
    }
  };
  useEffect(() => {
    getPdfData();
  }, []);
  const handleSwitch = async (slideId) => {
    //e.stopPropagation();
    const slideData = slidesData.find((slide) => slide.id === slideId);
    const isPublished = !toggleSwitch[slideId];
    console.log("is", isPublished);
    setToggleSwitch((prev) => ({
      ...prev,
      [slideId]: isPublished,
    }));
    try {
      const config = {
        method: "PUT",
        mode: "cors",
        url: `${API_BASE_URL}/updatepdfData/${slideId}`,
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
  const [togglePop, setTogglePop] = useState(false);
  const [activeSlideId, setActiveSlideId] = useState(null);

  // Open popup and set active slide
  const openPopUp = (slideId) => {
    console.log("trigger open for slide", slideId);
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
  return (
    <>
      <div className="bg-[#F1F5F9] bg-cover w-screen min-h-screen">
        <div className="flex flex-row font-['Roboto']">
          <div className="flex flex-col">
            <h1
              className="lg:ml-[40px] lg:mt-[24px] 2xl:ml-[90px] 2xl:mt-[48px] font-['Roboto'] font-semibold lg:text-2xl 2xl:text-4xl text-[#1A2338]"
              style={{ lineHeight: "78px" }}
            >
              Our Activities
            </h1>
            <p className="font-bold lg:text-lg 2xl:text-xl text-sm 2xl:ml-[90px] lg:ml-[40px] text-[#1A2338B2] ">
              News & Events
            </p>
          </div>
        </div>
        <div>
          <HeadingActivity />
        </div>
        <div>
          <p className="font-['Roboto'] 2xl:ml-[90px] lg:ml-[40px]  text-2xl font-semibold text-[#1A2338B2]">
            Newsletters Page
          </p>
        </div>
        <SaveChangesPopup
          open={togglePop}
          onSave={onSaveChanges}
          onClose={closePopUp}
        />
        {slidesData.length > 0 &&
          slidesData.map((slide) => (
            <div
              className="lg:ml-[40px] 2xl:w-[970px] 2xl:ml-[90px] lg:w-[800px] my-2 rounded-3xl"
              key={slide.id}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${slide.id}a-content`}
                  id={`panel${slide.id}a-header`}
                >
                  <Typography className="text-opacity-60 text-[#1A2338]">{`${slide.id} News letter Page`}</Typography>
                  <span className="publish-button-wrapper">
                    <PublishButton
                      isPublished={toggleSwitch[slide.id]}
                      openPopUp={() => openPopUp(slide.id)}
                      slideId={slide.id}
                      className="flex justify-self-end"
                    />
                  </span>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex flex-row">
                    <div className="flex flex-col">
                      <div className="flex space-x-4 mb-6 2xl:pt-[15px] lg:pt-[10px] lg:ml-[27px]">
                        <div className="flex flex-col w-[111px] h-[40px]">
                          <label className="mb-2  text-opacity-60 text-sm font-semibold text-[#1A2338]">
                            Month
                          </label>
                          <select
                            value={slide.Month}
                            onChange={(e) =>
                              handleMonthChange(slide.id, e.target.value)
                            }
                            className="px-4 py-2 border rounded"
                          >
                            {months.map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col w-[111px] h-[40px]">
                          <label className="mb-2  text-opacity-60 text-sm font-semibold text-[#1A2338]">
                            Year
                          </label>
                          <select
                            value={slide.Year}
                            onChange={(e) =>
                              handleYearChange(slide.id, e.target.value)
                            }
                            className="px-4 py-2 border rounded"
                          >
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col font-['Roboto']">
                        <label className="ml-[30px] mt-[27px] text-opacity-60 text-sm font-semibold text-[#1A233899]">
                          Heading
                        </label>
                        <input
                          type="text"
                          className="text-base font-normal mt-[4px] ml-[30px]  border border-1 border-[#0000003B] px-4 py-2 2xl:w-[460px] 2xl:h-[56px] lg:w-[350px] lg:h-[40px]  rounded"
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
                      <h1 className="2xl:ml-[32px] lg:ml-[32px] pt-[26px] text-opacity-60 text-sm font-semibold  text-[#1A233899]">
                        Photo
                      </h1>
                      <br />
                      <div
                        className="2xl:ml-[32px] lg:ml-[33px] flex flex-col items-center justify-center 2xl:w-[378px] lg:w-[250px] 2xl:h-[152px] lg:h-[150px] rounded bg-[#C2C2C28F]"
                        //onDoubleClick={handleClick}
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
                            // style={{ display: "none" }}
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
                      <label className=" ml-[30px] mt-[27px] text-opacity-60 text-sm font-semibold text-[#1A233899]">
                        Description
                      </label>
                      <textarea
                        className="mt-2 ml-[30px] border border-1 border-[#0000003B] px-4 py-2 rounded text-base font-normal text-[#1A233899] 2xl:w-[460px] lg:w-[360px] 2xl:h-[180px] lg:h-[130px]"
                        placeholder="Type Description ...."
                        name="chapterDescription"
                        value={slide.Description}
                        onChange={(e) =>
                          handleDescriptionChange(slide.id, e.target.value)
                        }
                      ></textarea>
                    </div>
                    <div className="flex flex-col ">
                      <label
                        htmlFor={`pdf-${slide.id}`}
                        className=" ml-[30px] mt-[27px] text-opacity-60 text-sm font-semibold text-[#1A233899]"
                      >
                        UploadPDF
                        <div className="mt-2 border-dotted border-2 border-[#0000001f] px-4 py-2 rounded 2xl:text-sm lg:text-base font-semibold text-[#1A233899] 2xl:w-[390px] lg:w-[360px] 2xl:h-[152px] lg:h-[130px] flex flex-col justify-center items-center">
                          <MdOutlineUploadFile
                            style={{ color: "#2196F3", fontSize: "3rem" }}
                          />
                          <p className="text-sky-500 text-base font-normal mt-[11px]">
                            <span className="font-normal text-sm text-[#2196F3]">
                              click to upload
                            </span>
                          </p>
                          <input
                            id={`pdf-${slide.id}`}
                            type="file"
                            // className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = async () => {
                                  handlePdfUpload(slide.id, reader.result);
                                };
                                reader.onerror = (error) => {
                                  console.error("Error: ", error);
                                };
                              }
                            }}
                          />
                        </div>
                      </label>
                      <div className="flex self-end">
                        <SaveButton
                          onSave={() => pdfData(slide.id)}
                          onCancel={onCancel}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        <button
          className="font-['Roboto'] 2xl:ml-[860px] 2xl:mt-[8px] lg:ml-[600px]  w-[134px] h-[50px]  border-2 border-gray-500 rounded-lg mt-[4px]"
          onClick={handleAddRow}
        >
          ADD ROW +
        </button>
      </div>
    </>
  );
};

export default Campusbuzz;

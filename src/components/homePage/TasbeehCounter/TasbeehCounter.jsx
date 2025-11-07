import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import image1 from "./TasbeehCounterImages/1.png"
import image2 from "./TasbeehCounterImages/2.png"
import image3 from "./TasbeehCounterImages/3.png"
import image4 from "./TasbeehCounterImages/4.png"
import image5 from "./TasbeehCounterImages/5.png"
import image6 from "./TasbeehCounterImages/6.png"

import { IoSettingsSharp } from "react-icons/io5";

import initialPhrasesData from "./TasbeehCounterData/TasbeehCounterData"

import { ToastContainer, toast } from 'react-toastify';
import TasbeehCounterHeader from "./TasbeehCounterComponent/TasbeehCounterHeader";
import DisplayAllAzkarNew from "./TasbeehCounterComponent/DisplayAllAzkarNew";
import DisplayAllAzkarOld from "./TasbeehCounterComponent/DisplayAllAzkarOld";
import AddTextAzkar from "./TasbeehCounterComponent/AddTextAzkar";
import ChooseTypePageComp from "./TasbeehCounterComponent/ChooseTypePageComp";

const TasbeehCounter = () => {

  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const textareaRef = useRef(null);
  const zakrRef = useRef(null);

  // ---------------------------------------------------------------------------------
  // Create an array of images
  const images = [image1, image2, image3, image4, image5, image6];

  // -----------------------------------
  const initialPhrases = initialPhrasesData

  // --------------------------------------------------
  const [phrases, setPhrases] = useState(initialPhrases);
  const [addTextZakr, setAddTextZakr] = useState(false);
  const [textZakr, setTextZakr] = useState("");
  const [counters, setCounters] = useState(Array(initialPhrases.length).fill(0));
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedForDeletion, setSelectedForDeletion] = useState([]);

  // --------------------------------------------------
  // ------- open overlay 
  const [openPage, setOpenPage] = useState(false)

  // --------------------------------------------------
  // ------- open overlay 
  const [chooseTypePage, setChooseTypePage] = useState(false)
  const [openSidebarColor, setOpenSidebarColor] = useState(false)
  // --------------------------------------------------

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (zakrRef.current && !zakrRef.current.contains(event.target)) {
        setAddTextZakr(false);
      }
    };

    if (addTextZakr) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addTextZakr]);

  // --------------------------------------------------
  const addNewZakr = () => {
    if (textZakr.trim() !== "") {
      // Check if the textZakr already exists in the phrases array
      if (!phrases.includes(textZakr)) {
        setPhrases([...phrases, textZakr]); // Add new phrase
        setCounters([...counters, 0]); // Add new counter entry
        setTextZakr(""); // Clear the textarea
        setAddTextZakr(false); // Close the modal
      } else {
        setOpenPage(true)
        toast.info("الذكر موجود بالفعل", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            setOpenPage(false);
            setIsDeleteMode(false)
            setSelectedForDeletion(false)
          },
        });
      }
    }
  };

  // --------------------------------------------------
  const incrementCounter = (index) => {
    setCounters((prev) => {
      const newCounters = [...prev];
      newCounters[index] += 1;
      return newCounters;
    });
  };

  // --------------------------------------------------
  const resetCounter = (index) => {
    setCounters((prev) => {
      const newCounters = [...prev];
      newCounters[index] = 0;
      return newCounters;
    });
  };

  // --------------------------------------------------
  const resetAllCounters = () => {
    setCounters(Array(phrases.length).fill(0));
  };

  // --------------------------------------------------
  const toggleCheckbox = (index) => {
    if (index < initialPhrases.length) {
      toast.error("هذه الأذكار أساسية ولا يمكن حذفها", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          setOpenPage(false);
          setIsDeleteMode(false)
          setSelectedForDeletion(false)
        },
      });


      return; // Do nothing if it's a main azkar
    }

    // Allow deletion only for newly added zakr
    setSelectedForDeletion((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index); // Deselect if already selected
      } else {
        return [...prev, index]; // Select if not selected
      }
    });
  };

  // --------------------------------------------------
  const deleteZkrMsg = () => {
    toast.success("  تم الحذف بنجــــاح  ", {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => {
        setOpenPage(false);
        setIsDeleteMode(false)
        setSelectedForDeletion(false)
      },
    });
  }

  // --------------------------------------------------
  const deleteZakr = () => {
    // Only delete new zakr that are added (not the ones in the initialPhrases)
    setPhrases((prev) => prev.filter((_, i) => !selectedForDeletion.includes(i) || i < initialPhrases.length));
    setCounters((prev) => prev.filter((_, i) => !selectedForDeletion.includes(i) || i < initialPhrases.length)); // Remove counters for deleted zakrs
    setIsDeleteMode(false); // Exit delete mode
    setSelectedForDeletion([]); // Clear selected zakr indices
  };

  // --------------------------------------------------
  const toggleDeleteMode = () => {
    setIsDeleteMode((prev) => !prev); // Toggle delete mode
    setSelectedForDeletion([]); // Reset selected zakr(s)
  };


  return (
    <div className={`w-full flex justify-center items-center relative pb-3 ${darkMode ? `bg-black` : ` bg-white`}`}>

      <div className="w-full container flex justify-center items-center">

        <div className="w-full flex flex-wrap justify-center items-center">

          {/* Header  &&  Buttons Setting */}
          <TasbeehCounterHeader
            darkMode={darkMode}
            onClickAddTextZakr={() => setAddTextZakr(true)}
            onClickResetAllCounters={() => resetAllCounters()}
            onClickToggleDeleteMode={() => toggleDeleteMode()}
            isDeleteMode={isDeleteMode}
          />

          {/* Display all azkar */}
          {
            chooseTypePage ?
              <DisplayAllAzkarOld
                phrases={phrases}
                darkMode={darkMode}
                counters={counters}
                isDeleteMode={isDeleteMode}
                selectedForDeletion={selectedForDeletion}
                incrementCounter={incrementCounter}
                resetCounter={resetCounter}
                toggleCheckbox={toggleCheckbox}
                setOpenPage={setOpenPage}
              />
              :
              <DisplayAllAzkarNew
                phrases={phrases}
                darkMode={darkMode}
                counters={counters}
                isDeleteMode={isDeleteMode}
                selectedForDeletion={selectedForDeletion}
                incrementCounter={incrementCounter}
                resetCounter={resetCounter}
                toggleCheckbox={toggleCheckbox}
                images={images}
                setOpenPage={setOpenPage}
              />
          }
        </div>

        {/* If delete mode is active, show delete button */}
        {/* Add Azkar Modal */}

        <AddTextAzkar
          addTextZakr={addTextZakr}
          zakrRef={zakrRef}
          textareaRef={textareaRef}
          textZakr={textZakr}
          isDeleteMode={isDeleteMode}
          selectedForDeletion={selectedForDeletion}
          deleteZakr={deleteZakr}
          deleteZkrMsg={deleteZkrMsg}
          addNewZakr={addNewZakr}
          setAddTextZakr={setAddTextZakr}
          setTextZakr={setTextZakr}
        />

      </div>

      <ChooseTypePageComp
        setOpenSidebarColor={setOpenSidebarColor}
        openSidebarColor={openSidebarColor}
        darkMode={darkMode}
        setChooseTypePage={setChooseTypePage}
        chooseTypePage={chooseTypePage}
        Icon={IoSettingsSharp}
      />

      {/* Overlay  */}
      <div className={` left-0 top-0 h-screen w-screen bg-black opacity-70 z-20 ${openPage ? "fixed" : "hidden"}`}>  </div>

      {/* Toast Container to hold the toast notifications */}
      <ToastContainer className={`fixed top-1/2 -translate-y-1/2 h-fit text-xl`} />

    </div>
  );
};

export default TasbeehCounter;
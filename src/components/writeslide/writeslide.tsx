import React, { useState, ChangeEvent } from "react";
import { Box, TextField, styled } from "@mui/material";
import TopMenu from "../topmenu/topmenu";
import BottomMenu from "../bottommenu/bottommenu";
import CoverPage from "../coverpage/coverpage";
import { Slide } from "../../types/types";
import ExitPopup from "../exitmodal/exitpopup";
import { useNavigate } from "react-router-dom";

interface CoverPageState {
  title: string;
  author: string;
  imagePosition: "top" | "right";
}

interface WriteTabProps {
  onExit: () => void;
}

const CanvasContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "imagePosition",
})<{ imagePosition: Slide["imagePosition"] }>(({ imagePosition }) => ({
  backgroundColor: "white",
  borderRadius: "7px",
  width: "800px",
  height: "500px",
  display: "flex",
  flexDirection: imagePosition === "top" ? "column" : "row",
  boxShadow: "0 13px 20px rgba(0, 0, 0, 0.5)",
  overflow: "hidden",
  margin: "20px auto",
  transform: "scale(0.7)",
  transformOrigin: "left top",
  padding: "0",
  border: "0",
  fontSize: "100%",
  verticalAlign: "baseline",
  marginBottom: "-110px",
}));

const ImagePlaceholder = styled(Box, {
  shouldForwardProp: (prop) => prop !== "imagePosition",
})<{ imagePosition: Slide["imagePosition"] }>(({ imagePosition }) => ({
  backgroundColor: "#f4f4f4",
  width: imagePosition === "top" ? "100%" : "46%",
  height: imagePosition === "top" ? "50%" : "100%",
  backgroundSize: "cover",
  order: imagePosition === "right" ? 2 : 0,
}));

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "imagePosition",
})<{ imagePosition: Slide["imagePosition"] }>(({ imagePosition }) => ({
  flexGrow: 1,
  margin: "2%",
  width: imagePosition === "top" ? "98%" : "30%",
  height: imagePosition === "top" ? "40%" : "100%",
  "& .MuiInputBase-root": {
    height: "100%",
    borderRadius: "4px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  "& .MuiInputBase-inputMultiline": {
    height: "100%",
    width: "100%",
    fontSize: "1.5rem",
    lineHeight: "1.286",
    boxShadow: "none",
    overflow: "hidden",
  },
  "& .MuiOutlinedInput-root": {
    width: "98%",
    height: "94%",
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "1px dashed black",
    },
  },
}));

const WriteTab: React.FC<WriteTabProps> = ({ onExit }) => {
  const username = localStorage.getItem("username") || "";
  const [slides, setSlides] = useState<Slide[]>([
    { text: "", imagePosition: "left", thumbnail: "" },
  ]);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [coverPage, setCoverPage] = useState<CoverPageState>({
    title: "",
    author: username,
    imagePosition: "right",
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [exitPopupOpen, setExitPopupOpen] = useState(false);
  const navigate = useNavigate();

  const addNewSlide = () => {
    const positions: Slide["imagePosition"][] = ["left", "right", "top"];
    const lastPosition =
      slides.length > 0 ? slides[slides.length - 1].imagePosition : "left";
    const nextIndex = (positions.indexOf(lastPosition) + 1) % positions.length;
    const nextPosition = positions[nextIndex];
    const newSlide = { text: "", imagePosition: nextPosition, thumbnail: "" };
    setSlides([...slides, newSlide]);
    setSelectedSlideIndex(slides.length);
    setHasUnsavedChanges(true);
  };

  const handleTextChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newText = event.target.value.slice(0, 280);
    const textFieldElement = event.target;
    const maxHeight = 400;
    const lines = newText.split("\n");
    const lineHeight = parseInt(
      window.getComputedStyle(textFieldElement).lineHeight || "0",
      10
    );
    const height = lines.length * lineHeight;

    if (height <= maxHeight && newText.length <= 250) {
      const updatedSlides = slides.map((slide, i) =>
        i === index
          ? { ...slide, text: newText, thumbnail: newText.slice(0, 50) + "..." }
          : slide
      );
      setSlides(updatedSlides);
      setHasUnsavedChanges(true);
    }
  };

  const onReorderSlides = (startIndex: number, endIndex: number) => {
    const newSlides = [...slides];
    const [removed] = newSlides.splice(startIndex, 1);
    newSlides.splice(endIndex, 0, removed);
    setSlides(newSlides);
    setSelectedSlideIndex(endIndex);
    setHasUnsavedChanges(true);
  };

  const handleDeleteSlide = (index: number) => {
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    if (newSlides.length === 0) {
      setSelectedSlideIndex(0);
    } else {
      setSelectedSlideIndex(
        Math.max(0, Math.min(selectedSlideIndex, newSlides.length - 1))
      );
    }
    setHasUnsavedChanges(true);
  };

  const handleCoverTitleChange = (text: string) => {
    setCoverPage((prev) => ({ ...prev, title: text }));
    setHasUnsavedChanges(true);
  };

  const handleCoverAuthorChange = (text: string) => {
    setCoverPage((prev) => ({ ...prev, author: text }));
    setHasUnsavedChanges(true);
  };

  const handleCoverImagePositionChange = (position: "top" | "right") => {
    setCoverPage((prev) => ({ ...prev, imagePosition: position }));
    setHasUnsavedChanges(true);
  };

  const handleFontChange = (font: string) => {
    document.body.style.fontFamily = font;
  };

  const handleSave = async () => {
    setHasUnsavedChanges(false);
    try {
      const response = await fetch("http://localhost:8080/api/drafts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...coverPage,
          slides,
          userId: localStorage.getItem("userId"),
        }),
      });

      if (!response.ok) {
        console.error("Failed to save the draft");
      }
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  const handleOpenExitPopup = () => {
    setExitPopupOpen(true);
  };

  const handleCloseExitPopup = () => {
    setExitPopupOpen(false);
  };

  const handleConfirmExit = async () => {
    await handleSave();
    setExitPopupOpen(false);
    onExit();
  };

  const handleExit = () => {
    if (hasUnsavedChanges) {
      setExitPopupOpen(true);
    } else {
      navigate("/action-page/write");
    }
  };

  const selectedSlide =
    selectedSlideIndex === 0 ? coverPage : slides[selectedSlideIndex - 1];

  return (
    <div
      style={{
        overflow: "hidden",
        height: "100vh",
        margin: "auto",
        marginLeft: "20px",
        marginRight: "20px",
        marginBottom: "-110px",
        marginTop: "4rem",
      }}
    >
      <TopMenu
        onSave={handleSave}
        onExit={handleExit}
        onFontChange={handleFontChange}
        hasUnsavedChanges={hasUnsavedChanges}
        onOpenExitPopup={handleOpenExitPopup}
        exitLabel={hasUnsavedChanges ? "Save & Exit" : "Exit"}
      />
      <div
        style={{
          overflowY: "auto",
          marginTop: "4rem",
          height: "calc(100vh - 100px)",
        }}
      >
        {selectedSlideIndex === 0 ? (
          <CoverPage
            title={coverPage.title}
            author={coverPage.author}
            imagePosition={coverPage.imagePosition}
            onTitleChange={handleCoverTitleChange}
            onAuthorChange={handleCoverAuthorChange}
          />
        ) : (
          selectedSlide &&
          "imagePosition" in selectedSlide && (
            <CanvasContainer imagePosition={selectedSlide.imagePosition}>
              <ImagePlaceholder imagePosition={selectedSlide.imagePosition} />
              {"text" in selectedSlide && (
                <StyledTextField
                  fullWidth
                  multiline
                  value={selectedSlide.text}
                  onChange={(e) => handleTextChange(selectedSlideIndex - 1, e)}
                  imagePosition={selectedSlide.imagePosition}
                  inputProps={{
                    maxLength: 280,
                    style: {
                      height: "100%",
                      maxHeight: "380px",
                      overflow: "hidden",
                    },
                  }}
                />
              )}
            </CanvasContainer>
          )
        )}
      </div>
      <BottomMenu
        onAddSlide={addNewSlide}
        slides={[
          {
            text: coverPage.title,
            imagePosition: coverPage.imagePosition,
            thumbnail: "",
          },
          ...slides,
        ]}
        selectedSlideIndex={selectedSlideIndex}
        onSelectSlide={setSelectedSlideIndex}
        onReorderSlides={(startIndex, endIndex) => {
          onReorderSlides(startIndex - 1, endIndex - 1);
        }}
        onDeleteSlide={(index) => handleDeleteSlide(index - 1)}
        onCoverTemplateChange={handleCoverImagePositionChange}
        coverImagePosition={coverPage.imagePosition}
      />
      <ExitPopup
        open={exitPopupOpen}
        handleClose={handleCloseExitPopup}
        handleConfirm={handleConfirmExit}
      />
    </div>
  );
};

export default WriteTab;

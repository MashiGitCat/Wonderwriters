import React, { useRef, useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, MultiBackendOptions } from "react-dnd-multi-backend";
import { Button, Paper, styled, Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Slide } from "../../types/types";
import "./bottommenu.css";
import ClosePopup from "../closemodal/closepopup";

interface BottomMenuProps {
  onAddSlide: () => void;
  slides: Slide[];
  selectedSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onReorderSlides: (startIndex: number, endIndex: number) => void;
  onDeleteSlide: (index: number) => void;
  onCoverTemplateChange: (position: "top" | "right") => void;
  coverImagePosition: "top" | "right";
}

const MenuBar = styled(Paper)({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  padding: "10px",
  background: "#f0f0f0",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#f4f4f4",
    borderRadius: "1px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#fff",
  },
});

const ThumbContainer = styled("ul")({
  display: "flex",
  alignItems: "center",
  padding: 0,
  margin: 0,
  listStyleType: "none",
  position: "relative",
});

const Thumb = styled("li")<{
  slide: Slide;
  isSelected: boolean;
}>(({ slide, isSelected }) => ({
  cursor: "pointer",
  backgroundColor: "#fff",
  width: "100px",
  height: "60px",
  overflow: "hidden",
  boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.25)",
  borderRadius: "3px",
  fontFamily: "Times New Roman",
  fontSize: "1.34px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "10px",
  flexDirection: slide.imagePosition === "top" ? "column" : "row",
  "&:last-child": {
    marginRight: "0",
  },
  position: "relative", // Needed for the indicator
}));

const SelectedIndicator = styled("li")({
  display: "block",
  width: "100px",
  height: "6px",
  backgroundColor: "#1655f2",
  position: "absolute",
  top: "-10px",
  transition: "left .2s ease-in-out",
});

const StyledImageContainer = styled("div")<{ slide: Slide }>(({ slide }) => ({
  width: slide.imagePosition === "top" ? "100%" : "50%",
  height: slide.imagePosition === "top" ? "50%" : "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(${slide.backgroundImage})`,
  backgroundColor: "#f4f4f4",
}));

const StyledTextContainer = styled("div")<{ slide: Slide }>(({ slide }) => ({
  width: slide.imagePosition === "top" ? "100%" : "50%",
  height: slide.imagePosition === "top" ? "60%" : "100%",
  order:
    slide.imagePosition === "top" ? 1 : slide.imagePosition === "left" ? 1 : 0,
  outline: "none",
  fontSize: "125%",
  verticalAlign: "middle",
  wordBreak: "break-word",
  overflow: "auto", // Allow scrolling if content overflows
  padding: "3%", // Add padding for better readability
}));

const PageNumber = styled("div")({
  fontSize: "12px",
  color: "#000",
  textAlign: "center",
  marginTop: "4px",
});

const AddNewSlideButton = styled("li")({
  width: "100px",
  height: "60px",
  border: "1px dashed #000",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#fff",
  marginRight: "10px",
  cursor: "pointer",
  "&::before": {
    content: '"+"',
    fontSize: "24px",
    color: "#000",
  },
});

const CloseButton = styled("div")({
  position: "absolute",
  top: "5px",
  right: "5px",
  background: "white",
  color: "white",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 1001,
});

const DraggableThumb: React.FC<{
  slide: Slide;
  index: number;
  isSelected: boolean;
  isEditing: boolean;
  moveThumb: (dragIndex: number, hoverIndex: number) => void;
  onSelectSlide: (index: number) => void;
  onDeleteClick: (index: number) => void;
}> = ({
  slide,
  index,
  isSelected,
  isEditing,
  moveThumb,
  onSelectSlide,
  onDeleteClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: "THUMB",
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveThumb(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "THUMB",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: isDragging ? 1 : 1,
        transform: isDragging ? "scale(1.1)" : "none",
        boxShadow: isDragging ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
        cursor: "move",
        position: "relative",
      }}
    >
      <Thumb
        slide={slide}
        isSelected={isSelected}
        onClick={() => onSelectSlide(index)}
      >
        {isEditing && index !== 0 && (
          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(index);
            }}
          >
            <CancelIcon style={{ color: "red" }} />
          </CloseButton>
        )}
        <StyledImageContainer
          slide={slide}
          style={{ order: slide.imagePosition === "left" ? 0 : 1 }}
        />
        <StyledTextContainer slide={slide}>
          <div
            style={{
              outline: "none",
              fontSize: "125%",
              display: "table-cell",
              verticalAlign: "middle",
              wordBreak: "break-word",
            }}
          >
            {slide.text}
          </div>
        </StyledTextContainer>
      </Thumb>
      <PageNumber>{index === 0 ? "Cover Page" : index}</PageNumber>
    </div>
  );
};

const BottomMenu: React.FC<BottomMenuProps> = ({
  onAddSlide,
  slides,
  selectedSlideIndex,
  onSelectSlide,
  onReorderSlides,
  onDeleteSlide,
  onCoverTemplateChange,
  coverImagePosition,
}) => {
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState<number | null>(null);

  const moveThumb = (dragIndex: number, hoverIndex: number) => {
    const newSlides = [...slides];
    const [draggedSlide] = newSlides.splice(dragIndex, 1);
    newSlides.splice(hoverIndex, 0, draggedSlide);
    onReorderSlides(dragIndex, hoverIndex);
  };

  useEffect(() => {
    setIndicatorPosition(selectedSlideIndex * 110);
  }, [selectedSlideIndex]);

  const handleSelectSlide = (index: number) => {
    onSelectSlide(index);
    setIndicatorPosition(index * 110);
  };

  const handleOpenDeleteDialog = (index: number) => {
    setSlideToDelete(index);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSlideToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (slideToDelete !== null) {
      onDeleteSlide(slideToDelete); // Call onDeleteSlide prop
    }
    handleClosePopup();
  };

  const backendOptions: MultiBackendOptions = {
    backends: [
      {
        backend: HTML5Backend,
        id: "html5",
      },
      {
        backend: TouchBackend,
        options: { enableMouseEvents: true },
        id: "touch",
      },
    ],
  };

  return (
    <DndProvider backend={MultiBackend} options={backendOptions}>
      <MenuBar>
        <Box display="flex" flexDirection="column" alignItems="center" mr={2}>
          <Button
            onClick={() => onCoverTemplateChange("right")}
            disabled={coverImagePosition === "right"}
            className="edit-page"
            style={{
              borderRadius: "14px",
              backgroundColor:
                coverImagePosition === "right" ? "#FD641F" : "#FDBD29", // Change color on click
              color: "white",
              zIndex: 1000,
              fontSize: "8px",
              padding: "6px 14px",
              marginBottom: "10px",
              width: "80px",
            }}
          >
            Classic
          </Button>
          <Button
            onClick={() => onCoverTemplateChange("top")}
            disabled={coverImagePosition === "top"}
            className="edit-page"
            style={{
              borderRadius: "14px",
              backgroundColor:
                coverImagePosition === "top" ? "#FD641F" : "#FDBD29",
              color: "white",
              zIndex: 1000,
              fontSize: "8px",
              padding: "6px 14px",
              width: "80px",
            }}
          >
            Landscape
          </Button>
        </Box>
        <ThumbContainer>
          <SelectedIndicator style={{ left: `${indicatorPosition}px` }} />
          {slides.map((slide, index) => (
            <DraggableThumb
              key={index}
              index={index}
              slide={slide}
              isSelected={index === selectedSlideIndex}
              isEditing={isEditing}
              moveThumb={moveThumb}
              onSelectSlide={handleSelectSlide}
              onDeleteClick={handleOpenDeleteDialog}
            />
          ))}
          <AddNewSlideButton onClick={onAddSlide} />
        </ThumbContainer>
        <Button
          className="edit-page"
          style={{
            position: "fixed",
            right: "-8px",
            bottom: "94px",
            borderRadius: "14px",
            backgroundColor: "rgba(77, 78, 83, 0.9)",
            color: "white",
            zIndex: 1000,
            fontSize: "13px",
            padding: "6px 14px",
            border: "1px solid #ffffff52",
          }}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Done" : "Edit"}
        </Button>
        <ClosePopup
          open={openPopup}
          handleClose={handleClosePopup}
          handleConfirm={handleConfirmDelete} 
        />
      </MenuBar>
    </DndProvider>
  );
};

export default BottomMenu;

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import "./carousel.css";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface Image {
  label: string;
  imgPath: string;
}

interface Props {
  images?: Image[];  
}
const defaultImages: Image[] = [
  {
    imgPath:
      "https://res.cloudinary.com/maheshidevelopments/image/upload/c_fill,w_500,h_375,ar_4:3/v1714624337/Adventure.jpg",
    label: "Stories are Your Imaginations...",
  },
  {
    imgPath:
      "https://res.cloudinary.com/maheshidevelopments/image/upload/c_crop,w_500,h_375,ar_4:3/v1714624764/illustrations_for_Apple_Today_Tab.jpg",
    label: "...Bring Out Your Ideas With Words & Pictures",
  },
  {
    imgPath:
      "https://res.cloudinary.com/maheshidevelopments/image/upload/c_crop,w_500,h_375,ar_4:3/v1714624890/notions_and_potions.jpg",
    label:
      "A Community of Aspiring Storytellers with Wonderful Picture Books...",
  },
  {
    imgPath:
      "https://res.cloudinary.com/maheshidevelopments/image/upload/c_crop,w_500,h_375,ar_4:3/v1714625299/%E5%91%86%E5%A6%B9%E5%90%83%E8%A5%BF%E7%93%9C.jpg",
    label: "...Read Unique Stories From New Artists ",
  },
  {
    imgPath:
      "https://res.cloudinary.com/maheshidevelopments/image/upload/c_crop,w_500,h_375,ar_4:3/v1714630189/download_4.jpg",
    label: "Publish Your Wonderful Imaginations with Wonder Writers ",
  },
];

const SwipeableTextMobileStepper: React.FC<Props> = ({ images = defaultImages }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1, position: "relative" }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={setActiveStep}
        enableMouseEvents
        style={{ position: "relative" }}
      >
        {images.map((step, index) => (
          <Box
            key={index}
            sx={{ position: "relative", width: "100%", height: "auto" }}
          >
            <img
              src={step.imgPath}
              alt={step.label}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: "rgba(0,0,0,0.4)", // Semi-transparent overlay
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <h2 className="carousel__inside-text">
                  {step.label || "Default label if empty"}
                </h2>

                <div className="carousel__inside-text-underline"></div>
              </div>
            </Box>
          </Box>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "transparent",
          ".MuiMobileStepper-dotActive": { backgroundColor: "white" },
        }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
};

export default SwipeableTextMobileStepper;

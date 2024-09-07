import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import "./carousel.css";

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
      "https://res.cloudinary.com/maheshidevelopments/image/upload/v1719967141/DALL_E_2024-07-02_17.38.39_-_A_whimsical_and_playful_illustration_featuring_a_line_of_charming_characters_holding_hands_similar_to_the_uploaded_image._The_characters_include_a_ra.webp",
    label: "Stories are Your Imaginations...",
  },
  {
    imgPath:
      "https://res.cloudinary.com/maheshidevelopments/image/upload/v1719969031/DALL_E_2024-07-02_18.10.18_-_A_whimsical_and_artistic_illustration_featuring_a_pair_of_hands_holding_an_open_book_with_a_girl_standing_on_a_ladder_inside_the_book_drawing_flower.webp",
    label: "...Bring Out Your Ideas With Words & Pictures",
  },
  {
    imgPath:
      "https://res.cloudinary.com/maheshidevelopments/image/upload/v1719968430/DALL_E_2024-07-02_18.00.19_-_A_whimsical_and_playful_illustration_featuring_two_girls_sitting_on_a_tree_branch_reading_books_with_their_hair_braids_intertwined._The_scene_should.webp",
    label:
      "A Community of Aspiring Storytellers with Wonderful Picture Books...",
  },
  {
    imgPath:
      "https://res.cloudinary.com/maheshidevelopments/image/upload/v1719968829/DALL_E_2024-07-02_18.06.55_-_A_whimsical_and_magical_illustration_featuring_a_child_and_a_small_duck_standing_between_two_shelves_filled_with_glowing_stars_similar_to_the_uploade.webp",
    label: "...Read Unique Stories From New Artists ",
  },
  {
    imgPath:
      "https://res.cloudinary.com/maheshidevelopments/image/upload/v1719962409/carsol-item-collaboration.webp",
    label: "Publish Your Wonderful Imaginations with Wonder Writers ",
  },
];

const SwipeableTextMobileStepper: React.FC<Props> = ({
  images = defaultImages,
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevActiveStep) =>
        prevActiveStep === maxSteps - 1 ? 0 : prevActiveStep + 1
      );
    }, 6000);

    return () => {
      clearInterval(timer);
    };
  }, [maxSteps]);

  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1, position: "relative" }}>
      <Box
        sx={{
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            height: "auto",
            maxWidth: "100%",
            display: "block",
            overflow: "hidden",
            width: "100%",
          }}
          src={images[activeStep].imgPath}
          alt={images[activeStep].label}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <h2 className="carousel__inside-text">
              {images[activeStep].label || "Default label if empty"}
            </h2>
            <div className="carousel__inside-text-underline"></div>
          </div>
        </Box>
      </Box>
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

import React, { useRef, useEffect } from "react";
import { Box, TextField, styled, Tooltip, tooltipClasses } from "@mui/material";
import { Slide } from "../../types/types";

interface SlideCardProps {
  slide: Slide;
  isSelected: boolean;
  onTextChange: (text: string) => void;
  imagePosition: "top" | "right" | "left";
  editable?: boolean;
}

const StyledTextField = styled(TextField)<{
  imagePosition: "top" | "right" | "left";
}>(({ imagePosition }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "0",
    overflow: "hidden",
    width: imagePosition === "top" ? "42rem" : "100%",
  },
  "& .MuiOutlinedInput-root": {
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
  "& .MuiInputBase-inputMultiline": {
    height: "100%",
    overflow: "hidden",
  },
}));

const AuthorTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#1655f2",
    color: "white",
    fontSize: "1em",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#1655f2",
  },
}));

const SlideCard: React.FC<SlideCardProps> = ({
  slide,
  isSelected,
  onTextChange,
  imagePosition,
  editable = true,
}) => {
  const textFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textFieldElement = textFieldRef.current;
    if (textFieldElement) {
      const maxHeight = textFieldElement.clientHeight;
      const textareaElement = textFieldElement.querySelector("textarea");
      if (textareaElement) {
        textareaElement.style.maxHeight = `${maxHeight}px`;
        textareaElement.style.overflow = "hidden";
      }
    }
  }, []);

  return (
    <Box
      id="slide-content"
      sx={{
        backgroundColor: "white",
        borderRadius: "7px",
        width: "700px",
        height: "438px",
        margin: "auto",
        overflow: "hidden",
        boxShadow: "0 13px 20px rgba(0, 0, 0, 0.5)",
        marginLeft: "20px",
        marginRight: "20px",
        transform: "scale(0.7)",
        transformOrigin: "left top",
        marginBottom: "-110px",
        position: "relative",
      }}
    >
      <Box
        id="slide-layout"
        className={`slide-style-${imagePosition === "right" ? "0" : "1"}`}
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: imagePosition === "top" ? "column" : "row",
        }}
      >
        {imagePosition === "top" ? (
          <>
            <Box
              id="slide-image"
              sx={{
                width: "100%",
                height: "250px",
                backgroundColor: "#f4f4f4",
                position: "relative",
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "calc(100% - 250px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              {editable ? (
                <StyledTextField
                  id="slide-text"
                  value={slide.text}
                  onChange={(e) => onTextChange(e.target.value)}
                  multiline
                  rows={5}
                  variant="outlined"
                  placeholder="Add a text"
                  fullWidth
                  inputProps={{
                    style: {
                      fontWeight: "bolder",
                      fontSize: "200%",
                      overflow: "hidden",
                      lineHeight: "125%",
                      paddingTop: "2rem",
                    },
                  }}
                  sx={{
                    wordBreak: "break-word",
                    paddingRight: 0,
                    height: "10rem",
                  }}
                  ref={textFieldRef}
                  imagePosition={imagePosition}
                />
              ) : (
                <Box
                  id="slide-text"
                  sx={{
                    fontWeight: "bolder",
                    fontSize: "200%",
                    lineHeight: "125%",
                    paddingTop: "2rem",
                    wordBreak: "break-word",
                    height: "10rem",
                  }}
                >
                  {slide.text}
                </Box>
              )}
              {editable && (
                <AuthorTooltip
                  title="Please do not enter your real name!"
                  arrow
                >
                  <StyledTextField
                    value={`By: ${slide.author}`}
                    variant="outlined"
                    placeholder="Author:"
                    fullWidth
                    inputProps={{
                      style: {
                        fontSize: "150%",
                      },
                    }}
                    sx={{
                      margin: "1%",
                      height: "10%",
                      bottom: 0,
                    }}
                    imagePosition={imagePosition}
                  />
                </AuthorTooltip>
              )}
            </Box>
          </>
        ) : (
          <>
            <Box
              id="slide-image"
              sx={{
                width: "65%",
                height: "100%",
                backgroundColor: "#f4f4f4",
                position: "relative",
                order: imagePosition === "right" ? 2 : 0,
              }}
            />
            <Box
              sx={{
                width: "35%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "0.1rem",
              }}
            >
              {editable ? (
                <StyledTextField
                  id="slide-text"
                  value={slide.text}
                  onChange={(e) => onTextChange(e.target.value)}
                  multiline
                  rows={10}
                  variant="outlined"
                  placeholder="Add a text"
                  fullWidth
                  inputProps={{
                    style: {
                      fontWeight: "bolder",
                      fontSize: "250%",
                      overflow: "hidden",
                      lineHeight: "125%",
                    },
                  }}
                  sx={{
                    wordBreak: "break-word",
                    paddingRight: 0,
                    height: "325px",
                  }}
                  ref={textFieldRef}
                  imagePosition={imagePosition}
                />
              ) : (
                <Box
                  id="slide-text"
                  sx={{
                    fontWeight: "bolder",
                    fontSize: "250%",
                    lineHeight: "125%",
                    wordBreak: "break-word",
                    height: "325px",
                  }}
                >
                  {slide.text}
                </Box>
              )}
              {editable && (
                <AuthorTooltip
                  title="Please do not enter your real name!"
                  arrow
                >
                  <StyledTextField
                    value={`By: ${slide.author}`}
                    variant="outlined"
                    placeholder="Author:"
                    fullWidth
                    inputProps={{
                      style: {
                        fontSize: "150%",
                      },
                    }}
                    sx={{
                      margin: "1%",
                      height: "15%",
                      bottom: 0,
                    }}
                    imagePosition={imagePosition}
                  />
                </AuthorTooltip>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SlideCard;

import React from "react";
import CoverPage from "../../components/coverpage/coverpage";

interface CoverPageWrapperProps {
  title: string;
  author: string;
  imagePosition: "top" | "right" | "left";
}

const CoverPageWrapper: React.FC<CoverPageWrapperProps> = ({
  title,
  author,
  imagePosition,
}) => {
  return (
    <div style={{ transform: "scale(0.5)", transformOrigin: "top left" }}>
      <CoverPage
        title={title}
        author={author}
        imagePosition={imagePosition}
        onTitleChange={() => {}}
        onAuthorChange={() => {}}
        editable={false}
      />
    </div>
  );
};

export default CoverPageWrapper;

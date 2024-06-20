import React, { useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
import CoverPageWrapper from "../../components/coverpagewrapper/coverwrapper";
import { Slide } from "../../types/types";

const DraftsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  width: "100%",
  padding: "0",
  marginTop: "1rem",
}));

const DraftBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "10rem",
  margin: "0",
  padding: "0",
  "@media (min-width: 600px)": {
    width: "calc(50% - 1rem)",
  },
  "@media (min-width: 900px)": {
    width: "calc(33.33% - 1rem)",
  },
  "@media (min-width: 1200px)": {
    width: "calc(25% - 1rem)",
  },
}));

interface Draft {
  _id: string;
  title: string;
  author: string;
  imagePosition: "top" | "right";
  slides: Slide[];
}

const Drafts: React.FC = () => {
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/drafts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDrafts(data);
        } else {
          console.error("Failed to fetch drafts");
        }
      } catch (error) {
        console.error("Error fetching drafts:", error);
      }
    };

    fetchDrafts();
  }, []);

  return (
    <DraftsContainer>
      {drafts.map((draft) => (
        <DraftBox key={draft._id}>
          <CoverPageWrapper
            title={draft.title}
            author={draft.author}
            imagePosition={draft.imagePosition}
          />
        </DraftBox>
      ))}
    </DraftsContainer>
  );
};

export default Drafts;

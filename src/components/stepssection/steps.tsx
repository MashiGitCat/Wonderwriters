import React from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import "./steps.css";

interface CardProps {
  title: string;
  imageUrl: string;
  description: string;
}

const ActionAreaCard: React.FC<CardProps> = ({
  title,
  imageUrl,
  description,
}) => {
  return (
    <Card
      className="steps__card"
      sx={{ maxWidth: 345, borderRadius: "0.8rem" }}
    >
      <CardActionArea
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <h2 className="steps__card-content">{title}</h2>
        <CardMedia
          className="steps__card-image"
          component="img"
          height="12rem"
          image={imageUrl}
          alt={title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <p className="steps__card-paragraph">{description}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Steps = () => {
  const cards: CardProps[] = [
    {
      title: "ILLUSTRATE",
      imageUrl:
        "https://res.cloudinary.com/maheshidevelopments/image/upload/v1714599102/shigureni_free_illust_%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E4%BC%9A%E8%AD%B0%E3%81%AB%E5%85%A5%E3%81%A3%E3%81%9F%E3%82%89%E8%87%AA%E5%88%86%E4%BB%A5%E5%A4%96%E3%83%93%E3%83%87%E3%82%AA%E3%82%AA%E3%83%95%E3%81%A0%E3%81%A3%E3%81%9F%E6%99%82%E3%81%AE%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88.jpg",
      description: "Illustrate your Wonder Ideas with pictures.",
    },
    {
      title: "WRITE",
      imageUrl:
        "https://res.cloudinary.com/maheshidevelopments/image/upload/v1714611414/write_3.jpg",
      description: "Write your Wonder Stories with awesome words.",
    },
    {
      title: "ILLUSTRATE & WRITE",
      imageUrl:
        "https://res.cloudinary.com/maheshidevelopments/image/upload/v1714611183/shigureni_free_illust-2_%E7%B4%A0%E6%9C%B4%E3%81%A7%E3%81%8B%E3%82%8F%E3%81%84%E3%81%84%E5%A5%B3%E3%81%AE%E5%AD%90%E3%81%AE%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E7%B4%A0%E6%9D%90%E3%82%B5%E3%82%A4%E3%83%88.jpg",
      description:
        "Knit a Wonderful Story by combining your fantastic illustrations and words",
    },
    {
      title: "COLLABORATE",
      imageUrl:
        "https://res.cloudinary.com/maheshidevelopments/image/upload/v1714613048/collaboration.jpg",
      description:
        "Collaborate with the best writer to knit a story for your illustrations or join with the best illustrator to draw perfect pictures for your story.",
    },
    {
      title: "PUBLISH",
      imageUrl:
        "https://res.cloudinary.com/maheshidevelopments/image/upload/v1714606453/Ye.jpg",
      description:
        "Publish your Imaginations brought out with wonderful words and illustrations and that's how you become a Wonder Writer!",
    },
  ];

  return (
    <section className="steps">
      <h2 className="steps__heading">How to Become a Wonder-Writer</h2>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="steps__grid-container"
        >
          {cards.map((card, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={card.title}
              className="steps__grid-item"
            >
              <ActionAreaCard
                title={card.title}
                imageUrl={card.imageUrl}
                description={card.description}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  );
};

export default Steps;

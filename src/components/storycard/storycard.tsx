import React from 'react';
import { Card, CardMedia, CardContent, Typography} from '@mui/material';

interface StoryCardProps {
  text: string;
  imageUrl: string;
  imagePosition: 'left' | 'right' | 'top';
}

const StoryCard: React.FC<StoryCardProps> = ({ text, imageUrl, imagePosition }) => {
  const imageComponent = (
    <CardMedia
      component="img"
      image={imageUrl}
      alt="Story Image"
      style={{ width: imagePosition === 'top' ? '100%' : 200, height: imagePosition === 'top' ? 200 : '100%' }}
    />
  );

  return (
    <Card raised sx={{ display: 'flex', flexDirection: imagePosition === 'top' ? 'column' : 'row', minHeight: 300, margin: 2 }}>
      {imagePosition !== 'right' && imageComponent}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body1">{text}</Typography>
      </CardContent>
      {imagePosition === 'right' && imageComponent}
    </Card>
  );
};

export default StoryCard;

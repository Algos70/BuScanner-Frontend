import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import './RatingStar.css';

interface RatingProps {
    rating: number;
    }

function BasicRating(props: RatingProps) {

  return (
    <Box
    >
      <Rating name="read-only" value={Number(props.rating) % 6} readOnly size='small' />

    </Box>
  );
}


export default BasicRating;
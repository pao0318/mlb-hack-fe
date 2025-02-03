import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const handleViewDetails = () => {
    navigate(`/game/${game.game_id}`);
  };

  return (
    <Card style={{ margin: '10px', padding: '10px' }}>
      <CardContent>
        <Typography variant="body1">
          <strong>{game.home_name} vs {game.away_name}</strong>
        </Typography>
        <Typography variant="body2">
          <strong>Date:</strong> {game.game_date}
        </Typography>
        <Typography variant="body2">
          <strong>Venue:</strong> {game.venue_name}
        </Typography>
        <Typography variant="body2">
          <strong>Winning Team:</strong> {game.winning_team}
        </Typography>
        <Typography variant="body2">
          <strong>Score:</strong> {game.away_name} ({game.away_score}) @ {game.home_name} ({game.home_score})
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          style={{ marginTop: '10px' }} 
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameCard;

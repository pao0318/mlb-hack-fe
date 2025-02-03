import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UpcomingGameCard = ({ game }) => {
  const navigate = useNavigate();
  const handleViewDetails = () => {
    navigate(`/roster/${game.game_id}`, {
      state: { homeTeamId: game.home_id, 
        awayTeamId: game.away_id
      },
    });
  };

  return (
    <Card style={{ margin: '10px', padding: '10px' }}>
      <CardContent>
        <Typography variant="body1">
          <strong>{game.home_name} vs {game.away_name}</strong>
        </Typography>
        <Typography variant="body2">
        <strong>Date:</strong> {new Date(game.game_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, 2025
        </Typography>
        <Typography variant="body2">
          <strong>Venue:</strong> {game.venue_name}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '10px' }}
          onClick={handleViewDetails}
        >
          View Rosters
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingGameCard;

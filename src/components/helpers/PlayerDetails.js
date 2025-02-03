import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PlayerDetails = ({ player }) => {
  return (
    <Card style={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h6">{player.name}</Typography>
        <Typography variant="body2">
          <strong>Player ID:</strong> {player.player_id}
        </Typography>
        <Typography variant="body2">
          <strong>Jersey Number:</strong> {player.jerseyNumber || 'N/A'}
        </Typography>
        <Typography variant="body2">
          <strong>Position:</strong> {player.position || 'Unknown'}
        </Typography>
        <Typography variant="body2">
          <strong>Team ID:</strong> {player.teamId}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlayerDetails;

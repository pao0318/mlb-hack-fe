import { CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GameCard from './helpers/GameCard'; // Import the child component

const PreviousMatchesTab = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend
    fetch('https://mlb-hack-backend.onrender.com/previousGames', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ year: 2024 }),
    })
      .then((response) => response.json())
      .then((data) => {
        setGames(data.games);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching games:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Previous Matches
      </Typography>
      {games.length === 0 ? (
        <Typography>No matches available.</Typography>
      ) : (
        <Grid container spacing={2}>
          {games.map((game) => (
            <Grid item xs={12} md={6} lg={4} key={game.game_id}>
              <GameCard game={game} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default PreviousMatchesTab;

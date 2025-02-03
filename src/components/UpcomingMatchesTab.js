import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Typography, CircularProgress, Alert } from '@mui/material';

import UpcomingGameCard from './helpers/UpcomingGameCard';

const UpcomingMatchesTab = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/upcomingGames', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setGames(data.result || []); // Use 'result' from API response
    } catch (err) {
      setError(err.message || 'Failed to fetch game details.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Upcoming Matches
      </Typography>

      {/* Show loading indicator */}
      {loading && <CircularProgress />}

      {/* Show error message */}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <Grid container spacing={2}>
          {games.map((game) => (
            <Grid item xs={12} md={6} lg={4} key={game.game_id}>
              <UpcomingGameCard game={game} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default UpcomingMatchesTab;

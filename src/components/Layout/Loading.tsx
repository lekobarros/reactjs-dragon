// Components
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading () {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '12rem' }}>
      <CircularProgress />
    </Box>
  )
}
// Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Icons
import EggIcon from '@mui/icons-material/Egg';

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="primary"
        elevation={0}
        sx={{
          position: 'relative'
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EggIcon /> <span>Dragons</span>
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Page  */}
      <Container sx={{ margin: '1rem auto' }} >
        <Outlet />
      </Container>
    </>
  )
}
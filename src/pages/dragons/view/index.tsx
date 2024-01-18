
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Dragon } from '@/types/Dragon';
import getDragonById from '@/actions/getDragonById';

// Components
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import isAuth from "@/components/isAuth";

const Dragon = () => {
  const router = useNavigate()
  const params = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [dragon, setDragon] = useState<Dragon>({} as Dragon)

  // Call API
  useEffect(() => {
    if (!params.id) router('/dragons');

    getDragonById(params.id as string)
      .then((res) => {
        setDragon(res as Dragon)
        setLoading(false)
      })
      .catch((error) => {
        console.log("[getDragonById] error => ", error);
        router('/dragons')
      })
  }, [])

  // Actions
  const convertToHumanDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' } as Intl.DateTimeFormatOptions;
    const humanDate = dateObject.toLocaleString('en-US', options);
    
    return humanDate;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '12rem' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} underline="hover" color="inherit" to="/">Home</Link>
          <Link component={RouterLink} underline="hover" color="inherit" to="/dragons">Dragons</Link>
          <Typography color="text.light">View</Typography>
          <Typography color="text.primary">Dragon: {dragon.name}</Typography>
        </Breadcrumbs>
      </Box>

      {/* Card with information about dragon */}
      <Card variant="outlined" sx={{ marginTop: 3 }}>
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="h4" component="div">Dragon Profile</Typography>
          <Typography gutterBottom variant="h5" component="div">
            {dragon.name ?? 'N/D'}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {dragon.histories ?? 'N/D'}
          </Typography>
        </Box>
        <Divider light />
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="body2">Element
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip color="primary" label={dragon.type} size="small" />
          </Stack>
        </Box>
        <Divider light />
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="body2">Created on { dragon.createdAt ? convertToHumanDate(dragon.createdAt) : 'N/D' }</Typography>
        </Box>
      </Card>
    </>
  )
};

// eslint-disable-next-line react-refresh/only-export-components
export default isAuth(Dragon);
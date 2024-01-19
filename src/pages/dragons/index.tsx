import { useEffect, useState } from 'react';
import { useAppDispatch } from "@/redux/hooks";

// Actions
import getDragons from '@/actions/getDragons'
import clearDragons from '@/actions/clearDragons'

// Components
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LayoutLoading from '@/components/Layout/Loading';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import DataGridDragons from '@/components/DataGridDragons';
import ModalDeleteDragon from '@/components/ModalDragonDelete';
import Typography from '@mui/material/Typography';
import isAuth from "@/components/isAuth";

// Icons
import AddIcon from '@mui/icons-material/Add';

// Types
import type { Dragon } from '@/types/Dragon';

const Dragon = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState<boolean>(true)
  const [open, setOpen] = useState(false);

  // Call API
  useEffect(() => {
    // Get Dragons
    dispatch(getDragons()) // Every reload page call again API to refresh data
    setLoading(false)

    return () => dispatch(clearDragons());
  }, []);

  // Render
  if (isLoading) return <LayoutLoading />

  return <>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} underline="hover" color="inherit" to="/">Home</Link>
        <Link component={RouterLink} underline="hover" color="inherit" to="/dragons">Dragons</Link>
      </Breadcrumbs>
    </Box>

    <Stack direction="column" spacing={2} sx={{ marginTop: 2 }}>
      {/* Heading */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} sx={{ marginTop: 4 }}>
        <Box>
          <Typography variant="h4" component="div">Manager Dragons</Typography>
        </Box>
        <Stack justifyContent="flex-end">
          <RouterLink to="/dragons/manager/create">
            <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />}>Create</Button>
          </RouterLink>
        </Stack>
      </Stack>

      {/* DataGrid */}
      <DataGridDragons setOpen={bool => setOpen(bool as boolean)} />
    </Stack>

    {/* Modal Delete */}
    <ModalDeleteDragon isVisible={open} onShow={() => setOpen(false)} />
  </>
}

// eslint-disable-next-line react-refresh/only-export-components
export default isAuth(Dragon)
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setDragonDeleteId } from '@/redux/features/dragonsSlice';

// Actions
import getDragons from '@/actions/getDragons'

// Components
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LayoutLoading from '@/components/Layout/Loading';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import ModalDeleteDragon from '@/components/ModalDragonDelete';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import isAuth from "@/components/isAuth";

// Icons
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility';

// Types
import type { Dragon } from '@/types/dragon';

const Dragon = () => {
  const dragons = useAppSelector(state => state.dragonsReducer.list);
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState<boolean>(true)
  const [open, setOpen] = useState(false);

  // Call API
  useEffect(() => {
    // Get Dragons
    if (dragons && !dragons.length) dispatch(getDragons())
    setLoading(false)
  }, []);

  // Custom Table
  const renderDetailsButton = (params: GridRenderCellParams) => {
    const { id } = params.row

    return (
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="contained" color="error" size="small" onClick={() => {
          dispatch(setDragonDeleteId(id))
          setOpen(true)
        }}>
          <DeleteIcon />
        </Button>
        <RouterLink to={`/dragons/manager/${id}`} >
          <Button variant="contained" color="primary" size="small"><EditIcon /></Button>
        </RouterLink>
        <RouterLink to={`/dragons/view/${id}`} >
          <Button variant="contained" size="small" ><VisibilityIcon /></Button>
        </RouterLink>
      </Stack>
    )
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      sortingOrder: ['asc', 'desc'],
    },
    {
      field: 'type',
      headerName: 'Element',
      width: 150,
    },
    {
      field: 'histories',
      headerName: 'History',
      flex: 1,
      minWidth: 350,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 250,
      renderCell: renderDetailsButton
    },
  ];

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
      <DataGrid
        rows={dragons}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: 'name', sort: 'asc' }],
          },
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
        }}
        pageSizeOptions={[15, 30]}
      />
    </Stack>

    {/* Modal Delete */}
    <ModalDeleteDragon isVisible={open} onShow={() => setOpen(false)} />
  </>
}

// eslint-disable-next-line react-refresh/only-export-components
export default isAuth(Dragon)
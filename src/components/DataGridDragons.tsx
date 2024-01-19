import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setDragonDeleteId } from '@/redux/features/dragonsSlice';

// Components
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility';

const DataGridDragon = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const dragons = useAppSelector(state => state.dragonsReducer.list);
  const dispatch = useAppDispatch();

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

  return (
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
  )
}
export default DataGridDragon
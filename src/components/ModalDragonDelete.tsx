import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks"; // use in store

// Components
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Icons
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Actions
import deleteDragons from '@/actions/deleteDragons'

// Types
import type { Dragon } from "@/types/Dragon";

type Props = {
  isVisible: boolean,
  onShow: any
}

const ModalDeleteDragon: FC<Props> = ({ isVisible, onShow }) => {
  const dragonId = useAppSelector(state => state.dragonsReducer.dragonDeleteId) as string;
  const dragons = useAppSelector(state => state.dragonsReducer.list);
  const dispatch = useAppDispatch();
  const [isDispatched, setDispatched] = useState<boolean>(false)

  // Actions
  // Prevents the modal from closing when the modal request is in progress
  const onClose = () => {
    if (!isDispatched) onShow(false)
  };

  const onDeleteDragon = async () => { 
    setDispatched(true)

    try {
      await dispatch(deleteDragons(dragonId))
      onShow(false)
    }
    catch (err) {
      console.log(err)
    } finally {
      setDispatched(false)
    }
  }

  const findDragon = (id: string) : Dragon => {
    return dragons.find(dragon => dragon.id === id) as Dragon
  }

  return (
    <Modal
      open={isVisible}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClose={onClose}
    >
      <Paper sx={{ maxWidth: 650, p: 2, m: 2 }}>
        <Stack direction="column" spacing={2} >
          <Stack direction="column" spacing={1} >
            <Typography id="modal-modal-title" variant="h6" component="h2">Do you want to delete the Dragon?</Typography>
            <Typography id="modal-modal-description">You selected action to delete the <b>{ dragonId ? findDragon(dragonId)?.name : 'N/D' }</b> from list. Do you want to continue this action?</Typography>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button disabled={isDispatched} onClick={onClose}>Close</Button>
            <LoadingButton color="error" loading={isDispatched} endIcon={<DeleteOutlineIcon />} loadingPosition="end" onClick={onDeleteDragon}>
              Delete
            </LoadingButton>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  )
}

export default ModalDeleteDragon;
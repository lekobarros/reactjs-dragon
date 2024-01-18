
'use client';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// Actions
import getDragonById from '@/actions/getDragonById';
import createDragon from '@/actions/createDragon';
import updateDragonById from '@/actions/updateDragonById';

// Components
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import LayoutLoading from '@/components/Layout/Loading';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import { FormInputText } from '@/components/FormInputText';
import Typography from '@mui/material/Typography';
import isAuth from "@/components/isAuth";

// Icons
import SaveIcon from '@mui/icons-material/Save';

// Types
import type { Dragon } from '@/types/dragon';

interface IFormInput {
  name: string,
  histories: string,
  type: string,
}

const schema = yup
  .object({
    name: yup.string().required('Field is required'),
    histories: yup.string().required('Field is required'),
    type: yup.string().required('Field is required'),
  })
  .required()

const Dragon = () => {
  const router = useNavigate()
  const params = useParams()
  const { control, handleSubmit, setValue } = useForm<IFormInput>({ resolver: yupResolver(schema) })
  const [loading, setLoading] = useState<boolean>(true)
  const [isDispatched, setIsDispached] = useState<boolean>(false)
  const [dragon, setDragon] = useState<Dragon>({} as Dragon)
  const [toCreate, setToCreate] = useState<boolean>(false)

  // Call API
  useEffect(() => {
    if (!params.id) router('/dragons');
    else if (params.id == 'create') {
      setToCreate(true)
      setLoading(false)
      return
    }

    getDragonById(params.id as string)
      .then((res) => {
        const { name, histories, type } = res as Dragon

        // Set Values and Form
        setDragon(res as Dragon)
        setValue('name', name as string)
        setValue('histories', histories as string)
        setValue('type', type as string)
        setLoading(false)
      })
      .catch((error) => {
        console.log("[getDragonById] error => ", error);
        router('/dragons')
      })
  }, [])

  // Actions
  const onSubmit = handleSubmit(async (data) => {
    setIsDispached(true)

    try {
      if (toCreate) await createDragon(data as Dragon)
      else {
        const dragon = { ...data, id: params.id } as Dragon
        await updateDragonById(dragon)
      }

      return router('/dragons');
    } catch (error) {
      console.log("[updateDragonById] error => ", error);
    } finally {
      setIsDispached(false)
    }
  })

  // Render
  if (loading) return <LayoutLoading />

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} underline="hover" color="inherit" to="/">Home</Link>
          <Link component={RouterLink} underline="hover" color="inherit" to="/dragons">Dragons</Link>
          <Typography color="text.light">Manager</Typography>
          <Typography color="text.primary">{!toCreate ? `Dragon: ${dragon.name}` : 'Create'}</Typography>
        </Breadcrumbs>
      </Box>

      {/* Card with information about dragon */}
      <Card variant="outlined" sx={{ marginTop: 3 }}>
        <Box component="form" onSubmit={onSubmit} sx={{ p: 2 }} autoComplete="off" >
          <Stack direction="column" spacing={2}>
            <Typography gutterBottom variant="h4" component="div">Dragon Manager</Typography>

            <Stack direction="column" spacing={2}>
              <FormInputText name="name" control={control} label="Name" />
              <FormInputText name="histories" control={control} label="History" />
              <FormInputText name="type" control={control} label="Type" />
            </Stack>

            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <RouterLink to="/dragons">
                <Button color="error" variant="outlined" size="medium" disabled={isDispatched}>Back</Button>
              </RouterLink>

              <LoadingButton color="primary" variant="contained" size="medium" type="submit" loading={isDispatched} endIcon={<SaveIcon />} loadingPosition="end">
                {!toCreate ? 'Update' : 'Create'}
              </LoadingButton>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </>
  )
};

// eslint-disable-next-line react-refresh/only-export-components
export default isAuth(Dragon);
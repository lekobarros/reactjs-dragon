import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// Actions
import getUser from '@/actions/getUser'

// Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FormInputText } from '@/components/FormInputText';
import LoadingButton from '@mui/lab/LoadingButton';
import isAuth from "@/components/isAuth";

interface IFormInput {
  username: string,
  password: string,
}

const schema = yup
  .object({
    username: yup.string().required('Field is required'),
    password: yup.string().required('Field is required'),
  })
  .required()

const Login = () => {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.auth.authUser)
  const dispatch = useAppDispatch()
  const { control, handleSubmit } = useForm<IFormInput>({ resolver: yupResolver(schema) })
  const [formError, setFormError] = useState<boolean | string>(false)
  const [isDispatched, setIsDispached] = useState<boolean>(false)

  // Actions
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsDispached(true)

      await new Promise((resolve) => setTimeout(resolve, 600)); // Mock Delay
      await dispatch(getUser(data))

      navigate('/dragons')
    } catch (err) {
      setFormError(err as string);
    } finally {
      setIsDispached(false)
    }
  })

  return (
    <>
      {user?.username}
      <Box component="form" onSubmit={onSubmit} sx={{
        maxWidth: '500px',
        margin: '4rem auto auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
      }} autoComplete="off" >

        <Stack direction="column" spacing={2}>
          <Typography gutterBottom variant="h4" component="div">Login</Typography>

          {/* Form Fields */}
          <FormInputText name="username" control={control} label="Name" />
          <FormInputText name="password" control={control} label="Password" />

          {formError && <Typography variant="body2" component="div" sx={{ color: 'red', textAlign: 'center' }}>{formError}</Typography>}

          {/* Buttons */}
          <LoadingButton color="primary" variant="contained" size="medium" type="submit" loading={isDispatched}>
            Login
          </LoadingButton>
        </Stack>
      </Box>
    </>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default isAuth(Login);
import React, {useCallback,useState,useEffect,useContext,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import {Box} from '@material-ui/core';

import Button from '@mui/material/Button';
import {FormProvider, useForm} from 'react-hook-form'
import axios from 'axios'
import { connect, mapStateToProps, mapDispatchToProps } from '../store/dispatcher'
import { loginSchema as schema } from '../service/yup'
import { yupResolver } from '@hookform/resolvers/yup';
import InputTextField from "../components/form/InputTextField";
import { UserContext } from '../context/user';
import { SnackbarContext } from '../context/snackbar';
const Login = ({}) => {
    const navigate = useNavigate();
    const {users, setUsers} = useContext(UserContext);
    const {openErrorSnackbar,openSuccessSnackbar} = useContext(SnackbarContext)
    const { register,  formState: { errors } , handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });
    const submitForm = useCallback( async(data) => {
        console.log("data",data)
        const response = await axios.post("http://localhost:3001/users/login",data)
        .then(response => {
            console.log("response", response)
            if(response.data.error)
            {
                openErrorSnackbar("Email/password not found !")
            }else{
                localStorage.setItem("accessToken", response.data.token)
                setUsers({email: response.data.email,
                id:response.data.id,
            status:true})
              
                openSuccessSnackbar("You'll be logged in !")
                navigate("/home")
                //navigate("/home")
            }
        })
       return response
},[setUsers])
console.log("users", users)

    return (
    <Box className="loginContainer" >
         <h1 className="loginTitle">Login</h1>
            <form onSubmit={handleSubmit(submitForm)}>
                <Box className="loginInputContainer">
                    <InputTextField 
                    type="email"
                    name="email"
                    label="Email"
                    register={register}
                    error={errors.email}
                    variant="outlined"
                    color="success"
                    style={{padding:'1rem'}}
                    />
                    <InputTextField
                    type="password"
                    name="password"
                    label="Password"
                    register={register}
                    error={errors.password}
                    variant="outlined"
                    color="success"
                    style={{padding:'1rem'}}
                    />
                <Button  style={{padding:'1rem',width:'50%' , margin:'auto'}} type="submit" color="primary" variant="contained" >
                    Login
                </Button>
                </Box>
            </form>    
       
          
    </Box>
    )
}

export default Login
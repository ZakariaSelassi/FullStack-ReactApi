import React,{useCallback,useContext,useEffect,useState} from 'react'
import {useController, useForm} from 'react-hook-form'
import { createSchema as schema } from '../service/yup'
import { yupResolver } from '@hookform/resolvers/yup';
import {useParams} from 'react-router-dom';

import {Box,Button} from '@material-ui/core';
import {SnackbarContext } from '../context/snackbar'
import InputTextField from "../components/form/InputTextField";
import { connect, mapStateToProps, mapDispatchToProps } from '../store/dispatcher'

const UserEdit = ({dataUsers,editUser}) => {

    const {openSuccessSnackbar,openErrorSnackbar} = useContext(SnackbarContext)
    const {id} = useParams()
    const [users] = useState(dataUsers.find(item => item.id == id))
    const resolver = yupResolver(schema)
    const { register,  formState: { errors } , handleSubmit ,reset } = useForm({
        resolver,
        defaultValues:{
           name: users.name ? users.name : 'harde code',
           email:users.email ? users.email : 'harde code',
           password:users.password ?  users.password : 'harde code',
       }
   });
   // With the new react form hook, we need to reset the form manually with reset props
    useEffect(() => {
        reset({
            name: users.name ? users.name : 'harde code',
            email:users.email ? users.email : 'harde code',
            password:users.password ?  users.password : 'harde code',

        })
    },[reset])

    
    const onSubmit = useCallback(data => {
        console.log(data)
        console.log(id)
        editUser({id,
            data:{
            name:data.name,
            email:data.email,
            password:data.password}
        })
        .then(res => {
            // check if error
            if(res.error){
                openErrorSnackbar("Update user failed ! ")
            }else{
                openSuccessSnackbar('User has been updated')
                console.log(res)
            }
            
        }) 
    })
    return (
    <Box className="loginContainer">
         <h1 >Update user </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box >
                <InputTextField
                    type="text"
                    name="name"
                    label="name"
                    register={register}
                    error={errors.name}
                    variant="outlined"
                    color="success"
                    style={{padding:'1rem'}}
                   
                    />
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
                    Create
                </Button>
                </Box>
            </form>    
       
          
    </Box>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(UserEdit)

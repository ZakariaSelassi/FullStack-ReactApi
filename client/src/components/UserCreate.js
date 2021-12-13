import React,{useCallback} from 'react'
import { useNavigate } from 'react-router-dom';
import {Box,Button} from '@material-ui/core';
import {FormProvider, useForm} from 'react-hook-form'
import InputTextField from "../components/form/InputTextField";
import { connect, mapStateToProps, mapDispatchToProps } from '../store/dispatcher'
import {UserContext} from "../context/user";
const UserCreate = ({addUsers}) => {
    const navigate = useNavigate()
    const {users} = React.useContext(UserContext)
     const { register,  formState: { errors } , handleSubmit , control,reset} = useForm({
        defaultValues:{
            name:'',
            email:'',
            password:'',
        }
    });

    const onSubmit = useCallback((data)=> {
        /***** DONT DELETE THIS CODE BELOW */
       /*  const formData = new FormData();
        formData.append("picture", data.picture[0].name);
        const file = data.picture[0];
        console.log(file) */
        console.log(data);
      /*   const newData = {
            "name": data.name,
            "email": data.email,
            "password": data.password,
            "picture": file
        }
        console.log(newData) */
        let response = addUsers({data})
        .then(res => {
            console.log(res)
        })
        reset(response)
        navigate('/login')

        
    })
    return (
    <Box className="userContainer">
        
            <form onSubmit={handleSubmit(onSubmit)} className="createForm">
            <h1 style={{color:"white"}}>Create a user </h1>
                <div style={{display:"flex",flexDirection:'column'}} >
                <InputTextField
                    type="text"
                    name="name"
                    label="name"
                    register={register}
                    error={errors.name}
                    variant="outlined"
                    color="success"
                    control={control}
                    size="small"
                    variant="standard"
                    style={{marginBottom:"10px",paddingBottom:"1rem"}}
                    />
                    <InputTextField 
                    type="email"
                    name="email"
                    label="Email"
                    register={register}
                    error={errors.email}
                    size="small"
                    variant="standard"
                    color="success"
                    control={control}
                    style={{marginBottom:"10px",paddingBottom:"1rem"}}
                    />
                    <InputTextField
                    type="password"
                    name="password"
                    label="Password"
                    register={register}
                    error={errors.password}
                    variant="outlined"
                    color="success"
                    size="small"
                    variant="standard"
                    control={control}
                    style={{marginBottom:"10px",paddingBottom:"1rem"}} 
                    />
                    
                <Button  style={{padding:'1rem',width:'50%' , margin:'auto'}} type="submit" color="primary" variant="contained" >
                    Register 
                </Button>
                </div>
            </form>    
       
          
    </Box>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(UserCreate)

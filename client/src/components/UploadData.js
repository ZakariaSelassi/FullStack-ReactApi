import React from 'react'
import {useForm} from 'react-hook-form'
import InputTextField from "../components/form/InputTextField";
import {Button} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import { connect, mapStateToProps, mapDispatchToProps } from '../store/dispatcher'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const UploadData = ({uploadImage}) => {
    const {id} = useParams();
    const navigate = useNavigate()
    const {register , handleSubmit} = useForm();
    // upload image to server and get the url of the image
    const onSubmit = async (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append('picture_img', data.picture_img[0].name);
        formData.append('picture_img', data.picture_img[0]);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };
        const res = await axios.post(`http://localhost:3001/users/upload/${id}`, formData, config)
        console.log(res.data);
        // refresh the page to see the new image
        navigate('/home')
       
    }
   
    return (
        <>
        <div className="uploadContainer">
            <h1>Picture Profil</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                     <InputTextField
                    type="file"
                    name="picture_img"
                    id="picture_img"
                    register={register}
                    className='custom-file-input'
                    />
                    <Button  type="submit" color="primary" variant="contained" >
                    Pick up an image to upload
                </Button>
            </form>
        </div>
        </>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadData)

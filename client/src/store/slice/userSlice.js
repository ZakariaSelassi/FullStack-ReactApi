import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
     async () => {
        const response = await axios.get('http://localhost:3001/users',{
            headers:{
                accessToken: localStorage.getItem('accessToken'),
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        return response.data
     })
export const addUsers = createAsyncThunk(
    'users/addUsers',
    async (user) => {
    
     
        const response = await axios.post("http://localhost:3001/users", user,{

        })
        return response.data
    })
export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id) => {
        const response = await axios.delete(`http://localhost:3001/users/${id}`,{
            headers:{
                accessToken: localStorage.getItem('accessToken')
            }
        })
        return response.data
    })

export const editUser = createAsyncThunk(
    'users/editUser',
    async ({id,user}) => {
        const response = await axios.put(`http://localhost:3001/users/${id}`,user)
        return response.data
    })
export const uploadImage = createAsyncThunk(
    'users/UploadImage',
    async ({id,image}) => {
        console.log(id,image)
        const response = await axios.post(`http://localhost:3001/users/upload/${id}`,image,{
            headers:{
                accessToken: localStorage.getItem('accessToken'),
                'Accept': 'application/json',
            }
        })

        return response.data
    })

export const usersMethods = {
    fetchUsers,
    addUsers,
    deleteUser,
    editUser,
    uploadImage
}

const userSlice = createSlice({
    name: 'users',
    initialState:[],
    extraReducers:{
        [fetchUsers.fulfilled]: (_state, action) => action.payload.value,
        [editUser.fulfilled]: (state, action) => state.map(user => user.id === action.payload.value.id ? action.payload.value : user),
    }
})

export default userSlice
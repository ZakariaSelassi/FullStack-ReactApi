import React,{useState,useEffect,useCallback,useContext} from 'react'
import {Box} from '@material-ui/core';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import axios from 'axios'
import './style/index.scss'
import Login from "./views/Login"
import { SnackbarProvider, SnackbarContext } from './context/snackbar';
import Navbar from './components/bar/Navbar'
import UserCard from './components/UserCard'
import UserCreate from './components/UserCreate'
import UserEdit from './components/UserEdit'
import { connect, mapStateToProps, mapDispatchToProps } from '../src/store/dispatcher'
import {UserContext} from "./context/user"
import NotFound from "./components/NotFound"
import UploadData from './components/UploadData';
const App = ({ fetchUsers}) => {

  const [users,setUsers] = useState({
    id:0,
    name:'',
    email:'',
    password:'',
    isAdmin:false,
    picture_img:'',
    status:false})
  useEffect(() => {
      axios.get('http://localhost:3001/users/auth',{
        headers:{
          "accessToken": localStorage.getItem("accessToken")

        }
      })
      .then(res => {
        console.log("res",res.data)
        console.log("res",res.data.data.picture_img)
        if(res.data.error)
        {
          
          setUsers({...users, status:false})
        }else{
          setUsers({
            id: res.data.data.id,
            name: res.data.data.name,
            email: res.data.data.email,
            password: res.data.data.password,
            isAdmin: res.data.data.isAdmin,
            picture_img: res.data.data.picture_img,
            status: true,
          })
        }
      })
  },[])
  return (
    <Box className="mainApp">
      <UserContext.Provider value={{users,setUsers}}>
        <SnackbarProvider>
        { users.status ? <Navbar/> : null }
        <Router>
          <Routes>      
            {!users.status && <Route path="/" element={<UserCreate/>} /> } 
          {/*   <Route exact path="/" element={<UserCreate/>}/> */}
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/home" element={<UserCard/>}/>
            <Route exact path="/edit/:id" element={<UserEdit dataUsers={users} />}/>
            <Route exact path="/upload/:id" element={<UploadData/>}/>
           {/*  <Route path="*" element={<NotFound/>} /> */}
          </Routes>
        </Router>         
        </SnackbarProvider>
      </UserContext.Provider>
    </Box>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(App)

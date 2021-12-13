import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {Box} from '@material-ui/core'
import {UserContext} from "../../context/user"
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Navbar = () => {
   /*  const navigate = useNavigate() */
    const {users,setUsers} = useContext(UserContext)
    const itemBar = [
        {
            name: 'Home',
            icon: <HomeIcon/>,
            path: '/home',
        },
        {
            name: 'Create a user',
            icon: <AddIcon/>,
            path: '/',
        },{
            name: "Logout",
            icon: <LogoutIcon/>,
            leaveApp: function (){
                localStorage.removeItem("accessToken")
                setUsers({ id:0,
                    name:'',
                    email:'',
                    password:'',
                    isAdmin:false,
                    picture_img:'',
                    status:false})
                window.location.pathname = "/login"
                alert("You're logged out ! ")
            }
        },{
            name: "Upload a picture",
            icon: <UploadFileIcon/>,
            path: `/upload/${users.id}`
        }
    
    ]
    console.log(users)
    return (
        <div style={{display:"flex",alignContent:"center",justifyContent:"center"}}>
            <div className="Sidebar">
            <h1 style={{padding:'1rem', borderBottome:"1px solid red", }}>Dashboard
            </h1>
            <h2 style={{margin:"1rem", textAlign:"center",textTransform:"uppercase"}}>{users.name}</h2>
            <div style={{padding:"1rem",textAlign:"center"}}>
                { users.picture_img ?  <img src={`http://localhost:3001/Images/${users.picture_img}`} alt="avatar" style={{width:"100px", height:"100px", borderRadius:"50%",margin:"auto"}}/> : null}
            </div>
        <ul className="SidebarList">
            {
                itemBar.map((item, index) => {
                    return (
                        <li className="SideBarItem" 
                        id={window.location.pathname == item.path ? "active" : " "} key={index} onClick={() => {window.location.pathname = item.path || item.leaveApp()}}>
                            <div className="SidebarIcon">{item.icon}</div>
                            <div className="SidebarName">{  item.name}</div>
                        </li>
                    )
                })
            }
            </ul>
        </div>

        </div>
        
        )
    }
    
export default Navbar

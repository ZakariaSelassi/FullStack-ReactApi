import React,{useState,useEffect,useCallback,useContext} from 'react'
import { connect, mapStateToProps, mapDispatchToProps } from '../store/dispatcher'
import {TableContainer, Table, TableHead, TableBody,TableRow, TableCell, Typography} from '@material-ui/core'
import {SnackbarContext } from '../context/snackbar'
import Button from '@mui/material/Button';
import { textAlign } from '@mui/system';
import {Box} from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';
const UserCard = ({fetchUsers,deleteUser,editUser}) => {
    // 1. set state for user / columns 
    const {users,setUsers} = useContext(UserContext)
    console.log(users)
    const [user,setUser] = useState([])
    const [columns,setColumns] = useState([])
    const {openSuccessSnackbar,openErrorSnackbar} = useContext(SnackbarContext)
    const Navigate = useNavigate();
    useEffect(() => {
        let obj={}
        fetchUsers()
        .then(res => {
            console.log("test", res.payload)
            if(res.payload.err){
                openErrorSnackbar("Your are not logged in")
            }else{
                
                const {id,name,email,password,isAdmin} = res.payload[0]
                obj = {id,name,email,password,isAdmin}
                setUser(res.payload)
                setColumns(Object.keys(obj))
            }
        })   
    },[])
    const handleEdit = useCallback((values) => {
        Navigate(`/edit/${values.id}`)
 
    })
    const handleDelete = (row) => {  
        deleteUser(row.id)
        .then((res) => {
            console.log(res)
            fetchUsers()
            .then(res => {
                if(res.error){
                    openErrorSnackbar("User hasnt been delete ! ")
                }else{
                     setUser(res.payload)
                     openSuccessSnackbar('User has been delete')
                }
            })
        })
    }
    /* if(user.length === 0){
        return <div>Try to logged in ! </div>
    } */
    return (
        <div className="userAll">
            <Typography style={{display:'flex'}}variant="h4" className="userAll__title">
                All Users
            </Typography>
            <TableContainer style={{margin:'auto', marginTop:'20px', boxShadow:'0px 5px 8px black', height:"200px", minHeight:"calc(100vh - 400px)",backgroundColor:"white"}} >
            <Table className="userAllTable" >
            <TableHead>
                <TableRow>
                {
                    columns.map((key,index) => {
                        return <TableCell key={index} style={{fontWeight:"bolder"}}>{key}</TableCell>
                    })
                }
                <TableCell style={{textAlign:"center",fontWeight:"bolder"}} >Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    {
                      Object.values(user).map((row,index) => {
                           return (
                                <TableRow key={index}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.password}</TableCell>
                                    <TableCell>{row.isAdmin == true ? <p>admin</p> : <p>random user</p>}</TableCell>
                                    <TableCell style={{textAlign:"center"}}>
                                        <Button  variant="contained" color="success" onClick={event => {event.stopPropagation(); handleEdit(row) }}>Edit</Button>
                                        <Button   variant="outlined" color="error" onClick={event => {event.stopPropagation(); handleDelete(row) }}>Delete</Button>
                                      
                                    </TableCell>


                                </TableRow>             
                           )
                       })
                    }
            </TableBody>
            </Table>        
            </TableContainer>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(UserCard)

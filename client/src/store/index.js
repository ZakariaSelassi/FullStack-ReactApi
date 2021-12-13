import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'

import userSlice from './slice/userSlice'


const store = configureStore({
    reducer:{
        users: userSlice.reducer
    },
    middleware: [...getDefaultMiddleware({immutableCheck:false})]
})

console.log(store.users)
export default store
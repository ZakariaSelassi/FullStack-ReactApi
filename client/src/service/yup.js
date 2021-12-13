import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().required("your email have to be like : azerty@gmail.com"),
    password: yup.string().required()
})

export const createSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
})
export default yup;
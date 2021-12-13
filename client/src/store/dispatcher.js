import {connect} from 'react-redux';

import { usersMethods } from './slice/userSlice';

export const mapDispatchToProps = {
    // users 
    ...usersMethods,
}

export const mapStateToProps = state => state;

export { connect }

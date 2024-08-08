import { createSlice } from '@reduxjs/toolkit';
import axios from '../config/axiosinstance';
import { toast } from 'react-toastify';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {}
    },
    reducers: {
        setUser(state, action) {
            state.value = action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;

export const getUser = () => {
    return async function (dispatch) {
        try {
            const { data } = await axios({
                method: 'get',
                url: '/user',
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            dispatch(setUser(data));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}

export const updateUser = (name, skinUndertone) => {
    return async function (dispatch) {
        try {
            const { data } = await axios({
                method: 'put',
                url: '/user',
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                },
                data: {
                    name,
                    skinUndertone
                }
            });

            toast.success(data.message);
            dispatch(getUser());
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}

export default userSlice.reducer;
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

export const updateUserImage = (formData) => {
    return async function (dispatch) {
        const wait = toast.loading('Image is uploading');
        try {
            const { data } = await axios({
                method: 'patch',
                url: '/user/img',
                data: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            toast.update(wait, {render: data.message, type: 'success', isLoading: false, autoClose: 5000, closeOnClick: true});
            dispatch(getUser());
        } catch (err) {
            toast.update(wait, {render: err.response.data.message, type: 'error', isLoading: false, autoClose: 5000, closeOnClick: true});
        }
    }
}

export default userSlice.reducer;
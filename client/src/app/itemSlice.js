import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../config/axiosinstance";
import { getCatItems } from "./catSlice";

export const itemSlice = createSlice({
    name: 'item',
    initialState: {
        value: {}
    },
    reducers: {
        setItem(state, action) {
            state.value = action.payload;
        }
    }
});

export const { setItem } = itemSlice.actions;

export const getItem = (itemId) => {
    return async function(dispatch) {
        try {
            const { data } = await axios({
                method: 'get',
                url: `/items/${itemId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            dispatch(setItem(data));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
} 

export const getItemByCat = (catId) => {
    return async function(dispatch) {
        try {
            const { data } = await axios({
                method: 'get',
                url: `/items/cat/${catId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            dispatch(setItem(data));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}

export const addItem = (name, color, brand, description, CategoryId) => {
    return async function(dispatch) {
        try {
            await axios({
                method: 'post',
                url: '/items',
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                },
                data: {
                    name,
                    color,
                    brand,
                    description,
                    CategoryId
                }
            });

            dispatch(getCatItems());
            toast.success('Successfully add new item');
        } catch (err) {
            if (Array.isArray(err.response.data.message)) {
                toast.error(err.response.data.message.join(', '));
            } else {
                toast.error(err.response.data.message);
            }
        }
    }
}

export const editItem = (name, color, brand, description, CategoryId, itemId) => {
    return async function(dispatch) {
        try {
            const { data } = await axios({
                method: 'put',
                url: `/items/${itemId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                },
                data: {
                    name,
                    color,
                    brand,
                    description,
                    CategoryId
                }
            });

            toast.success('Successfully edit item');
        } catch (err) {
            if (Array.isArray(err.response.data.message)) {
                toast.error(err.response.data.message.join(', '));
            } else {
                toast.error(err.response.data.message);
            }
        }
    }
}

export const deleteItem = itemId => {
    return async function(dispatch) {
        try {
            const { data } = await axios({
                method: 'delete',
                url: `/items/${itemId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            toast.success(data.message);
            dispatch(getCatItems());
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}

export const updateItemImage = (formData, itemId) => {
    return async function(dispatch) {
        const wait = toast.loading('Image is uploading');
        try {
            const { data } = await axios({
                method: 'patch',
                url: `/items/${itemId}/img`,
                data: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            dispatch(getItem(itemId));
            toast.update(wait, {render: data.message, type: 'success', isLoading: false, autoClose: 5000, closeOnClick: true});
        } catch (err) {
            toast.update(wait, {render: err.response.data.message, type: 'error', isLoading: false, autoClose: 5000, closeOnClick: true});
        }
    }
}

export const getItems = () => {
    return async function(dispatch) {
        try {
            const { data } = await axios({
                method: 'get',
                url: '/items',
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            dispatch(setItem(data));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}

export const getCatItemsAll = () => {
    return async function(dispatch) {
        try {
            const { data } = await axios({
                method: 'get',
                url: '/items/cat/all',
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            dispatch(setItem(data));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}

export default itemSlice.reducer;
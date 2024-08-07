import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../config/axiosinstance";

export const catSlice = createSlice({
    name: 'catItems',
    initialState: {
        value: []
    },
    reducers: {
        setCat(state, action) {
            state.value = action.payload;
        }
    }
});

export const { setCat } = catSlice.actions;

export const getCatItems = () => {
    return async function(dispatch) {
        try {
            const { data } = await axios({
                method: 'get',
                url: '/items/cat',
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            dispatch(setCat(data));
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
}

export default catSlice.reducer;
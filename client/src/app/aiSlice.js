import { createSlice } from "@reduxjs/toolkit";
import axios from "../config/axiosinstance";
import { toast } from "react-toastify";

export const aiSlice = createSlice({
    name: 'aiMessage',
    initialState: {
        value: '',
        loading: false
    },
    reducers: {
        setOutput(state, action) {
            state.value = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        }
    }
});

export const { setOutput, setLoading } = aiSlice.actions;

export const  getFunFact = (name, brand, catName) => {
    return async function(dispatch) {
        try {
            dispatch(setLoading(true));
            const { data } = await axios({
                method: 'post',
                url: '/openai/fun-fact',
                data: {
                    name,
                    brand,
                    catName
                },
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            dispatch(setOutput(data));
        } catch (err) {
            toast.error(err.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export const  getOutift = (items) => {
    return async function(dispatch) {
        try {
            dispatch(setLoading(true));
            const { data } = await axios({
                method: 'post',
                url: '/openai/outfit',
                data: {
                    data: items
                },
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            dispatch(setOutput(data));
        } catch (err) {
            toast.error(err.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export default aiSlice.reducer;
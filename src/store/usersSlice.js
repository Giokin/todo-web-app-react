import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUsers = createAsyncThunk(
    'fetchUser',
    async () => {
        const response = await axios.get('/api/users');
        return response.data;
    }
);

const updateUser = createAsyncThunk(
    'updateUser',
    async (user)=> {
      const response = await axios.put(`/api/users/${user.id}`, user)
      return response.data;
    }
  );

const createUser = createAsyncThunk(
    'createUser',
    async (user) => {
        const response = await axios.post('/api/users', user);
        return response.data;
    }
);

const destroyUser = createAsyncThunk(
    'destroyUser',
    async (user) => {
        await axios.delete(`/api/users/${user.id}`);
        return user;
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        USER_UPDATE: (state, action)=> {
            return state.map( user => user.id === action.payload.id ? action.payload: user);
          },
        USER_CREATE: (state, action) => {
            if (!state.find(user => user.id === action.payload.id)) {
                return [...state, action.payload];
            }
            return state;
        },
        CATEGORY_DESTROY: (state, action) => {
            return state.filter(user => user.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            if (!state.find(user => user.id === action.payload.id)) {
                return [...state, action.payload];
            }
            return state;
        });
        builder.addCase(destroyUser.fulfilled, (state, action) => {
            return state.filter(user => user.id !== action.payload.id);
        });
        builder.addCase(updateUser.fulfilled, (state, action)=> {
            return state.map( user => user.id === action.payload.id ? action.payload: user);
        })
    }
});

export default usersSlice;

export {
    fetchUsers,
    createUser,
    destroyUser,
    updateUser
};
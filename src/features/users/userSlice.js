import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser, updateUser, getUsers, getOneUserCall } from "./userAPI";

const initialState = {
  user: null,
  users: [],
  likedUser: [],
  matchingMovies: [],
  status: "idle",
  error: null,
  token: null,
};

export const login = createAsyncThunk("auth/fetchUser", async (creds) => {
  console.log(creds);
  const response = await fetchUser(creds);
  return response;
});

export const getAllUsers = createAsyncThunk("auth/getUsers", async () => {
  const response = await getUsers();

  return response;
});

export const getOneUser = createAsyncThunk(
  "auth/getOneUser",
  async (username) => {
    const response = await getOneUserCall(username);

    return response;
  }
);

export const updateUserInfo = createAsyncThunk(
  "auth/updateUser",
  async (userInfo) => {
    await updateUser(userInfo);
    return userInfo;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },

    updateLiked: (state, action) => {
      state.user.liked.push(action.payload);
      state.user.likedMovieId.push(action.payload.id);
    },
    removeLiked: (state, action) => {
      const newArr = state.user.liked.filter((e) => {
        return e.id !== action.payload.id;
      });
      state.user.liked = newArr;
      const newIdArr = state.user.likedMovieId.filter((e) => {
        return e !== action.payload.id;
      });
      state.user.likedMovieId = newIdArr;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.user;
        state.error = null;
        state.likedUser = [action.payload.user];
        state.token = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "errored";
        state.error = action.error.message;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;

        state.users = action.payload.filter((e) => !e.isAdmin);
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "errored";
        state.error = action.error.message;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.status = "errored";
        state.error = action.error.message;
      })
      .addCase(getOneUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOneUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.likedUser = action.payload;
      })
      .addCase(getOneUser.rejected, (state, action) => {
        state.status = "errored";
        state.error = action.error.message;
      });
  },
});

export const { logout, updateLiked, removeLiked } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectAccessToken = (state) => state.user.accessToken;

export default userSlice.reducer;

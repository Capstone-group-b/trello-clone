import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * CONSTANT VARIABLES
 */
const TOKEN = "token";

/**
 * THUNKS
 */
export const me = createAsyncThunk("auth/me", async () => {
  const token = window.localStorage.getItem(TOKEN); // points to stored JWT
  try {
    if (token) {
      const res = await axios.get("/auth/me", {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return "There was an issue with your request.";
    }
  }
});

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async ({ email, password, firstName, lastName, method }, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        email,
        password,
        firstName,
        lastName,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      thunkAPI.dispatch(me());
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return "There was an issue with your request.";
      }
    }
  }
);

export const updateTheme = createAsyncThunk(
  "auth/me/updateTheme",
  async ({ userId, theme }) => {
    try {
      console.log(
        `***
      ***
      ***
      Logging:Here we have the userId, and the theme
      ***
      ***
      ***
      `,
        userId,
        theme
      );
      const { data } = await axios.patch(`/api/users/updateTheme/${userId}`, {
        theme,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

/**
 * SLICE
 */
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    me: {},
    error: null,
  },
  reducers: {
    logout(state, action) {
      window.localStorage.removeItem(TOKEN);
      (state.me = {}), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      state.me = action.payload;
    });

    builder.addCase(me.rejected, (state, action) => {
      state.error = action.error;
    });

    builder.addCase(authenticate.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(updateTheme.fulfilled, (state, action) => {
      state.me.theme = action.payload;
    });
  },
});

/**
 * ACTIONS
 */
export const { logout } = authSlice.actions;

/**
 * REDUCER
 */
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const apiKey = "bad46dfee1ae1125ec4faf31e63449de";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching data"
      );
    }
  }
);
const weatherSlice = createSlice({
  name: "weather", // slice name
  initialState: {
    city: "", // city from input
    data: null, //  API data
    status: "idle",
    error: null,
  },
  reducers: {
    setCity(state, action) {
      state.city = action.payload; // city to state
    },
    clearWeather(state) {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setCity, clearWeather } = weatherSlice.actions;
export { fetchWeather };
export default weatherSlice.reducer;

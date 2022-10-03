import { createSlice } from '@reduxjs/toolkit';
import { getAllGames, getLabels, getSpecificGame } from './gamesLibraryActions';
export * from './gamesLibraryActions';

const initialState = {
	labels: [],
	gamesData: [],
	specificGame: [],
	status: '',
	specificGameStatus: '',
	totalRecords: 0,
	noResultStatus: false,
	noResultStatusCalendar: false
};

const gamesLibrarySlice = createSlice({
	name: 'gamesLibrary',
	initialState,
	reducers: {
		resetCalendarError: (state) => {
			state.noResultStatusCalendar = false;
		},
		resetNoResultStatus: (state) => {
			state.noResultStatus = false;
		}
	},
	extraReducers: (builder) => {
		// Labels Actions
		builder.addCase(getLabels.fulfilled, (state, action) => {
			state.labels = action.payload;
		});

		// Get All Games Actions
		builder.addCase(getAllGames.pending, (state) => {
			state.status = 'pending';
		});
		builder.addCase(getAllGames.fulfilled, (state, action) => {
			state.gamesData =
				action.payload.data.length > 0 ? action.payload.data : state.gamesData;
			state.totalRecords =
				action.payload.data.length > 0
					? action.payload.total
					: state.totalRecords;
			state.status = 'success';
			if (action.payload.fromCalendar) {
				state.noResultStatusCalendar =
					action.payload.data.length > 0 ? false : true;
			} else {
				state.noResultStatus = action.payload.data.length > 0 ? false : true;
			}
		});
		builder.addCase(getAllGames.rejected, (state) => {
			state.status = 'failed';
		});

		// Get Specific Game Actions
		builder.addCase(getSpecificGame.pending, (state) => {
			state.specificGameStatus = 'loading';
		});
		builder.addCase(getSpecificGame.fulfilled, (state, action) => {
			state.specificGame = action.payload;
			state.specificGameStatus = 'success';
		});
		builder.addCase(getSpecificGame.rejected, (state) => {
			state.specificGameStatus = 'failed';
		});
	}
});

export const { resetCalendarError, resetNoResultStatus } =
	gamesLibrarySlice.actions;

export default gamesLibrarySlice.reducer;

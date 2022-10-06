import { createSlice } from '@reduxjs/toolkit';
import {
	getLabels,
	getAllViralsApi,
	getSpecificViral
} from './viralLibraryActions';
export * from './viralLibraryActions';

const initialState = {
	labels: [],
	virals: [], //get api - all virals state
	specificViral: [],
	openUploadPost: false,
	totalRecords: 0,
	noResultStatus: false,
	noResultStatusCalendar: false,
	specificViralStatus: ''
};

export const viralLibararySlice = createSlice({
	name: 'viralLibrary',
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
		// getLabels Action Cases
		builder.addCase(getLabels.fulfilled, (state, action) => {
			state.labels = action.payload;
		});

		// getAllViralsApi Action Cases
		builder.addCase(getAllViralsApi.pending, (state) => {
			state.status = 'pending';
		});

		builder.addCase(getAllViralsApi.fulfilled, (state, action) => {
			state.virals =
				action.payload.data.length > 0 ? action.payload.data : state.virals;

			state.totalRecords =
				action.payload.data.length > 0
					? action.payload.total
					: state.totalRecords;

			state.status = 'success';

			if (action.payload.fromCalendar) {
				state.noResultStatusCalendar =
					action.payload.data.length > 0 ? false : true;
			}

			if (action.payload.isSearch) {
				state.noResultStatus = action.payload.data.length > 0 ? false : true;
			}
		});

		builder.addCase(getAllViralsApi.rejected, (state) => {
			state.status = 'failed';
		});

		// getSpecificViral Action Cases
		builder.addCase(getSpecificViral.pending, (state) => {
			state.status = 'loading';
			state.specificViralStatus = 'loading';
		});

		builder.addCase(getSpecificViral.fulfilled, (state, action) => {
			state.specificViral = action.payload;
			state.status = 'success';
			state.specificViralStatus = 'success';
		});

		builder.addCase(getSpecificViral.rejected, (state) => {
			state.status = 'failed';
			state.specificViralStatus = 'failed';
		});
	}
});

export const { resetCalendarError, resetNoResultStatus } =
	viralLibararySlice.actions;

export default viralLibararySlice.reducer;

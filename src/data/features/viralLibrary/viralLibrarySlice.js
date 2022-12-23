/**
 * @module features/viralLibrary
 * @description The viralLibararySlice feature contains it's state, reducers, and extraReducers related to virals
 */

import { createSlice } from '@reduxjs/toolkit';
import {
	getLabels,
	getAllViralsApi,
	getSpecificViral
} from './viralLibraryActions';
export * from './viralLibraryActions';

/**
 * @type {Object}
 * @description The initialState of the viralLibararySlice
 * @property {array} labels - The list of all the labels fetched
 * @property {array} virals - The list of all the virals fetched
 * @property {array | Object} specificViral - The selected viral to be displayed on the drawer
 * @property {number} totalRecords - The total number of records for virals
 * @property {string} specificViralStatus - The specific viral status when it's being fetched
 * @property {boolean} openUploadPost
 * @property {boolean} noResultStatus
 * @property {boolean} noResultStatusCalendar
 */
const initialState = {
	labels: [],
	virals: [], //get api - all virals state
	specificViral: null,
	totalRecords: 0,
	specificViralStatus: '',
	openUploadPost: false,
	noResultStatus: false,
	noResultStatusCalendar: false
};

const viralLibararySlice = createSlice({
	name: 'viralLibrary',
	initialState,
	reducers: {
		resetCalendarError: (state) => {
			state.noResultStatusCalendar = false;
		},
		resetNoResultStatus: (state) => {
			state.noResultStatus = false;
		},
		resetSpecificViral: (state) => {
			state.specificViral = null;
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
			state.virals = action.payload.data;
			state.totalRecords = action.payload.total;
			state.status = 'success';
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

export const { resetCalendarError, resetNoResultStatus, resetSpecificViral } =
	viralLibararySlice.actions;

export default viralLibararySlice.reducer;

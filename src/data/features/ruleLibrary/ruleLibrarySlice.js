/**
 * @module features/ruleLibrary
 * @description The ruleLibararySlice feature contains it's state, reducers, and extraReducers related to virals
 */

import { createSlice } from '@reduxjs/toolkit';
import { getAllRulesApi, getSpecificRule } from './ruleLibraryActions';
export * from './ruleLibraryActions';

/**
 * @type {Object}
 * @description The initialState of the ruleLibararySlice
 * @property {array} virals - The list of all the rule fetched
 * @property {array | Object} specificRule - The selected viral to be displayed on the drawer
 * @property {number} totalRecords - The total number of records for rules
 * @property {string} specificRuleStatus - The specific rule status when it's being fetched
 * @property {boolean} openUploadPost
 * @property {boolean} noResultStatus
 * @property {boolean} noResultStatusCalendar
 */
const initialState = {
	rules: [],
	specificRule: null,
	totalRecords: 0,
	specificRuleStatus: '',
	openUploadPost: false,
	noResultStatus: false,
	noResultStatusCalendar: false
};

const ruleLibararySlice = createSlice({
	name: 'ruleLibrary',
	initialState,
	reducers: {
		resetCalendarError: (state) => {
			state.noResultStatusCalendar = false;
		},
		resetNoResultStatus: (state) => {
			state.noResultStatus = false;
		},
		resetSpecificRule: (state) => {
			state.specificRule = null;
		}
	},
	extraReducers: (builder) => {
		// getAllRulesApi Action Cases
		builder.addCase(getAllRulesApi.pending, (state) => {
			state.status = 'pending';
		});

		builder.addCase(getAllRulesApi.fulfilled, (state, action) => {
			state.rules = action.payload.data;
			state.totalRecords = action.payload.total;
			state.status = 'success';
		});

		builder.addCase(getAllRulesApi.rejected, (state) => {
			state.status = 'failed';
		});

		// getSpecificRule Action Cases
		builder.addCase(getSpecificRule.pending, (state) => {
			state.status = 'loading';
			state.specificRuleStatus = 'loading';
		});

		builder.addCase(getSpecificRule.fulfilled, (state, action) => {
			state.specificRule = action.payload;
			state.status = 'success';
			state.specificRuleStatus = 'success';
		});

		builder.addCase(getSpecificRule.rejected, (state) => {
			state.status = 'failed';
			state.specificRuleStatus = 'failed';
		});
	}
});

export const { resetCalendarError, resetNoResultStatus, resetSpecificRule } =
	ruleLibararySlice.actions;

export default ruleLibararySlice.reducer;

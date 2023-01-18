import { createSlice } from '@reduxjs/toolkit';
import {
	fetchRules,
	getAllRulesApi,
	getSpecificRule,
	getCountriesApi
} from './ruleLibraryActions';
export * from './ruleLibraryActions';

const initialState = {
	loading: false,
	rules: [],
	rulesList: [],
	countries: [],
	specificRule: null,
	error: ''
};

const rulesSlice = createSlice({
	name: 'rule',
	initialState,
	reducers: {
		resetSpecificRule: (state) => {
			state.specificRule = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRules.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchRules.fulfilled, (state, action) => {
			state.loading = false;
			state.rules = action.payload;
			state.error = '';
		});
		builder.addCase(fetchRules.rejected, (state, action) => {
			state.loading = false;
			state.rules = [];
			state.error = action.error.message;
		});
		//get all countries ActionCases
		builder.addCase(getCountriesApi.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getCountriesApi.fulfilled, (state, action) => {
			state.loading = false;
			state.countries = action.payload;
			state.error = '';
		});
		builder.addCase(getCountriesApi.rejected, (state, action) => {
			state.loading = false;
			state.countries = [];
			state.error = action.error.message;
		});

		// getSpecificRule Action Cases
		builder.addCase(getSpecificRule.pending, (state) => {
			state.loading = true;
			state.specificRuleStatus = 'pending';
		});

		builder.addCase(getSpecificRule.fulfilled, (state, action) => {
			state.loading = false;
			state.specificRule = action.payload;
			state.specificRuleStatus = 'success';
		});

		builder.addCase(getSpecificRule.rejected, (state) => {
			state.loading = false;
			state.specificRuleStatus = 'failed';
		});

		// getAllRulesApi Action Cases
		builder.addCase(getAllRulesApi.pending, (state) => {
			state.status = 'pending';
		});

		builder.addCase(getAllRulesApi.fulfilled, (state, action) => {
			state.rulesList = action.payload.data;
			state.totalRecords = action.payload.total;
			state.status = 'success';
		});

		builder.addCase(getAllRulesApi.rejected, (state) => {
			state.status = 'failed';
		});
	}
});

export const { resetSpecificRule } = rulesSlice.actions;

export default rulesSlice.reducer;

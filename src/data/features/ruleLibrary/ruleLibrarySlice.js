import { createSlice } from '@reduxjs/toolkit';
import { fetchRules, getAllRulesApi } from './ruleLibraryActions';
export * from './ruleLibraryActions';

const initialState = {
	loading: false,
	rules: [],
	rulesList: [],
	error: ''
};

const rulesSlice = createSlice({
	name: 'rule',
	initialState,
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

export default rulesSlice.reducer;

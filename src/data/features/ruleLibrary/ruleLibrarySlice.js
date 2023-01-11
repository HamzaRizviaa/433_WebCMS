import { createSlice } from '@reduxjs/toolkit';
import { fetchRules } from './ruleLibraryActions';
export * from './ruleLibraryActions';

const initialState = {
	loading: false,
	rules: [],
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
	}
});

export default rulesSlice.reducer;

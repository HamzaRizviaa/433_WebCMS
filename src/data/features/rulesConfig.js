import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RuleService } from '../services';

const initialState = {
	loading: false,
	rules: [],
	error: ''
};

export const fetchRules = createAsyncThunk('rule/fetchRules', async () => {
	const result = await RuleService.getRules();
	if (result) {
		return result.data.data;
	} else {
		return [];
	}
});

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

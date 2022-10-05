import { createSlice } from '@reduxjs/toolkit';

export const remoteConfigSlice = createSlice({
	name: 'featureFlags',
	initialState: {
		features: {}
	},
	reducers: {
		setRemoteConfigData: (state, action) => {
			return {
				...state,
				features: action.payload
			};
		}
	}
});

const { setRemoteConfigData } = remoteConfigSlice.actions;

export const setRemoteConfig = (value) => async (dispatch) => {
	dispatch(setRemoteConfigData(value));
};

export default remoteConfigSlice.reducer;

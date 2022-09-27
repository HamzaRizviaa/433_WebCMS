/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';

const FeatureWrapper = ({ name, children }) => {
	const { features } = useSelector((state) => state.remoteConfig);
	const feature = features[name]._value;

	if (feature === 'true') {
		return children;
	}

	return null;
};

export default FeatureWrapper;

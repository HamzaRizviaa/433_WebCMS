import React from 'react';
import OptionsFormatter from './OptionsFormatter';
import StatusBadge from '../../StatusBadge';
import MediaPreviewer from '../../../common/MediaPreviewer';
import TextMarkup from './TextMarkup';
import TextWrapper from './TextWrapper';

const formatter = {
	status: StatusBadge,
	options: OptionsFormatter,
	media: MediaPreviewer,
	markup: TextMarkup,
	wrapper: TextWrapper
};

export const getFormatter = (type, props = {}) => {
	const Formatter = formatter[type] || TextWrapper;
	return <Formatter {...props} />;
};

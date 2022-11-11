import React from 'react';
import PropTypes from 'prop-types';
import DraggableLayoutWrapper from '../../../layouts/DraggableLayoutWrapper';
import BannerRow from './BannerRow';

const BannerFormRows = ({ form, swap }) => {
	const handleDragData = (data) => {
		swap(data.source.index, data.destination.index);
	};

	return (
		<DraggableLayoutWrapper onDragEnd={handleDragData}>
			{form.values.bannerData.map((item, index) => (
				<BannerRow
					key={index}
					item={item}
					index={index}
					errorMsg={form?.errors?.bannerData}
				/>
			))}
		</DraggableLayoutWrapper>
	);
};

BannerFormRows.propTypes = {
	form: PropTypes.object.isRequired,
	swap: PropTypes.func.isRequired
};

export default BannerFormRows;

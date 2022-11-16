import React from 'react';
import PropTypes from 'prop-types';
import DraggableLayoutWrapper from '../../../layouts/DraggableLayoutWrapper';
import BannerRow from './BannerRow';
import { reorder } from '../../../../data/helpers';

const BannerFormRows = ({ form, tabValue }) => {
	const handleDragData = ({ source, destination }) => {
		// const sourceData = form.values.bannerData[source.index];
		// const destinationData = form.values.bannerData[destination.index];
		// const isSourceDataEmpty =
		// 	!sourceData.banner_type && !sourceData.content.title;
		// const isDestinationDataEmpty =
		// 	!destinationData.banner_type && !destinationData.content.title;
		if (!destination) {
			return;
		}
		if (source.index !== destination.index) {
			const items = reorder(
				form.values.bannerData, //data
				source.index, // pick
				destination.index // drop
			);

			form.setFieldValue('bannerData', items);
		}
	};

	return (
		<DraggableLayoutWrapper onDragEnd={handleDragData}>
			{form.values.bannerData.map((item, index) => (
				<BannerRow
					key={index}
					item={item}
					index={index}
					errorMsg={form?.errors?.bannerData}
					tabValue={tabValue}
				/>
			))}
		</DraggableLayoutWrapper>
	);
};

BannerFormRows.propTypes = {
	form: PropTypes.object.isRequired,
	swap: PropTypes.func.isRequired,
	tabValue: PropTypes.string.isRequired
};

export default BannerFormRows;

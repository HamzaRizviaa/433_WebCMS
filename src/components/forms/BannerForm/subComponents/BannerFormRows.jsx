/* eslint-disable react/prop-types */
import React from 'react';
import DraggableLayoutWrapper from '../../../layouts/DraggableLayoutWrapper';
import BannerRow from './BannerRow';

const BannerFormRows = ({ form, swap }) => {
	const handleDelete = () => {};

	const handleDragData = (data) => {
		console.log(data);
		swap(data.source.index, data.destination.index);
	};

	return (
		<DraggableLayoutWrapper onDragEnd={handleDragData}>
			{form.values.bannerData.map((item, index) => (
				<BannerRow
					key={item.id}
					item={item}
					index={index}
					onDeleteIconClick={handleDelete}
				/>
			))}
		</DraggableLayoutWrapper>
	);
};

export default BannerFormRows;

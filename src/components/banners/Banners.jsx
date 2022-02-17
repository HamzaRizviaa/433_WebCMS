import React, { useState } from 'react';
import classes from './_banners.module.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BannerRows from './BannerRows';
import Button from '../button';

export default function Banners() {
	const [bannerData, setBannerData] = useState([
		{
			id: '1'
		},
		{
			id: '2'
		},
		{
			id: '3'
		},
		{
			id: '4'
		},
		{
			id: '5'
		}
	]);

	const bannersDataValue = [
		{
			id: '1'
		},
		{
			id: '2'
		},
		{
			id: '3'
		},
		{
			id: '4'
		},
		{
			id: '5'
		}
	];

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	const onDragEnd = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}
		const items = reorder(
			bannerData,
			result.source.index, // pick
			result.destination.index // drop
		);

		setBannerData(items);
	};
	// - autocomplete ends

	return (
		<div className={classes.Banner}>
			<div className={classes.bannerRow}>
				<div className={classes.bannersLeft}>
					{bannersDataValue.length > 0 &&
						bannersDataValue.map((data, index) => {
							return (
								<div className={classes.bannertext} key={index}>
									Banner {data.id}
								</div>
							);
						})}
				</div>
				<div
					className={classes.dragbale}
					//disableDropdown={disableDropdown}
				>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId='droppable-1'>
							{(provided) => (
								<div {...provided.droppableProps} ref={provided.innerRef}>
									{bannerData.map((data, index) => {
										return (
											<BannerRows
												data={data.id}
												key={index}
												provided={provided}
											/>
										);
									})}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>
			</div>
			<div className={classes.buttonDiv}>
				<Button
					disabled={false}
					onClick={() => {}}
					text={'PUBLISH HOME BANNERS'}
				/>
			</div>
		</div>
	);
}

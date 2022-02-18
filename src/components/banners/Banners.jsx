import React, { useState } from 'react';
import classes from './_banners.module.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BannerRows from './BannerRows';
import Button from '../button';
//import { useEffect } from 'react';

export default function Banners() {
	//const [isDisabledBtn, setIsDisabledBtn] = useState(true);
	const [bannerData, setBannerData] = useState([
		{
			id: '1',
			bannerType: '',
			selectedMedia: null
		},
		{
			id: '2',
			bannerType: '',
			selectedMedia: null
		},
		{
			id: '3',
			bannerType: '',
			selectedMedia: null
		},
		{
			id: '4',
			bannerType: '',
			selectedMedia: null
		},
		{
			id: '5',
			bannerType: '',
			selectedMedia: null
		}
	]);

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

	const handleBannerPositionAndFirstBanner = () => {
		let flag;
		let flag2;
		// max 4
		// min 1 , can't set 0
		// disabled = true = GREY
		// noy disables = false = YELLOW
		for (let i = 4; i >= 1; i--) {
			// start from max to min
			if (bannerData[i].bannerType || bannerData[i].selectedMedia) {
				//check data in both fields
				if (!bannerData[i - 1].bannerType || !bannerData[i - 1].selectedMedia) {
					// check one up , if data is here
					flag = true;
					//not return true
					break;
				}
			}
		}
		//please select should be at last
		// for (let i = 4; i >= 1; i--) {
		// 	if ((bannerData[i].bannerType === 'Please Select') !== 4) {
		// 		flag2 = true;
		// 		break;
		// 	}
		// }
		console.log('Position ', flag, flag2);
		return flag;
	};

	return (
		<div className={classes.Banner}>
			<div className={classes.bannerRow}>
				<div className={classes.bannersLeft}>
					{[1, 2, 3, 4, 5].length > 0 &&
						[1, 2, 3, 4, 5].map((id, index) => {
							return (
								<div className={classes.bannertext} key={index}>
									Banner {id}
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
												data={data}
												setBannerData={setBannerData}
												key={data.id}
												provided={provided}
												index={index}
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
					disabled={handleBannerPositionAndFirstBanner()}
					onClick={() => {}}
					text={'PUBLISH HOME BANNERS'}
				/>
			</div>
		</div>
	);
}

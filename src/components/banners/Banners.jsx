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

	// const handleFirstBanner = () => {
	// 	if (bannerData[0].bannerType && bannerData[0].selectedMedia) {
	// 		return false;
	// 	} else {
	// 		return true;
	// 	}
	// };

	// useEffect(() => {
	// 	handleBannerPosition();
	// }, [bannerData]);

	// disabled = true = GREY
	// NOT DISABLED = FALSE = YELLOW

	const handleBannerPositionAndFirstBanner = () => {
		let min;
		let max;
		let flag = false;
		let flag2 = false;
		for (let i = 0; i <= 4; i++) {
			if (bannerData[i].bannerType && bannerData[i].selectedMedia) {
				min = i;
				break;
			}
		}
		for (let i = 4; i >= 0; i--) {
			if (bannerData[i].bannerType && bannerData[i].selectedMedia) {
				max = i;
				break;
			}
		}

		if (bannerData[0].bannerType && bannerData[0].selectedMedia) {
			flag2 = false;
		} else {
			flag2 = true;
		}

		if (min !== max) {
			console.log(min);
			console.log(max);

			for (let i = min; i <= max; i++) {
				if (bannerData[i].bannerType && bannerData[i].selectedMedia) {
					flag = false; // all banners are consecutive  // false
				} else {
					flag = true; //true
				}
			}
		} else {
			flag = false; //false
		}

		console.log('Position ', flag, '1st banner ', flag2);

		if (flag === false && flag2 === false) {
			return false;
		} else if (flag === true && flag2 === true) {
			return true;
		} else if (flag === true && flag2 === false) {
			return true;
		} else if (flag === false && flag2 === true) {
			return true;
		}
	};

	console.log(handleBannerPositionAndFirstBanner());

	//const publishBannerBtn = handleFirstBanner() && handleBannerPosition();

	// console.log(
	// 	bannerData,
	// 	bannerData[0].bannerType,
	// 	bannerData[0].selectedMedia
	// );

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
					disabled={handleBannerPositionAndFirstBanner()}
					onClick={() => {}}
					text={'PUBLISH HOME BANNERS'}
				/>
			</div>
		</div>
	);
}

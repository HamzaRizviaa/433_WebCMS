import React, { useState } from 'react';
import classes from './_banners.module.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BannerRows from './BannerRows';
import Button from '../button';
import { useEffect } from 'react';

export default function Banners() {
	const [validateRow, setValidateRow] = useState('');
	const [firstCheck, setFirstCheck] = useState('');
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

		// handleBannerPositionAndFirstBanner();
	};
	// - autocomplete ends

	useEffect(() => {
		const firstrowcheck = handleCheckFirstRow();
		const validateRow = handleBannerPositionAndFirstBanner();
		console.log(
			firstrowcheck.rowId,
			firstrowcheck.flag,
			firstrowcheck.errMsg,
			'flag value firstrowcheck'
		);

		setFirstCheck(firstrowcheck);
		setValidateRow(validateRow);
	}, [bannerData]);

	const handleCheckFirstRow = () => {
		let errValidate = { flag: '', rowId: undefined, errMsg: '' };
		if (!bannerData[0].bannerType ^ !bannerData[0].selectedMedia) {
			errValidate = {
				flag: true,
				rowId: 0,
				errMsg: 'The first top banner should always be filled. '
			};
		}
		return errValidate;
	};

	const handleBannerPositionAndFirstBanner = () => {
		let errValidate = { flag: '', rowId: undefined, errMsg: '' };
		// max 4
		// min 1 , can't set 0
		// disabled = true = GREY
		// noy disables = false = YELLOW

		// if (!errValidate.flag) {
		for (let i = 4; i >= 1; i--) {
			// start from max to min
			if (bannerData[i].bannerType && bannerData[i].selectedMedia) {
				//check data in both fields

				if (!bannerData[i - 1].bannerType || !bannerData[i - 1].selectedMedia) {
					// check one up , if data is here
					// console.log('check one up', i);
					errValidate = {
						flag: true,
						rowId: i - 1,
						errMsg: 'The banner ' + i + ' cannot be empty.'
					};
					//not return true
					break;
				}
			} else if (bannerData[i].bannerType || bannerData[i].selectedMedia) {
				// console.log('check both fields', i);
				errValidate = {
					flag: true,
					rowId: i,
					errMsg: ' The banner content cannot be empty.'
				};
				//not return true
				break;
			}
		}
		// }

		return errValidate;
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
									{bannerData.length > 0 &&
										bannerData.map((data, index) => {
											return (
												<BannerRows
													errMsg={
														index === validateRow.rowId && validateRow.errMsg
													}
													firstrow={
														index === firstCheck.rowId && firstCheck.errMsg
													}
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
			{/* <p style={{ fontSize: '35px' }}>{errMsg}</p> */}
			<div className={classes.buttonDiv}>
				<Button
					disabled={
						bannerData[0].bannerType && bannerData[0].selectedMedia
							? validateRow.flag
							: true
					}
					onClick={() => {}}
					text={'PUBLISH HOME BANNERS'}
				/>
			</div>
		</div>
	);
}

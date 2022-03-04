import React, { useState } from 'react';
import classes from './_banners.module.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BannerRows from './BannerRows';
import Button from '../button';
import { useEffect } from 'react';

export default function Banners() {
	const [validateRow, setValidateRow] = useState('');
	const [firstCheck, setFirstCheck] = useState('');
	const [btnDisable, setbtnDisable] = useState('');
	// eslint-disable-next-line no-unused-vars
	const [isDrag, setIsDrag] = useState(false);
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
	//reorder
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
		// setIsDrag(true);
		// isDrag && clickBanner();
	};
	// - autocomplete ends

	//button disable
	useEffect(() => {
		const disableContent = handleBannerPositionAndFirstBanner();
		setbtnDisable(disableContent.flag);
	}, [bannerData]);

	const clickBanner = () => {
		console.log('click banner');
		const firstrowcheck = handleCheckFirstRow(); // 1
		const validateRow = handleBannerPositionAndFirstBanner(); // 2- 5
		// handleCheckFirstRow() && handleBannerPositionAndFirstBanner(); // 2
		setFirstCheck(firstrowcheck);
		setValidateRow(validateRow);
		console.log(validateRow, firstrowcheck, 'post set state');
	};

	const handleCheckFirstRow = () => {
		console.log('click first banner');
		let errValidate = { flag: '', rowId: undefined, errMsg: '' };
		if (!bannerData[0].bannerType ^ !bannerData[0].selectedMedia) {
			errValidate = {
				flag: true,
				rowId: 0,
				errMsg: 'The first top banner should always be filled. '
			};
		} else if (!bannerData[0].bannerType || !bannerData[0].selectedMedia) {
			errValidate = {
				flag: true,
				rowId: 0,
				errMsg: 'The first top banner should always be filled.  '
			};
		}
		return errValidate;
	};

	const handleBannerPositionAndFirstBanner = () => {
		console.log('click other banner');
		let errValidate = { flag: '', rowId: undefined, errMsg: '' };
		// disabled = true = GREY
		// noy disables = false = YELLOW
		for (let i = 4; i >= 1; i--) {
			// start from max to min
			if (bannerData[i].bannerType && bannerData[i].selectedMedia) {
				//check data in both field
				if (!bannerData[i - 1].bannerType || !bannerData[i - 1].selectedMedia) {
					// check one up , if data is here
					errValidate = {
						flag: true,
						rowId: i - 1,
						errMsg: 'The banner cannot be empty.'
					};
					//not return true
					break;
				}
			} else if (bannerData[i].bannerType || bannerData[i].selectedMedia) {
				console.log('check both fields', i);
				errValidate = {
					flag: true,
					rowId: i,
					errMsg: 'The banner content cannot be empty.'
				};
				//not return true
				break;
			}
		}

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
														validateRow.rowId === index ? validateRow : ''
													}
													firstrow={
														index === validateRow.rowId && validateRow
															? ''
															: index === firstCheck.rowId
															? firstCheck
															: ''
													}
													//firstBannerErr={firstBannerErr}
													validateRow={validateRow}
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
							? btnDisable
							: true
					}
					onClick={() => {
						clickBanner();
					}}
					text={'PUBLISH HOME BANNERS'}
				/>
			</div>
		</div>
	);
}

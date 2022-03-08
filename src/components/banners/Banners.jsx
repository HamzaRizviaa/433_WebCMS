import React, { useState } from 'react';
import classes from './_banners.module.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BannerRows from './BannerRows';
import Button from '../button';
import { useEffect } from 'react';

import { getAllBanners } from './../../pages/TopBanner/topBannerSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function Banners() {
	const [validateRow, setValidateRow] = useState(''); //row check 2-5
	const [firstCheck, setFirstRowCheck] = useState(''); //row check 1
	const [btnDisable, setbtnDisable] = useState(false);
	const [bannerData, setBannerData] = useState([
		{
			id: '1',
			banner_type: '',
			content: {}
		},
		{
			id: '2',
			banner_type: '',
			content: {}
		},
		{
			id: '3',
			banner_type: '',
			content: {}
		},
		{
			id: '4',
			banner_type: '',
			content: {}
		},
		{
			id: '5',
			banner_type: '',
			content: {}
		}
	]);

	// useEffect(() => {
	// 	allBanners.map((banner) => {
	// 		setBannerData({
	// 			id: banner.id,
	// 			banner_type: banner.banner_type,
	// 			content: {}
	// 		});
	// 	});
	// }, []);

	const dispatch = useDispatch();
	//get all banners api
	const allBanners = useSelector((state) => state.topBanner.allBanners);
	console.log(allBanners, 'AllBanners');

	useEffect(() => {
		dispatch(getAllBanners());
	}, []);

	useEffect(() => {
		setBannerData(allBanners);
	}, []);
	console.log(bannerData, 'bdT');

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
		setFirstRowCheck({ flag: '', rowId: undefined, errMsg: '' });
		setValidateRow({ flag: '', rowId: undefined, errMsg: '' });
	};
	// - autocomplete ends

	//button disable
	useEffect(() => {
		// disabled = true = GREY
		// noy disables = false = YELLOW
		const disableContent = handleBannerPositionAndFirstBanner();
		setbtnDisable(disableContent.flag);
	}, [bannerData]);

	const clickBanner = () => {
		const firstrowcheck = handleCheckFirstRow(); // 1
		const validateRow = handleBannerPositionAndFirstBanner(); // 2- 5
		setFirstRowCheck(firstrowcheck);
		setValidateRow(validateRow);
		// console.log(validateRow, firstrowcheck, 'post set state');
	};

	const handleCheckFirstRow = () => {
		let errValidate = { flag: '', rowId: undefined, errMsg: '' };
		if (!bannerData[0].banner_type ^ !bannerData[0].content) {
			errValidate = {
				flag: true,
				rowId: 0,
				errMsg: 'The first top banner should always be filled. '
			};
		} else if (!bannerData[0].banner_type || !bannerData[0].content) {
			errValidate = {
				flag: true,
				rowId: 0,
				errMsg: 'The first top banner should always be filled.'
			};
		}
		return errValidate;
	};

	const handleBannerPositionAndFirstBanner = () => {
		let errValidate = { flag: '', rowId: undefined, errMsg: '' };
		for (let i = 4; i >= 1; i--) {
			// start from max to min
			if (bannerData[i]?.banner_type && bannerData[i]?.content) {
				//check data in both field
				if (!bannerData[i - 1].banner_type || !bannerData[i - 1].content) {
					// check one up , if data is here
					errValidate = {
						flag: true,
						rowId: i - 1,
						errMsg: 'The banner  cannot be empty.'
					};
					break;
				}
			} else if (bannerData[i]?.banner_type || bannerData[i]?.content) {
				//check both fields or either
				errValidate = {
					flag: true,
					rowId: i,
					errMsg: 'The banner content cannot be empty.'
				};
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
									{allBanners.length > 0 &&
										allBanners.map((data, index) => {
											return (
												<BannerRows
													otherRowsErrMsg={
														validateRow.rowId === index ? validateRow : ''
													}
													firstrowErrMsg={
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

			<div className={classes.buttonDiv}>
				<Button
					disabled={
						// btnDisable
						bannerData[0]?.banner_type && bannerData[0]?.content
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

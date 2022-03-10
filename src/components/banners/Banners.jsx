import React, { useState } from 'react';
import classes from './_banners.module.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BannerRows from './BannerRows';
import Button from '../button';
import { useEffect } from 'react';
import {
	getAllBanners,
	getBannerContent
} from './../../pages/TopBanner/topBannerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorageDetails } from '../../utils';
import PropTypes from 'prop-types';

import axios from 'axios';
import { toast } from 'react-toastify';

export default function Banners({ tabValue }) {
	const [validateRow, setValidateRow] = useState(''); //row check 2-5
	const [firstCheck, setFirstRowCheck] = useState(''); //row check 1
	const [btnDisable, setbtnDisable] = useState(false);
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

	// emptybarray -> api response -> func obj -> emptyobj , next line map data api s data us object map kr k is main push

	const dispatch = useDispatch();
	const allBanners = useSelector((state) => state.topBanner.allBanners);
	const bannerContent = useSelector((state) => state.topBanner.content);

	useEffect(() => {
		dispatch(getAllBanners(tabValue));
		dispatch(
			getBannerContent({
				type: tabValue,
				title: null
			})
		);
	}, []);

	useEffect(() => {
		updateBannerObject();
	}, [allBanners]);

	useEffect(() => {
		setBannerData([
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
	}, [tabValue]);

	//get banners from get api and map on your own data
	const updateBannerObject = () => {
		let _filterData = [];
		_filterData = allBanners.map((data) => {
			return {
				// ...bannerData,
				id: data.id,
				bannerType: data.banner_type,
				selectedMedia: data.content
			};
		});

		// filter length
		let length = _filterData.length;
		//arr.splice(index of the item to be removed, number of elements to be removed) // rest of the filter DATA
		bannerData.splice(0, length);
		setBannerData([..._filterData, ...bannerData]);
		setbtnDisable(true);
	};

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

		allBanners.map((banner, index) => {
			// console.log(banner, 'banner');
			// console.log(bannerData[index], 'bd');
			if (
				banner?.banner_type === bannerData[index]?.bannerType &&
				banner?.content?.title === bannerData[index]?.selectedMedia?.title
			) {
				// console.log('jajaj');
				return true; // grey
			} else {
				// console.log('kakak');
				const disableContent = handleBannerPositionAndFirstBanner();
				setbtnDisable(disableContent.flag);
			}
		});
	}, [bannerData]);

	const clickBanner = () => {
		const firstrowcheck = handleCheckFirstRow(); // 1
		const validateRow = handleBannerPositionAndFirstBanner(); // 2- 5
		setFirstRowCheck(firstrowcheck);
		setValidateRow(validateRow);

		if (!firstrowcheck?.flag && !validateRow?.flag) {
			// Validating whether post button is diabled OR not
			uploadBanner();
		}
	};

	const uploadBanner = async () => {
		let bannerPayload = [];
		// to post banners , map your own data to api payload data as in docs
		bannerPayload = bannerData.map((data, index) => {
			return {
				// ...bannerData,
				banner_type: data.bannerType,
				content: data.selectedMedia,
				banner_id:
					data?.id === '1' ||
					data?.id === '2' ||
					data?.id === '3' ||
					data?.id === '4' ||
					data?.id === '5'
						? null
						: data?.id,
				sort_order: index
			};
		});
		console.log(bannerPayload, bannerData);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/top-banner/publish-banner`,
				{
					banners: bannerPayload,
					type: tabValue
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);

			console.log(result);
			if (result?.data?.status_code === 200) {
				toast.success('banner has been created!');
				dispatch(getAllBanners(tabValue));
			}
		} catch (error) {
			toast.error('Failed to add a new banner');
			console.log(error);
		}
	};

	const handleCheckFirstRow = () => {
		let errValidate = { flag: '', rowId: undefined, errMsg: '' };
		if (!bannerData[0]?.bannerType ^ !bannerData[0]?.selectedMedia) {
			errValidate = {
				flag: true,
				rowId: 0,
				errMsg: 'The first top banner should always be filled. '
			};
		} else if (!bannerData[0]?.bannerType || !bannerData[0]?.selectedMedia) {
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
			if (bannerData[i]?.bannerType && bannerData[i]?.selectedMedia) {
				//check data in both field
				if (
					!bannerData[i - 1]?.bannerType ||
					!bannerData[i - 1]?.selectedMedia
				) {
					// check one up , if data is here
					errValidate = {
						flag: true,
						rowId: i - 1,
						errMsg: 'The banner  cannot be empty.'
					};
					break;
				}
			} else if (bannerData[i]?.bannerType || bannerData[i]?.selectedMedia) {
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
									{bannerData.length > 0 &&
										bannerData.map((data, index) => {
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
													setBannerData={setBannerData} //?
													bannerContent={bannerContent}
													key={data.id}
													provided={provided}
													index={index}
													tabValue={tabValue}
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

						bannerData[0]?.bannerType && bannerData[0]?.selectedMedia
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

Banners.propTypes = {
	tabValue: PropTypes.string
};

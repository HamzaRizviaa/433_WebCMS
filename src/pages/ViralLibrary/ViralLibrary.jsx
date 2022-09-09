/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef, useRef } from 'react';
import Layout from '../../components/layout';
import Table from '../../components/table';
// import classes from './_viralLibrary.module.scss';
import Button from '../../components/button';
import UploadOrEditViral from '../../components/virals/uploadOrEditViral';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { getDateTime, formatDate, getCalendarText } from '../../utils';
import { ReactComponent as Search } from '../../assets/SearchIcon.svg';
import { ReactComponent as Calendar } from '../../assets/Calendar.svg';
import { Markup } from 'interweave';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DefaultImage from '../../assets/defaultImage.png';
import { useNavigate } from 'react-router-dom';

import {
	getAllViralsApi,
	resetCalendarError,
	resetNoResultStatus,
	getSpecificViral
} from './viralLibararySlice';
import { getAllNewLabels } from '../PostLibrary/postLibrarySlice';

import Four33Loader from '../../assets/Loader_Yellow.gif';
import LoadingOverlay from 'react-loading-overlay';
import { useStyles as globalUseStyles } from '../../styles/global.style';
import CustomPagination from '../../components/ui/Pagination';
import { PaginationContext } from '../../utils/context';

const ViralLibrary = () => {
	// Selectors
	const virals = useSelector((state) => state.ViralLibraryStore.virals);
	const viralsApiStatus = useSelector((state) => state.ViralLibraryStore);
	const totalRecords = useSelector(
		(state) => state.ViralLibraryStore.totalRecords
	);

	const noResultStatus = useSelector(
		(state) => state.ViralLibraryStore.noResultStatus
	);
	const noResultStatusCalendar = useSelector(
		(state) => state.ViralLibraryStore.noResultStatusCalendar
	);

	const classes = globalUseStyles();
	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [sortState, setSortState] = useState({ sortby: '', order_type: '' });
	const [paginationError, setPaginationError] = useState(false);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [noResultBorder, setNoResultBorder] = useState('#404040');
	const [noResultError, setNoResultError] = useState('');
	const [noResultCalendarBorder, setNoResultCalendarBorder] =
		useState('#404040');
	const [noResultCalendarError, setNoResultCalendarError] = useState('');
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;
	const [tooltipTitle, setTooltipTitle] = useState(false);
	const [rowStatus, setrowStatus] = useState(''); //publish or draft
	const fileNameRef = useRef(null);

	const navigate = useNavigate();

	useEffect(() => {
		let expiry_date = Date.parse(localStorage.getItem('token_expire_time'));
		let current_date = new Date();
		let time_difference_minutes = (expiry_date - current_date) / 1000 / 60; //in minutes
		// console.log(current_date, 'curr');
		// console.log(time_difference_minutes);
		if (time_difference_minutes <= 1) {
			alert('Your session has expired');
			localStorage.removeItem('user_data');
			localStorage.removeItem('token_expire_time');
			navigate('/sign-in');
		}
	}, []);

	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
		const startDate = formatDate(dateRange[0]);
		const endDate = formatDate(dateRange[1]);
		return (
			<div
				className={classes.customDateInput}
				onClick={onClick}
				ref={ref}
				style={{ borderColor: noResultCalendarBorder }}
			>
				{getCalendarText(startDate, endDate)}
				<span
					style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
				>
					<Calendar
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							if (startDate && endDate) {
								dispatch(
									getAllViralsApi({
										q: search,
										page,
										startDate,
										endDate,
										fromCalendar: true,
										...sortState
									})
								);
							} else {
								dispatch(
									getAllViralsApi({
										q: search,
										page,
										fromCalendar: true,
										...sortState
									})
								);
							}
						}}
					/>
				</span>
			</div>
		);
	});

	const dispatch = useDispatch();

	const sortKeysMapping = {
		viral: 'viral',
		post_date: 'postdate',
		last_edit: 'lastedit',
		labels: 'label',
		user: 'user',
		status: 'status'
	};

	const sortRows = (order, col) => {
		if (order && col.dataField) {
			if (
				order.toUpperCase() != sortState.order_type ||
				sortKeysMapping[col.dataField] != sortState.sortby
			) {
				setSortState({
					sortby: sortKeysMapping[col.dataField],
					order_type: order.toUpperCase()
				});
			}
		}
		if (!order)
			return (
				<ArrowDropUpIcon
					className={classes.sortIcon}
					style={{
						left:
							col?.dataField === 'user' || col?.dataField === 'last_edit'
								? 7
								: col?.dataField === 'status'
								? 25
								: -4,
						bottom: '1.5px'
					}}
				/>
			);
		else if (order === 'asc')
			return (
				<ArrowDropUpIcon
					className={classes.sortIconSelected}
					style={{
						left:
							col?.dataField === 'user' || col?.dataField === 'last_edit'
								? 7
								: col?.dataField === 'status'
								? 25
								: -4,
						bottom: '1.5px'
					}}
				/>
			);
		else if (order === 'desc')
			return (
				<ArrowDropDownIcon
					className={classes.sortIconSelected}
					style={{
						left:
							col?.dataField === 'user' || col?.dataField === 'last_edit'
								? 7
								: col?.dataField === 'status'
								? 25
								: -4,
						bottom: '1.5px'
					}}
				/>
			);
		return null;
	};

	const columns = [
		{
			dataField: 'viral',
			text: 'VIRAL',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			formatter: (content, row) => {
				//console.log(content, row); classes.mediaWrapper
				return (
					<div
						className={
							row.height < row.width
								? classes.virallandscape
								: // : row.width > row.height
								  // ? classes.viralpotrait
								  classes.mediaWrapper
						}
					>
						<Tooltip
							// TransitionComponent={Fade}
							// TransitionProps={{ timeout: 600 }}

							title={
								row?.thumbnail_url ? (
									<video
										id={'my-video'}
										poster={row.thumbnail_url}
										autoPlay
										muted
										className={
											row.width > row.height + 200
												? classes.virallandscapePreview
												: row.height > row.width + 200
												? classes.mediaIconPortraitPreview
												: classes.mediaIconPreview
										}
										controls={true}
									>
										<source
											src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${row?.media}`}
										/>
									</video>
								) : (
									<img
										className={
											row.width === row.height
												? classes.mediaIconPreview
												: row.width > row.height
												? classes.virallandscapePreview
												: classes.mediaIconPortraitPreview
										}
										src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
											row?.thumbnail_url ? row?.thumbnail_url : row?.media
										}`}
										alt='no img'
										onError={(e) => (
											(e.target.onerror = null), (e.target.src = DefaultImage)
										)}
									/>
								)
							}
							placement='right'
							componentsProps={{
								tooltip: { className: classes.toolTipPreview }
							}}
						>
							<span>
								{/* {row?.thumbnail_url ? (
									<PlayArrowIcon className={classes.playIcon} />
								) : (
									''
								)} */}

								{row?.thumbnail_url && (
									<PlayArrowIcon className={classes.libraryPlayIcon} />
								)}
								<img
									className={classes.mediaIcon}
									src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
										row?.thumbnail_url ? row?.thumbnail_url : row?.media
									}`}
									onError={(e) => (
										(e.target.onerror = null), (e.target.src = DefaultImage)
									)}
								/>
							</span>
						</Tooltip>
						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={
								<Markup
									content={tooltipTitle ? row?.file_name : row?.file_name}
									// content={
									// 	row?.file_name?.includes('...') ? row?.file_name : ''
									// }
								/>
							}
							arrow
							componentsProps={{
								tooltip: { className: classes.libraryToolTip },
								arrow: { className: classes.libraryToolTipArrow }
							}}
						>
							<div ref={fileNameRef} className={classes.viralFileName}>
								<Markup
									className={classes.viralFileName}
									content={row.file_name}
								/>
							</div>
						</Tooltip>
					</div>
				);
			}
		},
		{
			dataField: 'post_date',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'POST DATE | TIME',
			formatter: (content) => {
				return <div className={classes.viralRow}>{getDateTime(content)}</div>;
			}
		},
		{
			dataField: 'labels',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'LABELS',
			formatter: (content) => {
				let secondLabel = content[1] !== undefined ? `, ${content[1]}` : '';
				return (
					// <div className={classes.labelsWrapper}>
					// 	{`${content[0]} ${secondLabel}`}
					// </div>
					<Markup
						className={classes.viralRow}
						content={`${content[0]} ${secondLabel}`}
					/>
				);
			}
		},
		{
			dataField: 'user',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'USER',
			formatter: (content) => {
				return <Markup className={classes.viralRow} content={`${content}`} />;
			},
			headerStyle: () => {
				return { paddingLeft: '30px' };
			}
		},
		{
			dataField: 'last_edit',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'LAST EDIT',
			formatter: (content) => {
				return <div className={classes.viralRow}>{getDateTime(content)}</div>;
			},
			headerStyle: () => {
				return { paddingLeft: '30px' };
			}
		},
		{
			dataField: 'status',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'STATUS',
			formatter: (content) => {
				return (
					<div className={`${classes.publish_draft_btn}`}>
						<Button
							onClick={() => {}}
							text={content == 'published' ? 'PUBLISHED' : 'DRAFT'}
							published={content == 'published' ? true : false}
						/>
					</div>
				);
			},
			headerStyle: () => {
				return { paddingLeft: '48px' };
			}
		},
		{
			dataField: 'options',
			text: 'OPTIONS',
			formatter: () => {
				return (
					<div className={classes.viralRow}>
						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={'EDIT VIRAL'}
							arrow
							componentsProps={{
								tooltip: { className: classes.libraryToolTip },
								arrow: { className: classes.libraryToolTipArrow }
							}}
						>
							<Edit className={classes.editIcon} />
						</Tooltip>
					</div>
				);
			}
		}
	];

	const tableRowEvents = {
		onClick: (e, row) => {
			row.status === 'draft' && dispatch(getAllNewLabels());
			dispatch(getSpecificViral(row.id));
			setEdit(true);
			setrowStatus(row.status); // pass in slider
			setShowSlider(true);
		}
	};

	useEffect(() => {
		if (sortState.sortby && sortState.order_type && !search) {
			dispatch(
				getAllViralsApi({
					page,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		}
		if (sortState.sortby && sortState.order_type && search) {
			dispatch(
				getAllViralsApi({
					q: search,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					page,
					...sortState
				})
			);
		}
	}, [sortState]);

	useEffect(() => {
		if (search) {
			dispatch(
				getAllViralsApi({
					q: search,
					page,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		} else {
			dispatch(
				getAllViralsApi({
					page,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		}
	}, [page]);

	useEffect(() => {
		if (noResultStatus) {
			setNoResultBorder('#FF355A');
			setNoResultError('No Results Found');
			setTimeout(() => {
				dispatch(resetNoResultStatus());
				setNoResultBorder('#404040');
				setNoResultError('');
			}, [5000]);
		}
	}, [noResultStatus]);

	useEffect(() => {
		if (noResultStatusCalendar) {
			setNoResultCalendarBorder('#FF355A');
			setNoResultCalendarError('No Results Found');
			setTimeout(() => {
				dispatch(resetCalendarError());
				setNoResultCalendarBorder('#404040');
				setNoResultCalendarError('');
			}, [5000]);
		}
	}, [noResultStatusCalendar]);

	useEffect(() => {
		return () => {
			setNoResultBorder('#404040');
			setNoResultError('');
			setNoResultCalendarBorder('#404040');
			setNoResultCalendarError('');
			dispatch(resetCalendarError());
			dispatch(resetNoResultStatus());
		};
	}, []);

	return (
		<PaginationContext.Provider value={[ page, setPage, paginationError, setPaginationError ]}>
		<LoadingOverlay
			active={viralsApiStatus.status === 'pending' ? true : false}
			// spinner={<LogoSpinner className={classes._loading_overlay_spinner} />}
			spinner={
				<img
					src={Four33Loader}
					className={classes.libraryLoader}
					alt='loader'
				/>
			}
		>
			<Layout>
				<div className={classes.header}>
					<div className={classes.subheader1}>
						<h1 style={{ marginRight: '2rem' }}>VIRAL LIBRARY</h1>
						<Button
							onClick={() => {
								// dispatch(getPostLabels());
								dispatch(getAllNewLabels());
								setEdit(false);
								setShowSlider(true);
							}}
							text={'UPLOAD VIRAL'}
						/>
					</div>
					<div className={classes.subheader2}>
						<div>
							<TextField
								className={classes.searchField}
								value={search}
								onKeyPress={(e) => {
									if (e.key === 'Enter' && search) {
										dispatch(
											getAllViralsApi({
												q: search,
												page,
												startDate: formatDate(dateRange[0]),
												endDate: formatDate(dateRange[1]),
												...sortState
											})
										);
									} else if (e.key === 'Enter' && !search) {
										dispatch(
											getAllViralsApi({
												page,
												startDate: formatDate(dateRange[0]),
												endDate: formatDate(dateRange[1]),
												...sortState
											})
										);
									}
								}}
								onChange={(e) => {
									setSearch(e.target.value);
									//setIsSearch(true);
								}}
								placeholder={'Search viral, user, label'}
								InputProps={{
									disableUnderline: true,
									className: classes.textFieldInput,
									style: { borderColor: noResultBorder },
									endAdornment: (
										<InputAdornment>
											<Search
												onClick={() => {
													if (search) {
														dispatch(
															getAllViralsApi({
																q: search,
																page,
																startDate: formatDate(dateRange[0]),
																endDate: formatDate(dateRange[1]),
																...sortState
															})
														);
													} else {
														dispatch(
															getAllViralsApi({
																page,
																startDate: formatDate(dateRange[0]),
																endDate: formatDate(dateRange[1]),
																...sortState
															})
														);
													}
												}}
												className={classes.searchIcon}
											/>
										</InputAdornment>
									)
								}}
							/>
							<p className={classes.noResultError}>{noResultError}</p>
						</div>
						<div className={classes.calendarWrapper}>
							<DatePicker
								customInput={<ExampleCustomInput />}
								selectsRange={true}
								startDate={startDate}
								endDate={endDate}
								maxDate={new Date()}
								onChange={(update) => {
									setDateRange(update);
								}}
								placement='center'
								isClearable={true}
							/>
							<p className={classes.noResultError}>{noResultCalendarError}</p>
						</div>
					</div>
				</div>
				<div className={classes.tableContainer}>
					<Table rowEvents={tableRowEvents} columns={columns} data={virals} />
				</div>
				<CustomPagination totalRecords={totalRecords} page={page} paginationError={paginationError} />

				<UploadOrEditViral
					open={showSlider}
					isEdit={edit}
					handleClose={() => {
						setShowSlider(false);
						// setTimeout(() => setEdit(false), 300); //to show edit data after clicking second time
					}}
					title={edit ? 'Edit Viral' : 'Upload Viral'}
					heading1={edit ? 'Media File' : 'Add Media File'}
					page={page}
					buttonText={
						edit && rowStatus === 'published' ? 'SAVE CHANGES' : 'PUBLISH'
					}
					status={rowStatus}
				/>
			</Layout>
		</LoadingOverlay>
		</PaginationContext.Provider>
	);
};

export default ViralLibrary;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { Markup } from 'interweave';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout';
import Table from '../../components/table';
import Button from '../../components/button';
import LoadingOverlay from 'react-loading-overlay';
import { useStyles } from './../../utils/styles';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Pagination from '@mui/material/Pagination';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useStyles as globalUseStyles } from '../../styles/global.style';
import { getDateTime, formatDate, getCalendarText } from '../../utils';
import { ReactComponent as Search } from '../../assets/SearchIcon.svg';
import { ReactComponent as Calendar } from '../../assets/Calendar.svg';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import { ReactComponent as MenuIcon } from '../../assets/Union.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import DefaultImage from '../../assets/defaultImage.png';
import Four33Loader from '../../assets/Loader_Yellow.gif';
import Tooltip from '@mui/material/Tooltip';

import Fade from '@mui/material/Fade';
import UploadOrEditNews from '../../components/news/uploadOrEditNews';

// Api calls
import {
	getAllNews,
	getSpecificNews,
	resetCalendarError,
	resetNoResultStatus
} from './newsLibrarySlice';

import { getAllNewLabels } from '../PostLibrary/postLibrarySlice';

const NewsLibrary = () => {
	// Selectors
	const allNews = useSelector((state) => state.NewsLibrary.news);
	const newsApiStatus = useSelector((state) => state.NewsLibrary);
	const totalRecords = useSelector((state) => state.NewsLibrary.totalRecords);
	const noResultStatus = useSelector(
		(state) => state.NewsLibrary.noResultStatus
	);
	const noResultStatusCalendar = useSelector(
		(state) => state.NewsLibrary.noResultStatusCalendar
	);

	const muiClasses = useStyles();
	const classes = globalUseStyles();
	const navigate = useNavigate();
	const fileNameRef = useRef(null);

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

	useEffect(() => {
		let expiry_date = Date.parse(localStorage.getItem('token_expire_time'));
		let current_date = new Date();
		let time_difference_minutes = (expiry_date - current_date) / 1000 / 60; //in minutes
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
									getAllNews({
										q: search,
										page,
										startDate,
										endDate,
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
		media: 'media',
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
			dataField: 'media',
			text: 'MEDIA',
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
						{row.total_slides > 1 ? (
							<MenuIcon
								style={{ marginRight: '10px', height: '20px', width: '20px' }}
							/>
						) : (
							<div
								style={{ marginRight: '10px', height: '20px', width: '20px' }}
							></div>
						)}
						<Tooltip
							// TransitionComponent={Fade}
							// TransitionProps={{ timeout: 600 }}

							title={
								<img
									className={
										row.width === row.height
											? classes.mediaIconPreview
											: row.width > row.height
											? classes.virallandscapePreview
											: classes.mediaIconPortraitPreview
									}
									src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
										row?.media || row?.image
									}`}
									alt='no img'
									onError={(e) => (
										(e.target.onerror = null), (e.target.src = DefaultImage)
									)}
								/>
							}
							placement='right'
							componentsProps={{
								tooltip: { className: classes.toolTipPreview }
							}}
						>
							<span>
								<img
									className={classes.mediaIcon}
									src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
										row?.media || row?.image
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
							<div ref={fileNameRef} className={classes.newsFileName}>
								<Markup
									className={classes.newsFileName}
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
			dataField: 'options',
			text: 'OPTIONS',
			formatter: () => {
				return (
					<div className={classes.viralRow}>
						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 700 }}
							title={'EDIT NEWS'}
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
			dispatch(getSpecificNews(row.id));
			setEdit(true);
			setrowStatus(row.status); // pass in slider
			setShowSlider(true);
		}
	};

	const handleChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		if (sortState.sortby && sortState.order_type && !search) {
			dispatch(
				getAllNews({
					page,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		}
		if (sortState.sortby && sortState.order_type && search) {
			dispatch(
				getAllNews({
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
				getAllNews({
					q: search,
					page,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		} else {
			dispatch(
				getAllNews({
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

	const handleDateChange = (dateRange) => {
		setDateRange(dateRange);

		const [start, end] = dateRange;

		if (!start && !end) {
			dispatch(
				getAllNews({
					q: search,
					page,
					...sortState
				})
			);
		}
	};

	return (
		<LoadingOverlay
			active={newsApiStatus.status === 'pending' ? true : false}
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
						<h1 style={{ marginRight: '2rem' }}>NEWS LIBRARY</h1>
						<Button
							onClick={() => {
								dispatch(getAllNewLabels());
								setEdit(false);
								setShowSlider(true);
							}}
							text={'UPLOAD NEWS'}
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
											getAllNews({
												q: search,
												page,
												startDate: formatDate(dateRange[0]),
												endDate: formatDate(dateRange[1]),
												...sortState
											})
										);
									} else if (e.key === 'Enter' && !search) {
										dispatch(
											getAllNews({
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
								placeholder='Search for News, User, Label, ID'
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
															getAllNews({
																q: search,
																page,
																startDate: formatDate(dateRange[0]),
																endDate: formatDate(dateRange[1]),
																...sortState
															})
														);
													} else {
														dispatch(
															getAllNews({
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
								onChange={handleDateChange}
								placement='center'
								isClearable={true}
							/>
							<p className={classes.noResultError}>{noResultCalendarError}</p>
						</div>
					</div>
				</div>
				<div className={classes.tableContainer}>
					<Table rowEvents={tableRowEvents} columns={columns} data={allNews} />
				</div>

				<div className={classes.paginationRow}>
					<Pagination
						className={muiClasses.root}
						page={page}
						onChange={handleChange}
						count={Math.ceil(totalRecords / 20)}
						variant='outlined'
						shape='rounded'
					/>
					<div className={classes.gotoText}>Go to page</div>
					<input
						style={{
							border: `${
								paginationError ? '1px solid red' : '1px solid #808080'
							}`
						}}
						type={'number'}
						min={1}
						onChange={(e) => {
							setPaginationError(false);
							const value = Number(e.target.value);
							if (value > Math.ceil(totalRecords / 20)) {
								// if (value > Math.ceil(60 / 20)) {
								setPaginationError(true);
								setPage(1);
							} else if (value) {
								setPage(value);
							} else {
								setPage(1);
							}
						}}
						className={classes.gotoInput}
					/>
				</div>

				<UploadOrEditNews
					open={showSlider}
					isEdit={edit}
					handleClose={() => {
						setShowSlider(false);
						// setTimeout(() => setEdit(false), 300); //to show edit data after clicking second time
					}}
					title={edit ? 'Edit News' : 'Upload News'}
					page={page}
					buttonText={
						edit && rowStatus === 'published' ? 'SAVE CHANGES' : 'PUBLISH'
					}
					status={rowStatus}
				/>
			</Layout>
		</LoadingOverlay>
	);
};

export default NewsLibrary;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Markup } from 'interweave';
import _debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
	getPosts,
	resetCalendarError,
	resetNoResultStatus,
	getSpecificPost
} from './postLibrarySlice';

// CSS / Material UI
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Pagination from '@mui/material/Pagination';
import classes from './_postLibrary.module.scss';
import './_calender.scss';

// Utils
import { getDateTime, formatDate, getCalendarText } from '../../utils';
import { useStyles, useStyles2 } from './../../utils/styles';

// Components
import UploadOrEditPost from '../../components/posts/uploadOrEditPost';
import Button from '../../components/button';
import Layout from '../../components/layout';
import Table from '../../components/table';

// Icons
import { ReactComponent as Edit } from '../../assets/edit.svg';
import { ReactComponent as Search } from '../../assets/SearchIcon.svg';
import { ReactComponent as Calendar } from '../../assets/Calendar.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Four33Loader from '../../assets/Loader_Yellow.gif';
import LoadingOverlay from 'react-loading-overlay';
const PostLibrary = () => {
	const muiClasses = useStyles();
	const muiClasses2 = useStyles2();

	// Selectors
	const posts = useSelector((state) => state.postLibrary.posts);
	const statusApi = useSelector((state) => state.postLibrary);
	const totalRecords = useSelector((state) => state.postLibrary.totalRecords);
	const noResultStatus = useSelector(
		(state) => state.postLibrary.noResultStatus
	);
	const noResultStatusCalendar = useSelector(
		(state) => state.postLibrary.noResultStatusCalendar
	);

	// State

	const [page, setPage] = useState(1);
	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [paginationError, setPaginationError] = useState(false);
	const [sortState, setSortState] = useState({ sortby: '', order_type: '' });
	const [search, setSearch] = useState('');
	const [noResultBorder, setNoResultBorder] = useState('#404040');
	const [noResultError, setNoResultError] = useState('');
	const [noResultCalendarBorder, setNoResultCalendarBorder] =
		useState('#404040');
	const [noResultCalendarError, setNoResultCalendarError] = useState('');
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;

	const navigate = useNavigate();

	useEffect(() => {
		let expiry_date = Date.parse(localStorage.getItem('token_expire_time'));
		let current_date = new Date();
		let time_difference_minutes = (expiry_date - current_date) / 1000 / 60; //in minutes
		// console.log(current_date, 'curr');
		console.log(time_difference_minutes);
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
								//start end search
								dispatch(
									//api calls dispatch
									getPosts({
										q: search,
										page: 1,
										startDate, //start end search
										endDate,
										fromCalendar: true,
										...sortState
									})
								);
							} else {
								dispatch(
									getPosts({
										q: search,
										page: 1,
										fromCalendar: true,
										...sortState
									})
								);
							}
							setPage(1);
						}}
					/>
				</span>
			</div>
		);
	});

	const dispatch = useDispatch();

	const handleChange = (event, value) => {
		setPage(value);
	};

	const sortKeysMapping = {
		file_name: 'media',
		post_date: 'postdate',
		labels: 'label',
		user: 'user',
		last_edit: 'lastedit'
	};

	useEffect(() => {
		//sort from backend
		if (sortState.sortby && sortState.order_type && !search) {
			dispatch(
				getPosts({
					page,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		}
		if (sortState.sortby && sortState.order_type && search) {
			dispatch(
				getPosts({
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
				getPosts({
					q: search,
					page,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		} else {
			dispatch(
				getPosts({
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

	useEffect(() => {
		//page switch and get scroll on top
		let tableBody = document.getElementsByTagName('tbody')[0];
		if (tableBody) {
			tableBody.scrollTop = 0;
		}
	}, [page]);

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
		if (!order) return <ArrowDropUpIcon className={classes.sortIcon} />;
		else if (order === 'asc')
			return <ArrowDropUpIcon className={classes.sortIconSelected} />;
		else if (order === 'desc')
			return <ArrowDropDownIcon className={classes.sortIconSelected} />;
		return null;
	};

	const columns = [
		{
			dataField: 'file_name',
			text: 'MEDIA',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			formatter: (content, row) => {
				//console.log(row, content, 'post library');
				return (
					<div
						className={
							row.orientation_type === 'landscape'
								? classes.mediaWrapperLandscape
								: classes.mediaWrapper
						}
					>
						<Tooltip
							// TransitionComponent={Fade}
							// TransitionProps={{ timeout: 600 }}
							title={
								row?.thumbnail_url ? (
									<video
										id={'my-video'}
										//poster={row.thumbnail_url}
										autoPlay
										muted
										className={
											row?.orientation_type === 'square'
												? classes.mediaIconPreview
												: row?.orientation_type === 'landscape'
												? classes.mediaIconLandscapePreview
												: classes.mediaIconPortraitPreview
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
											row?.orientation_type === 'square'
												? classes.mediaIconPreview
												: row?.orientation_type === 'landscape'
												? classes.mediaIconLandscapePreview
												: classes.mediaIconPortraitPreview
										}
										src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
											row?.thumbnail_url ? row?.thumbnail_url : row?.media
										}`}
										alt='no img'
									/>
								)
							}
							placement='right'
							componentsProps={{
								tooltip: { className: classes.toolTipPreview }
							}}
						>
							<span>
								{row?.thumbnail_url ? (
									<PlayArrowIcon
										className={
											row?.orientation_type === 'portrait'
												? classes.playIconPortrait
												: classes.playIcon
										}
									/>
								) : (
									<></>
								)}

								<img
									className={
										row?.orientation_type === 'square'
											? classes.mediaIcon
											: row?.orientation_type === 'landscape'
											? classes.mediaIconLandscape
											: classes.mediaIconPortrait
									}
									src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
										row?.thumbnail_url ? row?.thumbnail_url : row?.media
									}`}
								/>
							</span>
						</Tooltip>

						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={
								<Markup
									content={row?.file_name?.length > 13 ? row?.file_name : ''}
								/>
							}
							arrow
							componentsProps={{
								tooltip: { className: classes.toolTip },
								arrow: { className: classes.toolTipArrow }
							}}
						>
							<div>
								<Markup className={classes.fileName} content={row?.file_name} />
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
				return <div className={classes.row}>{getDateTime(content)}</div>;
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
					//<div className={classes.row}>{content[0] + `, ` + content[1]}</div>
					<Markup
						className={classes.row}
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
				return (
					//<div className={classes.row}>{content}</div>
					<Markup className={classes.row} content={`${content}`} />
				);
			}
		},
		{
			dataField: 'last_edit',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'LAST EDIT',
			formatter: (content) => {
				return <div className={classes.row}>{getDateTime(content)}</div>;
			}
		},
		{
			dataField: 'options',
			text: 'OPTIONS',
			formatter: () => {
				return (
					<div className={classes.row}>
						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={'EDIT POST'}
							arrow
							componentsProps={{
								tooltip: { className: classes.toolTip },
								arrow: { className: classes.toolTipArrow }
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
			// if (!edit) {
			dispatch(getSpecificPost(row.id));
			setEdit(true);
			setShowSlider(true);
			// }
		}
	};

	const handleDebounceFun = () => {
		let _search;
		setSearch((prevState) => {
			_search = prevState;
			return _search;
		});
		if (_search) {
			dispatch(
				getPosts({
					q: _search,
					page: 1,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		} else {
			dispatch(
				getPosts({
					page: 1,
					startDate: formatDate(dateRange[0]),
					endDate: formatDate(dateRange[1]),
					...sortState
				})
			);
		}
		setPage(1);
	};

	const debounceFun = useCallback(_debounce(handleDebounceFun, 1000), []);

	const handleChangeSearch = (e) => {
		setSearch(e.target.value);
		debounceFun(e.target.value);
	};

	return (
		<LoadingOverlay
			active={statusApi.status === 'pending' ? true : false}
			// spinner={<LogoSpinner className={classes._loading_overlay_spinner} />}
			spinner={
				<img src={Four33Loader} className={classes.loader} alt='loader' />
			}
		>
			<Layout>
				<div className={classes.header}>
					<div className={classes.subheader1}>
						<h1 style={{ marginRight: '2rem' }}>POST LIBRARY</h1>
						<Button
							onClick={() => {
								setEdit(false);
								setShowSlider(true);
							}}
							text={'UPLOAD POST'}
						/>
					</div>
					<div className={classes.subheader2}>
						<div>
							<TextField
								className={`${classes.searchField} ${muiClasses2.root}`}
								value={search}
								// onKeyPress={(e) => {
								// 	if (e.key === 'Enter' && search) {
								// 		dispatch(
								// 			getPosts({
								// 				q: search,
								// 				page,
								// 				startDate: formatDate(dateRange[0]),
								// 				endDate: formatDate(dateRange[1]),
								// 				...sortState
								// 			})
								// 		);
								// 	} else if (e.key === 'Enter' && !search) {
								// 		dispatch(
								// 			getPosts({
								// 				page,
								// 				startDate: formatDate(dateRange[0]),
								// 				endDate: formatDate(dateRange[1]),
								// 				...sortState
								// 			})
								// 		);
								// 	}
								// }}
								// onChange={(e) => {
								// 	setSearch(e.target.value);
								// 	//setIsSearch(true);
								// }}
								onChange={handleChangeSearch}
								placeholder={'Search post, user, label'}
								InputProps={{
									disableUnderline: true,
									className: classes.textFieldInput,
									style: { borderColor: noResultBorder },
									endAdornment: (
										<InputAdornment>
											<Search className={classes.searchIcon} />
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
					<Table rowEvents={tableRowEvents} columns={columns} data={posts} />
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
				<UploadOrEditPost
					open={showSlider}
					isEdit={edit}
					handleClose={() => {
						setShowSlider(false);
						// setTimeout(() => setEdit(false), 600);
					}}
					title={edit ? 'Edit Post' : 'Upload a Post'}
					heading1={edit ? 'Media Files' : 'Add Media Files'}
					buttonText={edit ? 'SAVE CHANGES' : 'POST'}
				/>

				{/* <Popup  closePopup={closeThePop} open={popped} title={'Upload a Post'}/> :   */}
			</Layout>
		</LoadingOverlay>
	);
};

export default PostLibrary;

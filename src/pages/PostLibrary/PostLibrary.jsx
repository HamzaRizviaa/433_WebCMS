/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { ReactComponent as Edit } from '../../assets/edit.svg';
import { ReactComponent as Search } from '../../assets/SearchIcon.svg';
import { ReactComponent as Calendar } from '../../assets/Calendar.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Button from '../../components/button';
import Layout from '../../components/layout';
import Table from '../../components/table';
import classes from './_postLibrary.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './postLibrarySlice';
import { getSpecificPost } from '../../components/posts/uploadOrEditPost/editButtonSlice';
import moment from 'moment';
import UploadOrEditPost from '../../components/posts/uploadOrEditPost';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Markup } from 'interweave';

import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import './_calender.scss';

const getDateTime = (dateTime) => {
	let formatted = new Date(dateTime);
	return `${moment(formatted).format(
		'DD-MM-YYYY'
	)} | ${formatted.toLocaleTimeString('en-US', {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit'
	})}`;
};

const useStyles = makeStyles(() => ({
	root: {
		'& .MuiPagination-ul': {
			display: 'flex',
			justifyContent: 'flex-end',
			'& > li:first-child': {
				'& button': {
					borderRadius: '8px',
					border: '1px solid #808080',
					width: '32',
					height: '32',
					color: 'white'
				}
			},
			'& > li:last-child': {
				'& button': {
					borderRadius: '8px',
					border: '1px solid #808080',
					width: '32',
					height: '32',
					color: 'white'
				}
			}
		},
		'& .Mui-selected': {
			backgroundColor: 'transparent !important',
			color: 'yellow',
			border: '1px solid yellow',
			borderRadius: '8px',
			fontSize: '12px',
			fontWeight: '700',
			lineHeight: '16px',
			letterSpacing: '0.03em'
		},
		'& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)':
			{
				background: 'transparent',
				border: '1px solid #808080',
				color: '#ffffff',
				height: '32px',
				width: '32px',
				borderRadius: '8px',
				fontSize: '12px',
				fontWeight: '700',
				lineHeight: '16px',
				letterSpacing: '0.03em'
			},
		'& .MuiPaginationItem-ellipsis': {
			color: '#ffffff',
			fontSize: '12px',
			fontWeight: '700',
			lineHeight: '16px',
			letterSpacing: '0.03em'
		}
	}
}));

const PostLibrary = () => {
	const muiClasses = useStyles();
	const posts = useSelector((state) => state.postLibrary.posts);
	const totalRecords = useSelector((state) => state.postLibrary.totalRecords);
	const noResultStatus = useSelector(
		(state) => state.postLibrary.noResultStatus
	);
	const noResultStatusCalendar = useSelector(
		(state) => state.postLibrary.noResultStatusCalendar
	);

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

	const formatDate = (date) => {
		if (date === null) return null;

		let _date = new Date(date);
		let dd = _date.getDate();
		let mm = _date.getMonth() + 1;
		let yyyy = _date.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		return `${dd + '-' + mm + '-' + yyyy}`;
	};

	const getCalendarText = (startDate, endDate) => {
		if (startDate && endDate) {
			return <span>{`${startDate}   >   ${endDate}`}</span>;
		} else {
			if (startDate && endDate === null) {
				return <span>{`${startDate}   >   End date`}</span>;
			} else if (startDate === null && endDate) {
				return <span>{`Start date   >   ${endDate}`}</span>;
			} else {
				return (
					<span
						style={{ color: '#808080' }}
					>{`Start date   >   End date`}</span>
				);
			}
		}
	};

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
									getPosts({
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
									getPosts({
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
				setNoResultCalendarBorder('#404040');
				setNoResultCalendarError('');
			}, [5000]);
		}
	}, [noResultStatusCalendar]);

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
							{/* <span className={classes.fileName}>
								{row?.file_name?.substring(0, 13) +
									`${row?.file_name?.length > 13 ? '...' : ''}`}
							</span> */}
							<span>
								<Markup
									className={classes.fileName}
									content={`${
										row?.file_name?.substring(0, 13) +
										`${row?.file_name?.length > 13 ? '...' : ''}`
									}`}
								/>
							</span>
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
	return (
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
							className={classes.searchField}
							value={search}
							onKeyPress={(e) => {
								if (e.key === 'Enter' && search) {
									dispatch(
										getPosts({
											q: search,
											page,
											startDate: formatDate(dateRange[0]),
											endDate: formatDate(dateRange[1]),
											...sortState
										})
									);
								} else if (e.key === 'Enter' && !search) {
									dispatch(
										getPosts({
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
							placeholder={'Search post, user, label'}
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
						border: `${paginationError ? '1px solid red' : '1px solid #808080'}`
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
	);
};

export default PostLibrary;

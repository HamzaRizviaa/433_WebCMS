/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef, useRef } from 'react';
import Layout from '../../components/layout';
import Table from '../../components/table';
import classes from './_viralLibrary.module.scss';
import Button from '../../components/button';
import UploadOrEditViral from '../../components/virals/uploadOrEditViral';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import Pagination from '@mui/material/Pagination';
import { useStyles } from './../../utils/styles';
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
// import './_calender.scss';

import {
	getAllViralsApi,
	resetCalendarError,
	resetNoResultStatus,
	getSpecificViral
} from './viralLibararySlice';

const ViralLibrary = () => {
	// Selectors
	const virals = useSelector((state) => state.ViralLibraryStore.virals);
	//console.log(virals);
	// const totalRecords = 200;
	const totalRecords = useSelector(
		(state) => state.ViralLibraryStore.totalRecords
	);

	const noResultStatus = useSelector(
		(state) => state.ViralLibraryStore.noResultStatus
	);
	const noResultStatusCalendar = useSelector(
		(state) => state.ViralLibraryStore.noResultStatusCalendar
	);

	const muiClasses = useStyles();
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
	const fileNameRef = useRef(null);

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
		user: 'user'
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
								: -4
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
								: -4
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
								: -4
					}}
				/>
			);
		return null;
	};

	// useEffect(() => {
	// 	console.log(
	// 		'cotent',
	// 		fileNameRef.current ? fileNameRef.current.innerHTML : 'none'
	// 	);
	// 	// if (fileNameRef.current || fileNameRef?.current?.offsetWidth > 200) {
	// 	// 	setTooltipTitle(true);
	// 	// }
	// 	// console.log(tooltipTitle);
	// }, [fileNameRef.current]);

	// useEffect(() => {
	// 	console.log(
	// 		'width',
	// 		fileNameRef.current ? fileNameRef.current.offsetWidth : 0
	// 	);
	// 	if (fileNameRef.current || fileNameRef?.current?.offsetWidth > 200) {
	// 		setTooltipTitle(true);
	// 	}
	// 	console.log(tooltipTitle);
	// }, [fileNameRef.current]);

	// const useResize = (myRef) => {
	// 	const [width, setWidth] = useState(0);
	// 	const [height, setHeight] = useState(0);

	// 	useEffect(() => {
	// 		const handleResize = () => {
	// 			if (myRef?.current) {
	// 				setWidth(myRef?.current?.offsetWidth);
	// 				setHeight(myRef?.current?.offsetHeight);
	// 			}
	// 		};

	// 		window.addEventListener('resize', handleResize());

	// 		return () => {
	// 			window.removeEventListener('resize', handleResize());
	// 		};
	// 	}, [myRef]);

	// 	return { width, height };
	// };

	// const { width, height } = useResize(fileNameRef);
	// console.log(width);
	// console.log(height);

	const columns = [
		{
			dataField: 'viral',
			text: 'VIRAL',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			formatter: (content, row) => {
				//console.log(content, row);
				return (
					<div className={classes.mediaWrapper}>
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
										className={classes.mediaIconPreview}
										controls={true}
									>
										<source
											src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${row?.media}`}
										/>
									</video>
								) : (
									<img
										className={classes.mediaIconPreview}
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
								{/* <PlayArrowIcon className={classes.playIcon} /> */}
								<img
									className={classes.mediaIcon}
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
									content={tooltipTitle ? row?.file_name : ' '}
									// content={
									// 	row?.file_name?.includes('...') ? row?.file_name : ''
									// }
								/>
							}
							arrow
							componentsProps={{
								tooltip: { className: classes.toolTip },
								arrow: { className: classes.toolTipArrow }
							}}
						>
							<div ref={fileNameRef} className={classes.fileName}>
								<Markup className={classes.fileName} content={row.file_name} />
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
					<div className={classes.labelsWrapper}>
						{`${content[0]} ${secondLabel}`}
					</div>
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
				return <Markup className={classes.row} content={`${content}`} />;
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
				return <div className={classes.row}>{getDateTime(content)}</div>;
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
					<div className={classes.row}>
						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={'EDIT VIRAL'}
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
			dispatch(getSpecificViral(row.id));
			setEdit(true);
			setShowSlider(true);
			// setTimeout(() => {
			// 	setShowSlider(true);
			// }, [500]);

			// }
		}
	};

	const handleChange = (event, value) => {
		setPage(value);
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
		<Layout>
			<div className={classes.header}>
				<div className={classes.subheader1}>
					<h1 style={{ marginRight: '2rem' }}>VIRAL LIBRARY</h1>
					<Button
						onClick={() => {
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

			<UploadOrEditViral
				open={showSlider}
				isEdit={edit}
				handleClose={() => {
					setShowSlider(false);
					// setTimeout(() => setEdit(false), 300); //to show edit data after clicking second time
				}}
				title={edit ? 'Edit Viral' : 'Upload Viral'}
				heading1={edit ? 'Media File' : 'Add Media File'}
				buttonText={edit ? 'SAVE CHANGES' : 'ADD VIRAL'}
			/>
		</Layout>
	);
};

export default ViralLibrary;

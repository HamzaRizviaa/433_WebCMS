import React, { useEffect, useState } from 'react';

import { ReactComponent as Edit } from '../../assets/edit.svg';
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
//import hoverPreview from 'hover-preview-js';

import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@material-ui/core/styles';

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
	const [page, setPage] = useState(1);
	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [paginationError, setPaginationError] = useState(false);
	const [sortState, setSortState] = useState({ sortby: '', order_type: '' });
	const dispatch = useDispatch();
	//const [previewOpen, setPreviewOpen] = useState(false);
	//const previewRef = useRef(null);
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
		if (sortState.sortby && sortState.order_type) {
			dispatch(getPosts({ page, ...sortState }));
		}
	}, [sortState]);

	useEffect(() => {
		dispatch(getPosts({ page, ...sortState }));
	}, [page]);

	// const handleDialog = () => {
	// 	setPreviewOpen(!previewOpen);
	// };

	// const onHover = () => {
	// 	setPreviewOpen(true);
	// 	console.log(previewOpen);
	// };

	// const onLeave = () => {
	// 	setPreviewOpen(false);
	// };

	// useEffect(() => {
	// 	if (!previewOpen) {
	// 		return;
	// 	}

	// 	const timeoutId = setTimeout(() => {
	// 		setPreviewOpen(false);
	// 	}, 100);
	// 	return () => {
	// 		clearTimeout(timeoutId);
	// 	};
	// }, [previewOpen]);

	// const previews = hoverPreview(previewRef.current(), {
	// 	delay: 100, // sets a delay before the preview is shown
	// 	cursor: true // enables a loading cursor while the preview is loading
	// });

	// previews.reload(); // reloads the instance
	// previews.destroy(); // removes all event listeners from the instance
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
								{/* <div
							ref={previewRef}
							src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
								row.thumbnail_url ? row.thumbnail_url : row.media
							}`}
						> */}
								{/* <div
							// onMouseEnter={onHover}
							// onMouseLeave={onLeave}
							// role='button'
							// tabIndex='-3'
							// onClick={(event) => {
							// 	setPreviewOpen(true);
							// 	console.log(previewOpen);
							// 	event.preventDefault();
							// 	event.stopPropagation();
							// }}
						> */}

								<img
									// onClick={(event) => {
									// 	setPreviewOpen(true);
									// 	console.log('click');
									// 	event.preventDefault();
									// 	event.stopPropagation();
									// }}

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
						{/* </div> */}

						{/* {previewOpen ? (
								// <dialog
								// 	//className='dialog'
								// 	style={{ position: 'fixed' }}
								// 	open
								// 	// onClick={this.handleShowDialog}
								// >
								<img
									className={classes.previewFile}
									// className={
									// 	row.orientation_type === 'square'
									// 		? classes.mediaIcon
									// 		: row.orientation_type === 'landscape'
									// 		? classes.mediaIconLandscape
									// 		: classes.mediaIconPortrait
									// }
									src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
										row.thumbnail_url ? row.thumbnail_url : row.media
									}`}
									alt='no img'
									style={{
										width: `${8 * 4}rem`,
										height: `${8 * 4}rem`,
										objectFit: 'cover',
										objectPosition: 'center'
									}}
								/>
							) : (
								// </dialog>
								<></>
							)} */}
						{/* </div> */}
						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={row?.file_name.length > 13 ? row?.file_name : ''}
							arrow
							componentsProps={{
								tooltip: { className: classes.toolTip },
								arrow: { className: classes.toolTipArrow }
							}}
						>
							<span className={classes.fileName}>
								{row?.file_name.substring(0, 13) +
									`${row?.file_name.length > 13 ? '...' : ''}`}
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
			text: 'LABEL',
			formatter: (content) => {
				return (
					<div className={classes.row}>{content[0] + `, ` + content[1]}</div>
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
				return <div className={classes.row}>{content}</div>;
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
							<Edit
								// onClick={() => {
								// 	setShowSlider(true);
								// 	setEdit(true);
								// 	dispatch(getSpecificPost(row.id));
								// }}
								className={classes.editIcon}
							/>
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
				<h1 style={{ marginRight: '2rem' }}>POST LIBRARY</h1>
				<Button
					onClick={() => {
						setEdit(false);
						setShowSlider(true);
					}}
					text={'UPLOAD POST'}
				/>
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
				//specificPostId
			/>

			{/* <Popup  closePopup={closeThePop} open={popped} title={'Upload a Post'}/> :   */}
		</Layout>
	);
};

export default PostLibrary;

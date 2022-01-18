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

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core/styles';

const sortRows = (order) => {
	if (!order) return <ArrowDropUpIcon className={classes.sortIcon} />;
	else if (order === 'asc')
		return <ArrowDropUpIcon className={classes.sortIconSelected} />;
	else if (order === 'desc')
		return <ArrowDropDownIcon className={classes.sortIconSelected} />;
	return null;
};

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
	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPosts());
	}, []);

	const columns = [
		{
			dataField: 'file_name',
			text: 'MEDIA',
			sort: true,
			sortCaret: sortRows,
			formatter: (content, row) => {
				return (
					<div
						className={
							row.orientation_type === 'landscape'
								? classes.mediaWrapperLandscape
								: classes.mediaWrapper
						}
					>
						{row.thumbnail_url ? (
							<PlayArrowIcon
								className={
									row.orientation_type === 'portrait'
										? classes.playIconPortrait
										: classes.playIcon
								}
							/>
						) : (
							<></>
						)}
						<img
							className={
								row.orientation_type === 'square'
									? classes.mediaIcon
									: row.orientation_type === 'landscape'
									? classes.mediaIconLandscape
									: classes.mediaIconPortrait
							}
							src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
								row.thumbnail_url ? row.thumbnail_url : row.media
							}`}
						/>
						<Tooltip
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 600 }}
							title={row.file_name.length > 13 ? row.file_name : ''}
							arrow
							componentsProps={{
								tooltip: { className: classes.toolTip },
								arrow: { className: classes.toolTipArrow }
							}}
						>
							<span className={classes.fileName}>
								{row.file_name.substring(0, 13) +
									`${row.file_name.length > 13 ? '...' : ''}`}
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
			text: 'POST DATE | TIME',
			formatter: (content) => {
				return <div className={classes.row}>{getDateTime(content)}</div>;
			}
		},
		{
			dataField: 'labels',
			sort: true,
			sortCaret: sortRows,
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
			text: 'USER',
			formatter: (content) => {
				return <div className={classes.row}>{content}</div>;
			}
		},
		{
			dataField: 'last_edit',
			sort: true,
			sortCaret: sortRows,
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
			setShowSlider(true);
			setEdit(true);
			dispatch(getSpecificPost(row.id));
		}
	};

	return (
		<Layout>
			<div className={classes.header}>
				<h1 style={{ marginRight: '2rem' }}>POST LIBRARY</h1>
				<Button
					onClick={() => {
						setShowSlider(true);
					}}
					text={'UPLOAD POST'}
				/>
			</div>
			<div className={classes.tableContainer}>
				<Table rowEvents={tableRowEvents} columns={columns} data={posts} />
			</div>

			<Stack spacing={2}>
				<Pagination
					className={muiClasses.root}
					count={50}
					variant='outlined'
					shape='rounded'
				/>
			</Stack>

			<UploadOrEditPost
				open={showSlider}
				isEdit={edit}
				handleClose={() => {
					setShowSlider(false);
					setTimeout(() => setEdit(false), 150);
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

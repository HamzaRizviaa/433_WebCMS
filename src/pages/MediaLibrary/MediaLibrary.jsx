import React, { useEffect} from 'react';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Button from '../../components/button';
import Layout from '../../components/layout';
import Table from '../../components/table';
import classes from './_mediaLibrary.module.scss';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getMedia } from '../../components/posts/uploadOrEditPost/mediaDropdownSlice';


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

const MediaLibrary = () => {
    const media = useSelector((state) => state.mediaDropdown.media);

    const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMedia());
	}, []);

    const columns = [
			{
				dataField: 'title',
				text: 'TITLE',
				sort: true,
				sortCaret: sortRows,
				formatter: (content) => {
					return <div className={classes.row}>{content}</div>;
				}
			},
            {
                dataField: 'file_name',
                text: 'MEDIA',
                sort: true,
                sortCaret: sortRows,
                formatter: (content, row) => {
                    return (
                        <div className={classes.mediaWrapper}>
                            <img
                                className={classes.mediaIcon}
                                src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${
                                    row.thumbnail_url}`}
                            />
                            <span  className={classes.fileName}>
                                {row.file_name.substring(0, 16)}
                            </span>
                        </div>
                    );
                }
            },
            {
                dataField: 'type',
                sort: true,
                sortCaret: sortRows,
                text: 'TYPE',
                formatter: (content) => {
                    return <div className={classes.rowType}>{content}</div>;
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
                            <Edit
                                onClick={() => {
                                    console.log('edit clicked')                                    
                                }}
                                className={classes.editIcon}
                            />
                        </div>
                    );
                }
            }
		];

    return (
		<Layout>
			<div className={classes.header}>
				<h1>MEDIA LIBRARY</h1>
				<Button
					onClick={() => {
						console.log("button clicked")
					}}
					text={'UPLOAD MEDIA'}
				/>
			</div> 
			<div className={classes.tableContainer}>
				<Table columns={columns} data={media} />
			</div>
		</Layout>
	);
}

export default MediaLibrary;

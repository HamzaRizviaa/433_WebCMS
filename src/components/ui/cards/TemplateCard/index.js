import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { IconButton } from '@material-ui/core';
import { useStyles } from './index.style';
import { getDateTime } from '../../../../data/utils';
import { PreviewIcon } from '../../../../assets/svg-icons';

const TemplateCard = ({
	index,
	data,
	isSelected,
	onCardClick,
	onPreviewClick
}) => {
	const classes = useStyles({ isSelected });

	if (isEmpty(data)) return null;

	return (
		<div className={classes.card} key={index}>
			<div className={classes.topBox}>
				<div className={classes.author}>{data.user}</div>
				<div className={classes.title} onClick={() => onCardClick(data)}>
					{data.template_name}
				</div>
			</div>
			<div className={classes.bottomBox}>
				<div className={classes.dateBlock}>
					Last edited
					<div className={classes.date}>
						{getDateTime(data.last_edited, ',')}
					</div>
				</div>
				{onPreviewClick && (
					<IconButton
						className={classes.iconBtn}
						onClick={() => onPreviewClick(data)}
					>
						<PreviewIcon />
					</IconButton>
				)}
			</div>
		</div>
	);
};

export default TemplateCard;

TemplateCard.propTypes = {
	index: PropTypes.any,
	data: PropTypes.object.isRequired,
	isSelected: PropTypes.bool,
	onCardClick: PropTypes.func,
	onPreviewClick: PropTypes.func
};

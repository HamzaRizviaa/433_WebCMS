import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { DragIcon, DeleteIcon } from '../../../assets/svg-icons';
import { useDraggableBannerLayoutStyles } from './index.style';

const DraggableBannerLayout = ({
	children,
	item,
	index,
	errorMsg,
	onDeleteIconClick
}) => {
	const isError = Array.isArray(errorMsg) ? !!errorMsg[index] : !!errorMsg;

	const handleDelete = () => {
		onDeleteIconClick(item);
	};

	const classes = useDraggableBannerLayoutStyles({ isError });

	return (
		<Draggable draggableId={`draggable-${index}`} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					style={{
						...provided.draggableProps.style,
						width: '100%'
					}}
				>
					<div>
						<div className={classes.bannerContent}>
							<div className={classes.bannerLayout}>
								<div className={classes.dragIconWrapper}>
									<span {...provided.dragHandleProps}>
										<DragIcon className={classes.dragIcon} />
									</span>
								</div>
								{children}
								<DeleteIcon
									className={classes.bannerTrashIcon}
									onClick={handleDelete}
								/>
							</div>
							{isError && (
								<div className={classes.errorMsg}>
									{Array.isArray(errorMsg) ? errorMsg[index] : errorMsg}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};
DraggableBannerLayout.propTypes = {
	children: PropTypes.element,
	item: PropTypes.object,
	index: PropTypes.number,
	errorMsg: PropTypes.string,
	onDeleteIconClick: PropTypes.func
};

export default DraggableBannerLayout;

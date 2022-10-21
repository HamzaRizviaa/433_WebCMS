import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { useDraggableHeaderStyles } from './index.style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ReactComponent as Union } from '../../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';

const DraggableHeader = ({ item, index, key, children, handleDeleteFile }) => {
	const classes = useDraggableHeaderStyles();
	const [expandIcon, setExpandIcon] = useState(item?.isOpen);

	const expand = () => {
		setExpandIcon(!expandIcon);
		setIsOpen(!expandIcon);
	};

	return (
		<Draggable draggableId={`draggable-${index}`} index={index} key={key}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					className={classes.articleBuilder}
				>
					<div className={classes.draggableWrapperHead}>
						<div className={classes.subHeader}>
							<div
								className={classes.grabIconDiv}
								{...provided.dragHandleProps}
							>
								<Union
									style={{ cursor: 'grab' }}
									className={classes.grabIcon}
								/>
							</div>
							<div className={classes.wrapperHeading}>{item.heading}</div>
						</div>
						<div className={classes.subHeader}>
							<Deletes
								className={classes.deleteIcon}
								onClick={() => {
									handleDeleteFile(item.sortOrder);
								}}
							/>
							<div
								className={classes.expandIconDiv}
								onClick={() => {
									expand();
								}}
							>
								{expandIcon ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							</div>
						</div>
					</div>
					{expandIcon && { children }}
				</div>
			)}
		</Draggable>
	);
};

DraggableHeader.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number,
	key: PropTypes.number,
	children: PropTypes.element,
    handleDeleteFile: PropTypes.func
};

export default DraggableHeader;

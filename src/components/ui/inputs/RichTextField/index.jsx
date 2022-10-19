/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { useTextFieldStyles } from './index.style';
import { ReactComponent as Union } from '../../../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../../../assets/Delete.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TextEditor from './TextEditor';

const RichTextField = ({ 
    index, 
    item, 
    key,
    initialData,  
    setIsOpen, 
    handleDeleteFile, 
    setDisableDropdown,
    sendDataToParent
 }) => {
	const classes = useTextFieldStyles();
	const [clickExpandIcon, setClickExpandIcon] = useState(item?.isOpen);

	const clickExpand = () => {
		setClickExpandIcon(!clickExpandIcon);
		setIsOpen(!clickExpandIcon);
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
									clickExpand();
								}}
							>
								{clickExpandIcon ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							</div>
						</div>
					</div>
                    {clickExpandIcon && 
                        <div>
                            <TextEditor 
                                item={item}
                                setDisableDropdown={setDisableDropdown}
                                clickExpandIcon={clickExpandIcon}
                                initialData={initialData}
                                sendDataToParent={sendDataToParent}
                            />
                        </div>
                    }
				</div>
			)}
		</Draggable>
	);
};

RichTextField.propTypes = {
	index: PropTypes.number.isRequired
};

export default RichTextField;

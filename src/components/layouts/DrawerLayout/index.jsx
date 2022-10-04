import React from 'react';
import Slider from '../../slider';
import PrimaryLoader from '../../ui/loaders/PrimaryLoader';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';

const DrawerLayout = ({
    open,
    handleClose,
    title,
    disableDropdown,
    handlePreviewEscape,
    previewBool,
    previewRef,
    dialogWrapper,
    notifID,
    isLoading,
    mainPage,
    children
}) => {
    return(
        <Slider
			open={open}
			handleClose={handleClose}
			title={title}
			disableDropdown={disableDropdown}
			handlePreview={handlePreviewEscape}
			preview={previewBool}
			previewRef={previewRef}
			news={true}
			dialogRef={dialogWrapper}
			notifID={notifID}
		>
            <PrimaryLoader loading={isLoading} mainPage={mainPage}>
                <Slide in={true} direction='up' {...{ timeout: 400 }}>
                    {children}
                </Slide>
            </PrimaryLoader>
        </Slider>
    )
}

DrawerLayout.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    disableDropdown: PropTypes.func.isRequired,
    handlePreviewEscape: PropTypes.func.isRequired,
    previewBool: PropTypes.bool.isRequired,
    previewRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    dialogWrapper: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    notifID: PropTypes.string.isRequired,
    mainPage: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired
}

export default DrawerLayout
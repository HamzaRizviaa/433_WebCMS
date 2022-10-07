import React from 'react';
import DrawerLayoutSlider from '../../common/DrawerLayoutSlider';
import PrimaryLoader from '../../ui/loaders/PrimaryLoader';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';

const DrawerLayout = ({
    open,
    handleClose,
    title,
    disableDropdown,
    handlePreview,
    preview,
    previewRef,
    dialogWrapper,
    notifID,
    isLoading,
    mainPage,
    children,
    isEdit,
    fromArticle
}) => {
    return(
        <DrawerLayoutSlider
			open={open}
			handleClose={handleClose}
			title={title}
			disableDropdown={disableDropdown}
			handlePreview={handlePreview}
			preview={preview}
			previewRef={previewRef}
            isEdit={isEdit}
            fromArticle={fromArticle}
			imagePreview={true}
			dialogRef={dialogWrapper}
			notifID={notifID}
		>
            <PrimaryLoader loading={isLoading} mainPage={mainPage}>
                <Slide in={true} direction='up' {...{ timeout: 400 }}>
                    {children}
                </Slide>
            </PrimaryLoader>
        </DrawerLayoutSlider>
    )
}

DrawerLayout.propTypes = {
    open: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
    fromArticle: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    disableDropdown: PropTypes.func.isRequired,
    handlePreview: PropTypes.func.isRequired,
    preview: PropTypes.bool.isRequired,
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
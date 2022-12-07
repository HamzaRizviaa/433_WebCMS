import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../ui/Button';
import { useArticleFooterStyles } from './index.style';
import { useFormikContext } from 'formik';
import { areAllFieldsEmpty, articleFormInitialValues } from '../../../../../../data/helpers';
import { isEqual, pick } from 'lodash';

const ArticleFormFooter = ({ 
    isEdit, 
    isDraft,
    openDeleteModal,
    saveDraft,
    publishDraft,
    loading
}) => {
    const classes = useArticleFooterStyles({ loading });
    const { values, dirty, isValid } = useFormikContext();

    const isDraftButtonDisabled = useMemo(() => {
		const isAnyElementEmpty = values.elements.some((item) =>
			areAllFieldsEmpty(item)
		);
		const isEqualToDefaultValues = isEqual(
			pick(values, Object.keys(articleFormInitialValues)),
			articleFormInitialValues
		);

		return !dirty || isAnyElementEmpty || isEqualToDefaultValues;
	},[values, dirty])

    return (
        <div className={classes.footer}>
            {isEdit || isDraft ? 
                <Button 
                    onClick={openDeleteModal}
                    size="small"
                    variant='outlined'
                    className={classes.btn}
                >
                    DELETE ARTICLE
                </Button>
                    : 
                <div></div>
            }
            <div className={classes.container}>
                {isDraft || !isEdit ?
                    <Button 
                        onClick={saveDraft}
                        size='small'
                        variant='outlined'
                        className={classes.draftButton}
                        disabled={isDraftButtonDisabled}
                    >
                        {isEdit && isDraft ? 'SAVE DRAFT' : 'SAVE AS DRAFT'}
                    </Button>
                    :
                    null
                }
                <Button
                    size='small'
                    onClick={publishDraft}
                    className={classes.btn}
                    disabled={!isDraft ? (!dirty ? isValid : !isValid) : !isValid}
                >
                    {isEdit && !isDraft ? 'SAVE CHANGES' : 'PUBLISH'}
                </Button>
            </div>
        </div>
    )
}

ArticleFormFooter.propTypes = {
    isEdit: PropTypes.bool.isRequired, 
    isDraft: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    openDeleteModal: PropTypes.func,
    saveDraft: PropTypes.func,
    publishDraft: PropTypes.func
}

export default ArticleFormFooter;
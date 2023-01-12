import React from 'react';
import { PropTypes } from 'prop-types';
import ToggleSwitchField from '../../ui/inputs/ToggleSwitchField';
import { useLayoutStyles } from './index.style';

const CardLayoutWithToggleBtn = ({
	title,
	children,
	checked,
	onChange,
	name,
	toggleBtn = false
}) => {
	const classes = useLayoutStyles();

	return (
		<div className={classes.settingsLayoutWrapper}>
			<div className={classes.textWrapper}>
				<p className={classes.title}>{title}</p>
				{toggleBtn ? (
					<div>
						<ToggleSwitchField
							checked={checked}
							onChange={onChange}
							name={name}
						/>
					</div>
				) : (
					''
				)}
			</div>

			{children}
		</div>
	);
};

CardLayoutWithToggleBtn.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
	toggleBtn: PropTypes.bool,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
	name: PropTypes.string
};

export default CardLayoutWithToggleBtn;

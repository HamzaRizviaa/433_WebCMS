import React from 'react';

export type ButtonProps = React.ComponentProps<'button'> & {
	icon?: JSX.Element[] | JSX.Element;
	type?: 'button' | 'submit' | 'reset';
	variant?: 'contained' | 'outlined' | 'text';
	size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
	color?: 'primary' | 'secondary' | 'danger';
	className?: string;
	buttonText?: string;
	fullWidth?: boolean;
	disabled?: boolean;
	customPadding?: string;
	iconBtn?: boolean;
};

export default function Button(props: ButtonProps): JSX.Element;

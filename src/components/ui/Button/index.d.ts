import React from 'react';

export type ButtonProps = React.ComponentProps<'button'> & {
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	variant?: 'contained' | 'outlined' | 'text';
	size?: 'small' | 'medium' | 'large';
	className?: string;
	fullWidth?: boolean;
	disabled?: boolean;
};

export default function Button(props: ButtonProps): JSX.Element;

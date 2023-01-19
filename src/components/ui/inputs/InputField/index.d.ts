import { TextFieldProps } from '@material-ui/core';

export type InputFieldProps = Omit<TextFieldProps, 'variant'> & {
	name: string;
	label?: string;
	rightLabel?: string;
	textArea?: boolean;
	required?: boolean;
	error?: string;
	startIcon?: JSX.Element;
	endIcon?: JSX.Element;
	maxLength?: number;
	allowOnlyNumbers?: boolean;
	height?: 'small' | 'medium' | 'large';
	readOnly?: boolean;
};

/**
 *
 * The `InputField` is a wrapper over `Material UI TextField` component but styled according to project needs.
 * You can pass every prop which is a valid `TextField` prop. It also includes some extra props as required by
 * our use cases.
 */
export default function InputField(props: InputFieldProps): JSX.Element;

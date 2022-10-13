export type ButtonProps = React.ComponentProps<'button'> & {
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	variant?: 'primary' | 'secondary' | 'bordered' | 'rounded';
	size?: 'small' | 'normal' | 'large';
	className?: string;
	fullWidth?: boolean;
	isLoading?: boolean;
	active?: boolean;
	disabled?: boolean;
};

export default function Button(props: ButtonProps): JSX.Element;

import React from 'react';
import { ButtonProps } from '../../Button';

export interface ModalProps {
	title: string;
	open: boolean;
	onConfirm: () => void;
	onClose: () => void;
	onLeftButtonClick: () => void;
	isSubmitting?: boolean;
	confirmButtonText?: string;
	confirmButtonVariant?: ButtonProps['variant'];
	confirmButtonColor?: ButtonProps['color'];
	leftButtonText?: string;
	leftButtonVariant?: string;
	leftButtonColor?: string;
	hideLeftButton?: boolean;
	isConfirmButtonDisabled?: boolean;
	children: React.ReactElement;
	size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
	color?: 'primary' | 'secondary';
}

/**
 * This `Modal` component is a wrapper over Material UI `Dialog` component. It's props are customized and can be
 * seen in declaration file.
 */
export default function Modal(props: ModalProps): JSX.Element;

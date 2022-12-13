import React from 'react';
import { ButtonProps } from '../Button';

export interface ModalProps {
	title: string;
	open: boolean;
	onConfirm: () => void;
	onClose: () => void;
	isSubmitting?: boolean;
	cancelButtonText?: string;
	confirmButtonText?: string;
	confirmButtonVariant?: ButtonProps['variant'];
	confirmButtonColor?: ButtonProps['color'];
	children: React.ReactElement;
	size?: 'small' | 'medium' | 'large';
}

/**
 * This `Modal` component is a wrapper over Material UI `Dialog` component. It's props are customized and can be
 * seen in declaration file.
 */
export default function Modal(props: ModalProps): JSX.Element;

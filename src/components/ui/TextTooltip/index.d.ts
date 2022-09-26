import { TooltipProps } from '@material-ui/core';

type ModifiedTooltipProps = Omit<
	TooltipProps,
	'TransitionComponent' | 'TransitionProps' | 'title' | 'arrow'
>;

export type TextTooltipProps = ModifiedTooltipProps & { title: string };

/**
 * The `TextTooltip` component is a wrapper over Material UI's `Tooltip` component and made specifically for text
 * tooltips
 */
export default function TextTooltip(props: TextTooltipProps): JSX.Element;

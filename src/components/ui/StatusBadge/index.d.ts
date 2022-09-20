export interface StatusBadgeProps {
	status: 'draft' | 'published' | 'ACTIVE' | 'CLOSED';
}

/**
 * This `StatusBadge` component is specifically made to use in records list. It accepts only one prop, which is
 * `status`. It is used to change color of badge based on type and the same text will be displayed in badge after
 * converting to upper case.
 */
export default function StatusBadge(props: StatusBadgeProps): JSX.Element;

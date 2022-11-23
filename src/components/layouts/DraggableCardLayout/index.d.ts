export interface DraggableHeaderProps {
	item: { isOpen: boolean; heading: string; sortOrder: number };
	index: number;
	key: number;
	children?: JSX.Element[] | JSX.Element;
	onDeleteIconClick: () => void;
	disableActions?: boolean;
}

/** Draggable Header is a component that needs to be used where there is a need of a draggable field.
 * It takes item as a prop that contains the heading related to the specific field where it is used.
 * Also contains the delete icon that deletes the specific element.
 */

export default function DraggableHeader(
	props: DraggableHeaderProps
): JSX.Element;

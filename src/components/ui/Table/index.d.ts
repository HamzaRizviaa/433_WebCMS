export interface TableProps {
    data: Array<any>,
    columns: Array<any>,
    totalRecords: number,
    onRowClick: () => void,
    onDataReload: () => void
}

/** 
 * This "Table" component will be used in place for both the table and the pagination components.
 * It takes data, columns (array of objects), an onRowClick function that needs to be called in the
 * specific libraries. The onDataReload function is passed to the useEffect that runs everytime the page, or any other filters
 * have a change. The UseEffect calls the dataReload function that needs to be implemented in the 
 * libraries to call the respective API's.
 * 
 * following is an example to show you how to implement this OnDataReload function in all libraries
 * @example
 * 
 * const onDataReload = (params) => {
 *      dispatch("yourApiFunction"({...params}))
 * }
 * 
 * It takes (page, sort state, date filters, search input) as parameters.
 * 
 * */

export default function Table(props: TableProps): JSX.Element;
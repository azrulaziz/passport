import { useTable, useSortBy } from 'react-table'
import React from 'react'
import {renderAccessIcon} from 'lib/renderAccessIcon'
import {EllipsisOutlined} from '@ant-design/icons'
import TableSortArrow from '../common/TableSortArrow'

const UserGroupsTable = () => {

    const columns = React.useMemo(
        () => [
          {
            Header: 'Name',
            accessor: 'name',
            className: 'w-9/12',
            colClassName: 'text-base capitalize'
          },
          {
            Header: 'Users',
            accessor: 'users',
            className: 'w-2/12',
            colClassName: 'text-gray-7'
          },
          {
            Header: '',
            accessor: 'settings',
            disableSortBy: true,
            className: 'w-1/12',
            colClassName: 'text-gray-7',
            Cell: (props) => {
                return (
                    <EllipsisOutlined className="cursor-pointer" />
                )
            }
          },
        ],
        []
    )

    const data = React.useMemo(
        () => [
          {
            name: "500 partner investors",
            users: 12
          },
          {
            name: "SF accelerator early access",
            users: 167
          },
          {
            name: "Fintech investors",
            users: 14
          },
          {
            name: "Small business",
            users: 20
          },
        ],
        []
      )

    const tableInstance = useTable({ columns, data }, useSortBy)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance
    
    return (
        <table {...getTableProps()} className=" w-full">
            <thead className="border-b bg-gray-2">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="">
                        {headerGroup.headers.map(column => {
                            console.log(column)
                            return (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} className={`${column.className} py-1 px-4 text-xs text-gray-8 font-normal text-left`}>
                                <div className="flex items-center">
                                    {column.render('Header')}
                                    {column.canSort ? <TableSortArrow /> : ""}
                                </div>
                            </th>
                            )
                        })}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                console.log(cell)
                                return (
                                    <td {...cell.getCellProps()} className={`${cell.column.colClassName} py-4 px-4 text-xs text-left border-b`}>
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default UserGroupsTable
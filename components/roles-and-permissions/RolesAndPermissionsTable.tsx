import { useTable, useSortBy } from 'react-table'
import React from 'react'
import {renderAccessIcon} from 'lib/renderAccessIcon'
import {EllipsisOutlined} from '@ant-design/icons'
import TableSortArrow from '../common/TableSortArrow'

const RolesAndPermissionsTable = () => {

    const columns = React.useMemo(
        () => [
          {
            Header: 'Roles',
            accessor: 'roles',
            width: 100,
            className: 'w-3/12',
            colClassName: 'text-base capitalize'
          },
          {
            Header: 'Users',
            accessor: 'users',
            width: 50,
            className: 'w-1/12',
            colClassName: 'text-gray-7'
          },
          {
            Header: 'Permissions',
            accessor: 'permission',
            width: 200,
            disableSortBy: true,
            className: 'w-7/12',
            Cell: (props) => {
                return (
                    <div className="flex flex-wrap">
                        {props.value.map(each => {
                            return (
                                <div key={each.access} className="text-xs w-full sm:w-1/2 my-2 capitalize">
                                    <p className="text-gray-9 mb-1">{each.section === 'all' ? '' : each.section}</p>
                                    <div className="flex items-start">
                                        {renderAccessIcon(each.access)}
                                        <p className="text-gray-7 px-1 transform -translate-y-0.5">{each.access}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            }
          },
          {
            Header: '',
            accessor: 'settings',
            width: 50,
            disableSortBy: true,
            className: 'w-1/12',
            colClassName: 'text-gray-7',
            Cell: (props) => {
                if (props.cell.row.original.roles === 'admin' || props.cell.row.original.roles === 'member') return null
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
            roles: 'admin',
            users: 12,
            permission: [{section: 'all', access: 'all access'}]
          },
          {
            roles: 'member',
            users: 6980,
            permission: [{section: 'all', access: 'read only'}]
          },
          {
            roles: 'applicant',
            users: 139,
            permission: [{section: 'dashboard', access: 'read & write access'}, {section: 'referral management', access: 'limited access'}, {section: 'open programs', access: 'read only'}, {section: 'admin & manager settings', access: 'no access'}]
          },
          {
            roles: 'manager',
            users: 156,
            permission: [{section: 'dashboard', access: 'read & write access'}, {section: 'referral management', access: 'limited access'}, {section: 'open programs', access: 'read only'}, {section: 'admin & manager settings', access: 'no access'}]
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
        <table {...getTableProps()} className=" w-full my-2">
            <thead className="border-b bg-gray-2">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="">
                        {headerGroup.headers.map(column => {
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

export default RolesAndPermissionsTable
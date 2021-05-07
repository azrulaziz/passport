import { useTable, useSortBy, usePagination, useRowSelect  } from 'react-table'
import React from 'react'
import {EllipsisOutlined, RightOutlined, LeftOutlined} from '@ant-design/icons'
import TableSortArrow from '../common/TableSortArrow'
import dayjs from 'dayjs'

const UserListTable = () => {

    const columns = React.useMemo(
        () => [
          {
            Header: 'Name',
            accessor: 'name',
            className: 'w-3/12',
            colClassName: 'text-base capitalize'
          },
          {
            Header: 'Roles',
            accessor: 'roles',
            className: 'w-5/12',
            disableSortBy: true,
            Cell: (props) => {
                return (
                    <div className="flex flex-wrap">
                        {props.value.map(each => {
                            return (
                                <div key={each} className="text-xs mx-1 my-1 capitalize">
                                    <p className="px-2 py-1 inline-block text-gray-9 text-xs bg-gray-2 border border-gray-5 rounded-sm">{each}</p>
                                </div>
                            )
                        })}
                    </div>
                )
            }
          },
          {
            Header: 'Last Active',
            accessor: 'lastActive',
            className: 'w-2/12',
            colClassName: 'text-gray-7',
            Cell: (props) => {
                return (
                    <span>{dayjs(props.value).format('MMM D, YYYY')}</span>
                )
            }
          },
          {
            Header: 'Joined',
            accessor: 'joined',
            className: 'w-2/12',
            colClassName: 'text-gray-7',
            Cell: (props) => {
                return (
                    <span>{dayjs(props.value).format('MMM D, YYYY')}</span>
                )
            }
          },
          {
            Header: '',
            accessor: 'settings',
            disableSortBy: true,
            className: 'w-2',
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
            name: "Chantelle Beech",
            roles: ["member", "applicant", "manager", "evaluator"],
            lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
            joined: "Fri May 07 2021 16:51:21 GMT+0800",

          },
          {
            name: "Karper Watt",
            roles: ["member"],
            lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
            joined: "Fri May 02 2021 16:51:21 GMT+0800",
          },
          {
            name: "James Moore",
            roles: ["member", "manager"],
            lastActive: "Fri May 03 2021 16:51:21 GMT+0800",
            joined: "Fri May 01 2021 16:51:21 GMT+0800",
          },
          {
            name: "Deen Reeves",
            roles: ["member", "applicant", "evaluator"],
            lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
            joined: "Fri May 06 2021 16:51:21 GMT+0800",
          },
          {
            name: "Iman Watt",
            roles: ["member"],
            lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
            joined: "Fri May 02 2021 16:51:21 GMT+0800",
          },
          {
            name: "Hadiya Couch",
            roles: ["admin"],
            lastActive: "Fri May 05 2021 16:51:21 GMT+0800",
            joined: "Fri May 04 2021 16:51:21 GMT+0800",
          },
          {
            name: "Jordana Houston",
            roles: ["admin", "member"],
            lastActive: "Fri May 02 2021 16:51:21 GMT+0800",
            joined: "Fri May 01 2021 16:51:21 GMT+0800",
          },
          {
            name: "Watter Lopp",
            roles: ["member"],
            lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
            joined: "Fri May 02 2021 16:51:21 GMT+0800",
          },
          {
            name: "Peet Coych",
            roles: ["member"],
            lastActive: "Fri May 05 2021 16:51:21 GMT+0800",
            joined: "Fri May 04 2021 16:51:21 GMT+0800",
          },
          {
            name: "Jordan Hoton",
            roles: ["admin", "member"],
            lastActive: "Fri May 02 2021 16:51:21 GMT+0800",
            joined: "Fri May 01 2021 16:51:21 GMT+0800",
          },
          {
            name: "Norris Hunt",
            roles: ["member", "applicant",  "evaluator"],
            lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
            joined: "Fri May 07 2021 16:51:21 GMT+0800",

          },
          {
            name: "Tim Cavil",
            roles: ["member", "manager"],
            lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
            joined: "Fri May 02 2021 16:51:21 GMT+0800",
          },
          {
            name: "Sonny More",
            roles: ["member", "manager"],
            lastActive: "Fri May 03 2021 16:51:21 GMT+0800",
            joined: "Fri May 01 2021 16:51:21 GMT+0800",
          },
          {
            name: "Harden Lee",
            roles: ["evaluator"],
            lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
            joined: "Fri May 06 2021 16:51:21 GMT+0800",
          },
          {
            name: "Kimi Rai",
            roles: ["member", "applicant"],
            lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
            joined: "Fri May 02 2021 16:51:21 GMT+0800",
          },
          {
            name: "Leclerc",
            roles: ["admin", "evaluator"],
            lastActive: "Fri May 05 2021 16:51:21 GMT+0800",
            joined: "Fri May 04 2021 16:51:21 GMT+0800",
          },
          {
            name: "Carlos Sain",
            roles: ["admin", "member"],
            lastActive: "Fri May 02 2021 16:51:21 GMT+0800",
            joined: "Fri May 01 2021 16:51:21 GMT+0800",
          },
          {
            name: "Valteri Bota",
            roles: ["member"],
            lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
            joined: "Fri May 02 2021 16:51:21 GMT+0800",
          },
          {
            name: "Max Stapen",
            roles: ["admin"],
            lastActive: "Fri May 05 2021 16:51:21 GMT+0800",
            joined: "Fri May 04 2021 16:51:21 GMT+0800",
          },
          {
            name: "Lewes Hilton",
            roles: ["member"],
            lastActive: "Fri May 02 2021 16:51:21 GMT+0800",
            joined: "Fri May 01 2021 16:51:21 GMT+0800",
          },
        ],
        []
      )

    const tableInstance = useTable(
        {
         columns, 
         data 
        }, 
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,

        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        state: {pageIndex},
    } = tableInstance
    return (
        <div className="">
            <table {...getTableProps()} className=" w-full">
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
                    {page.map(row => {
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
            <div className="flex justify-center items-center my-4 text-xs ">
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className={`pt-1 pb-2 px-2 ${canPreviousPage ? "" : "bg-gray-3 text-gray-6 rounded"}`}>
                    <LeftOutlined  />
                </button>
                <div className="text-gray-9 flex items-center mx-2">
                    {pageOptions.map(each => {
                        return (
                            <p 
                                key={each} 
                                className={`py-1 px-2 mx-1 cursor-pointer ${pageIndex === each ? "text-primary-blue border border-primary-blue rounded" : ""}`}
                                onClick={() => gotoPage(each)}
                            >
                                {each + 1}
                            </p>
                        )
                    })}
                </div>
                <button onClick={() => nextPage()} disabled={!canNextPage} className={` pt-1 pb-2 px-2 ${canNextPage ? "" : "bg-gray-3 text-gray-6 rounded"}`}>
                    <RightOutlined />
                </button>
            </div>
        </div>
    )
}

export default UserListTable

const IndeterminateCheckbox = React.forwardRef(
    // @ts-ignore
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        // @ts-ignore
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      )
    }
)
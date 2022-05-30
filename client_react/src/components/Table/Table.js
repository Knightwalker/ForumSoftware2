import React from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import "./Table.css";

const columns = [
    {
        Header: "Id",
        accessor: "id"
    },
    {
        Header: "Username",
        accessor: "username"
    },
    {
        Header: "Email",
        accessor: "email"
    },
    {
        Header: "Join Date",
        accessor: "created_at",
        Cell: ({ value }) => {
            const newValue = new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
                hour12: false
            }).format(new Date(value));
            return newValue;
        }
    }
];

const Table = (props) => {
    const { data } = props;

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // rows,
        page,
        nextPage,
        previousPage,
        prepareRow,
        state,
        setGlobalFilter,
        canNextPage,
        canPreviousPage,
        pageOptions
    } = useTable({
        columns: columns,
        data: data
    }, useGlobalFilter, useSortBy, usePagination);

    const { globalFilter, pageIndex } = state;

    // console.log(getTableProps());
    // console.log(getTableBodyProps());
    // console.log(headerGroups);
    // console.log(rows);

    return (
        <div className="Table">

            <label htmlFor="search"><b>Advanced Search</b></label>
            <br />
            <input id="search" value={globalFilter || ""} onChange={(e) => setGlobalFilter(e.currentTarget.value)} />
            <br />
            <br />
            {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, idx) => {
                        const { getHeaderGroupProps, headers } = headerGroup;

                        return (
                            <tr key={idx} {...getHeaderGroupProps()}>
                                {headers.map((column) => {
                                    const { getHeaderProps } = column;

                                    return (
                                        <th {...getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render("Header")}
                                            <span>{column.isSorted ? (column.isSortedDesc ? "↑" : "↓") : ""}</span>
                                        </th>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row) => {
                            prepareRow(row);
                            const { getRowProps } = row;
                            return (
                                <tr {...getRowProps()}>
                                    {
                                        row.cells.map((cell) => {
                                            const { getCellProps } = cell;

                                            return (
                                                <td {...getCellProps()}>{cell.render("Cell")}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <br />
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div>
                    <button
                        className="btn btn-primary me-1"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-primary ms-1"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        Next
                    </button>
                </div>
                <span>
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                </span>
            </div>

        </div>
    )
}

Table.defaultProps = {
    data: [{
        "id": 1,
        "username": "username1",
        "email": "username1@gmail.com",
        "created_at": "2005-06-14T11:24:59Z"
    }, {
        "id": 2,
        "username": "username2",
        "email": "username2@gmail.com",
        "created_at": "2005-04-14T11:24:59Z",
    }, {
        "id": 3,
        "username": "username4",
        "email": "username3@gmail.com",
        "created_at": "2005-02-14T11:24:59Z",
    }, {
        "id": 4,
        "username": "username4",
        "email": "username4@gmail.com",
        "created_at": "2005-02-14T11:24:59Z",
    }, {
        "id": 5,
        "username": "username5",
        "email": "username5@gmail.com",
        "created_at": "2005-02-14T11:24:59Z",
    }, {
        "id": 6,
        "username": "username6",
        "email": "username6@gmail.com",
        "created_at": "2005-02-14T11:24:59Z",
    }, {
        "id": 7,
        "username": "username7",
        "email": "username7@gmail.com",
        "created_at": "2005-02-14T11:24:59Z",
    }, {
        "id": 8,
        "username": "username8",
        "email": "username8@gmail.com",
        "created_at": "2005-02-14T11:24:59Z",
    }, {
        "id": 9,
        "username": "username9",
        "email": "username9@gmail.com",
        "created_at": "2005-02-14T11:24:59Z",
    }, {
        "id": 10,
        "username": "username10",
        "email": "username10@gmail.com",
        "created_at": "2005-02-14T11:24:59Z",
    }, {
        "id": 11,
        "username": "username11",
        "email": "username11@gmail.com",
        "created_at": "2005-02-14T11:24:59Z",
    }, {
        "id": 12,
        "username": "username12",
        "email": "username12@gmail.com",
        "created_at": "2005-02-14T11:24:59Z",
    }]
}

export default Table;
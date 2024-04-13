import { useGlobalFilter, usePagination, useTable } from "react-table";
import GlobalFilter from "./GlobalFilter";

export default function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <div className="bg-gray-50 p-5 rounded-xl">
      <div className="m-2 flex justify-between">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <div>
        <table {...getTableProps()} className="w-[1000px]">
          <thead className="">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="py-3 px-2 text-sm font-bold rounded-xl"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td className="pl-5 text-sm" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex gap-2 pt-3 text-sm">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="p-2 bg-yellow-200 border border-yellow-800 rounded-lg font-bold hover:bg-yellow-500"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="p-2 bg-yellow-200 border border-yellow-800 rounded-lg font-bold hover:bg-yellow-500"
          >
            Next
          </button>

          <span className="p-2 text-black">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

import React from "react";

//import Checkbox from '@material-ui/core/Checkbox'
//import MaUTable from "@material-ui/core/Table";
//import PropTypes from "prop-types";
//import { useTheme } from "@material-ui/core/styles";
//import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TablePaginationActions from "./AppointmentTablePaginationActions";
//import { makeStyles } from "@material-ui/styles";
import TableToolbar from "./TableToolbar";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";

//import { findBreakingChanges } from 'graphql'

// const useStyles = makeStyles((theme) => ({
//   selected: {
//     backgroundColor: "green !important",
//     "&:hover": {
//       backgroundColor: "green !important",
//     },
//   },
//   cellHeader: {
//     width: "10%",
//     //fontSize: '08pt',
//     fontSize: "12px",
//     backgroundColor: "grey",
//   },
//   cellBody: {
//     width: "10%",
//     fontSize: "12px",
//     //backgroundColor: 'green'
//   },
// }));

const EnhancedTable = ({
  columns,
  data,
  setData,
  getRowProps,
  //updateMyData,
  //skipPageReset,
  handleAddEvt,
}) => {
  //const classes = useStyles();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //rows,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    //selectedFlatRows,
    //state: { pageIndex, pageSize, selectedRowIds, globalFilter },
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      //defaultColumn,
      //autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      //updateMyData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        ...columns,
        //  {
        //   Header: 'FECHA',
        //   accessor: 'examDateTime',
        // },
      ]);
    }
  );
  //const handleChangePage = (event,newPage) =>
  const handleChangePage = (newPage) => {
    //console.log("onChangePage");
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  const addEventHandler = (data) => {
    // const newData = data.concat([user]);
    // setData(newData);
    handleAddEvt(data);
  };

  // Render the UI for your table
  return (
    <TableContainer>
      <TableToolbar
        addEventHandler={addEventHandler}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <Table {...getTableProps()} size="small" sx={{ minWidth: 650 }}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, _i) => (
                <TableCell
                  {...(column.id === "actions"
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
                >
                  {column.render("Header")}
                  {column.id !== "actions" ? (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? "asc" : "desc"}
                      // direction={
                      //   column.isSorted
                      //     ? column.isSortedDesc
                      //       ? " (DESC)"
                      //       : " (ASC)"
                      //     : "()"
                      // }
                    />
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow hover {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell
                      {...cell.getCellProps()}
                      //className={classes.cellBody}
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                5, 10, 25,
                //{ label: "All", value: data.length }, //this cause warning of duplicated key '5'
              ]}
              colSpan={4}
              count={data.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default EnhancedTable;

//{...row.getRowProps(getRowProps(row))}
//{...row.getRowProps()}

/*
 <TableRow {...headerGroup.getHeaderGroupProps()} selected classes={{selected: classes.selected,}}>
              {headerGroup.headers.map(column => (
                <TableCell
                  {...(column.id === 'selection'
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
                >
                  {column.render('Header')}
                  {column.id !== 'selection' ? (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  ) : null}
                </TableCell>
              ))}
            </TableRow>

*/

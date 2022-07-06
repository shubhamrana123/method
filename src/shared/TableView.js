import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Fragment, useEffect, useState } from 'react';
import { } from '../api/veramo/didApi';
import TablePagination from '@mui/material/TablePagination';


const TableView = (props) => {
  console.log("DATA", props.data);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const [tableData, setTableData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (props.data.length > 0) {
      const keys = Object.keys(props.data[0]);
      console.log("Keys", keys);
      setKeys(keys.slice(0, 3));
    }

    setTableData(props.data)
  }, [props.data])

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {keys?.map((key, index) => (
                <StyledTableCell key={index} >{index != 2 ? key : "View"}</StyledTableCell>
              ))}

              {/* <StyledTableCell align="right">Calories</StyledTableCell>
          <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
          <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
          <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {item.did}
                </StyledTableCell>
                <StyledTableCell >{item.provider}</StyledTableCell>
                <StyledTableCell ><button className='btn btn-primary' onClick={() => props.onAction(item.did)}>View</button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Fragment >
  )
}
export default TableView
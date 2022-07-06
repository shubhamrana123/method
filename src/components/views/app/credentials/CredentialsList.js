import { Fragment, useEffect, useState, useContext } from "react";
 import { Tag } from 'antd';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { onVeramoApiCall } from '../../../../api/veramo/didApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import userContext from '../../../../context/userContext/UserContext';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import LoadingSpinner from "../../../../utils/spinner/LoadingSpinner";

const CredentialsList = (props) => {
    const navigate = useNavigate();
    const usrCtx = useContext(userContext);
    console.log("Checkccc", usrCtx)
    const [credentials, setCredentials] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const columns = [
        { id :'issuer', subPath : 'id', label: 'Issuer', minWidth: 10, maxWidth: 50 },
        { id: 'credentialSubject', subPath : 'id', label: 'Subject', minWidth: 100 },
        {
          id: 'proof',
          subPath : 'type',
          label: 'Proof Type',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'type',
          subPath : '1',
          label: 'Type',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'issuanceDate',
          subPath : '',
          label: 'Issuance Date',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toFixed(2),
        },
      ];


    const onShowCredDetails = (hash) => {
        navigate('/credential/' + hash);
    }

    const onCreateCredentails = () => {
        navigate('../createCredentail');
    }

    const onShowDetailHandler = (hash)=>
    {
        
    }
    useEffect(() => {
        const getCredentailsList = async () => {
            setIsLoading(true);
            
            if(usrCtx?.userInfo == null)
            {
                usrCtx.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            }
            const res = await onVeramoApiCall('get', 'app/getAllCredentails', null, { userType: usrCtx?.userInfo?.userType });
            if (res.data.statusCode == 200) {
                setCredentials(res.data.result);
            }
            setIsLoading(false);
        }
        getCredentailsList();
    }, [])
    return (
        <Fragment>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                {isLoading && <LoadingSpinner/>}
                    <Card>
                        <CardContent>
                            <button className="btn btn-primary" onClick={onCreateCredentails}>Create Credentails</button>
                        </CardContent>
                    </Card>
                    <br />
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {credentials?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((item) => {
                                            return (
                                                <TableRow hover tabIndex={-1} key={item.hash} onClick={()=>onShowDetailHandler(item.hash)}>
                                                    {columns.map((column) => {
                                                        console.log("columns",item.verifiableCredential['issuer']['id'])
                                                        const value = column.id != "issuanceDate" ? item.verifiableCredential[column.id][column.subPath]
                                                        : item.verifiableCredential[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align} width="20px">
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={credentials?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>

                </div>
                <div className="col-md-1"></div>
            </div>
        </Fragment>
    )
}

export default CredentialsList;
import React from 'react'
import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid';
import CardContent from "@mui/material/CardContent";
import UserContex from "../../../context/userContext/UserContext";
import DepartmentCredential from './HospitalDepartmentCredential.js'
function DepartmentCredentialDetails() {
  return (
    <div>
          <Card sx={{ minWidth: 1250 }} >
                                    <CardContent >
                                        <Grid container spacing={2}>
                                            <Grid item xs={8}>
                                                <div class="row">
                                                    <div class="col-md-9  align-slef-center">
                                                        <p>No Roles Assigned for you.

                                                        </p>
                                                    </div>
                                                    <div class="col-md-3 = align-slef-center">

                                                    </div>
                                                </div>
                                            </Grid>

                                        </Grid>
                                    </CardContent>
                                </Card>
  </div>
  )
}

export default DepartmentCredentialDetails
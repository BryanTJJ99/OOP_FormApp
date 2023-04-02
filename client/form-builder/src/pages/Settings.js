import React from "react";
import { styled, useTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid, Paper, Typography, Box, TableCell, TableContainer, Table, TableBody, TableHead, TableRow } from "@mui/material";
import { getCurrentUser } from "../services/AuthService";
import AccountCreationLogo from "../components/AccountCreation/AccountCreationLogo";

const Settings = () => {
    const currentUser = getCurrentUser();
    const theme = useTheme();
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    const rolesRef = { 
        'ROLE_VENDOR': 'Vendor', 
        'ROLE_ADMIN': 'Admin', 
        'ROLE_APPROVER': 'Approver'
    }

    let rows = [
        {key: 'Username', val: currentUser.username}, 
        {key: 'Email', val: currentUser.email}, 
        {key: 'Role', val: rolesRef[currentUser.roles]}, 

    ]

    return (
        <Box sx={{width:'70%', marginX:'auto',}}>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <AccountCreationLogo/>
            <div className="text-center mb-5">
                <Typography variant='h4'>Your Profile</Typography>
                <Typography variant='p'>Check out your account details</Typography>
            </div>
            <TableContainer 
                component={Paper}
                sx={{
                    marginX:'auto',
                    "& .MuiTableCell-head":{
                    backgroundColor: "primary.main",
                    color:"white",
                    fontWeight: 'bold',
                    },
                }}
            >
                <Table aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align='center' sx={{fontWeight: 'bold', bgcolor:'secondary.main', color:'white'}}>Field</TableCell>
                        <TableCell align="center" sx={{fontWeight: 'bold', bgcolor:'secondary.main', color:'white'}}>Value</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.key}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row" align='center'>
                            <Box component='span' fontWeight={'bold'}>{row.key}</Box> 
                        </TableCell>
                        <TableCell align="center">{row.val}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>    
            </TableContainer>               
            {/* <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h4" component="div" gutterBottom>
                                Profile
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6" component="div" gutterBottom>
                                Username
                            </Typography>
                            <Typography variant="h6" component="div" gutterBottom>
                                {currentUser.username}
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6" component="div" gutterBottom>
                                Email
                            </Typography>
                            <Typography variant="h6" component="div" gutterBottom>
                                {currentUser.email}
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6" component="div" gutterBottom>
                                Role
                            </Typography>
                            <Typography variant="h6" component="div" gutterBottom>
                                {currentUser.roles}
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Container> */}
        </Box>
    );
};

export default Settings;
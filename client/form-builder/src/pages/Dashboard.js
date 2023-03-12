import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NameAvatar from '../components/Dashboard/NameAvatar';
import StatusChip from '../components/Dashboard/StatusChip';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// columns will be Project Name, Vendor Name, Avatar (from vendor), Forms (each row is one form), Vendor, Admin, Approver (status tick or X)
const STATUS_OPTIONS = ["Filled","Approved","Reviewed","Rejected","PartiallyFilled","Approved"]
const columns = [
    {
      field: 'projectName',
      headerName: 'Project name',
      width: 150,
      editable: false,
    },
    {
      field: 'vendorName',
      headerName: 'Vendor name',
      width: 150,
      editable: true,
    },
    {
      field: 'avatar',
      headerName: 'Avatar',
      renderCell:(params) => { 
      return (
        <NameAvatar name={params.row.vendorName}/>
      )},
      sortable: false,
      filterable: false,
      groupable: false,
      aggregable: false,
      disableExport: true
    },
    {
      field: 'vendorEmail',
      headerName: 'Email',
      renderCell: (params) => {
        return(
          <Link underline="hover" >
            {params.row.vendorEmail}
          </Link>
          // <Link to='javascript:void(0)'
          //       // onClick={() => window.location.href = `mailto:${params.row.vendorEmail}`}
          // >
          //   {params.row.vendorEmail}
          // </Link>
        )
      },
      width: 150,
      editable: true,
    },
    {
      field: 'form',
      headerName: 'Form',
      description: 'This column has a value getter and is not sortable.',
      renderCell: (params) => {
        return (
          <Link underline="none" sx={{cursor: 'pointer'}}>
            {params.row.form}
          </Link>
        )
      },
      editable: false,
      width: 250,
    }, {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => {
        return (
          <StatusChip status={params.row.status}/>
        )
      },
      type: 'singleSelect',
      valueOptions: STATUS_OPTIONS,
      width: 150,
      editable: false,
    },
    // {
    //   field: 'vendorStatus',
    //   headerName: 'Vendor',
    //   description: 'This column contains a boolean is not sortable.',
    //   width: 110,
    //   editable: true,
    // },{
    //   field: 'adminStatus',
    //   headerName: 'Admin',
    //   description: 'This column contains a boolean is not sortable.',
    //   width: 110,
    //   editable: true,
    // },{
    //   field: 'approverStatus',
    //   headerName: 'Approver',
    //   description: 'This column contains a boolean is not sortable.',
    //   width: 110,
    //   editable: true,
    // },

    
  ];

  const rows = [
    { id: 1, projectName: 'Cloud', vendorName: 'Kong Leong', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 2, projectName: 'Cloud', vendorName: 'Justin', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Rejected'},
    { id: 3, projectName: 'DigiX', vendorName: 'Accenture', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'PartiallyFilled'},
    { id: 4, projectName: 'DigiX', vendorName: 'Tata', vendorEmail: 'abc@gmail.com' ,form: 'Safety Assessment', status: 'Open'},
    { id: 5, projectName: 'SmartNation', vendorName: 'NCS', vendorEmail: 'abc@gmail.com' ,form: 'Optional Sub-Contractor survey', status: 'Reviewed'},
    { id: 6, projectName: '5G', vendorName: 'NCS', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 7, projectName: '5G', vendorName: 'NCS', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 8, projectName: '5G', vendorName: 'NCS', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 9, projectName: '5G', vendorName: 'NCS', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 10, projectName: '5G', vendorName: 'NCS', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Approved'},
    { id: 11, projectName: '5G', vendorName: 'Bitch Ass', vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
  ];
  
const Dashboard = () => {
    return (
      <Box 
        display={"flex"}
        justifyContent={"center"}
      >
        <Box sx={{ height: 632,width:990,my:'50px', boxShadow:2}}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection={false}
            disableRowSelectionOnClick
          />
            </Box>
      </Box>
    )
};

export default Dashboard;
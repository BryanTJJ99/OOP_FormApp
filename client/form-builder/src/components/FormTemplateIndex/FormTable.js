import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
//import moment from 'moment';
// columns will be Project Name, Vendor Name, Avatar (from vendor), Forms (each row is one form), Vendor, Admin, Approver (status tick or X)

const columns: GridColDef[] = [
    {
      field: 'formTemplate',
      headerName: 'Form Template Name',
      width: 350,
      editable: false,
      renderCell: (params) => { 
        return <a href={params.value.link}>{params.value.name}</a>
      }
    },

    {
      field: 'createdBy',
      headerName: 'Created By',
      width: 200,
      editable: false,
    },

    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      width: 200, 
      editable: false, 
      valueFormatter: (params) => {
        // new Date(params.value).format('DD/MM/YYYY')
        // moment(params.value).format("DD/MM/YYYY")
        (params.value).toString() 
      }
    }, 
  ];


  
const FormTable = () => {
    const rows = [
      { id: 1, formTemplate: {name: 'Pre-Evaluation Report', link: '/FormBuilder'}, createdBy: 'Ken', updatedAt: new Date('05/12/2022')},
      ];

    return (
      <Box sx={{ width: '80%'}} marginX={"auto"}>
          <DataGrid
            autoHeight
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
    )
};

export default FormTable;
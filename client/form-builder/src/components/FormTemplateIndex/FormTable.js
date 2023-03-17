import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getAllFormTemplate } from '../../services/FormTemplate.js';
//import moment from 'moment';
// columns will be Project Name, Vendor Name, Avatar (from vendor), Forms (each row is one form), Vendor, Admin, Approver (status tick or X)

const columns: GridColDef[] = [
    {
      field: 'formName',
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
    const [formTemplates, setFormTemplates] = useState(null); 
    const [dataGrid, setDataGrid] = useState(null); 

    useEffect(() => {
        getAllFormTemplate()
            .then(response => {
                setFormTemplates(response);
            })
            .catch(error => {
                console.log(error.message); 
            })
    }, [])

    useEffect(() => {
        if (formTemplates !== null) { 
            let newDataGridRows = []; 
            let rowIdCounter = 1; 
            for (let formTem of formTemplates) { 
              let row = {id: rowIdCounter}; 
              rowIdCounter++; 
              row['formName'] = {name: formTem.formName, link: '/FormView'};
              // bernice need to query out the username from the userDB using the formTem.createdBy userId
              row['createdBy'] = formTem.createdBy;
              row['updatedAt'] = formTem.updatedAt;
              newDataGridRows.push(row);
            }
            setDataGrid(<DataGrid
              autoHeight
              rows={newDataGridRows}
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
            />)
        }
    }, [formTemplates])

    // const rows = [
    //   { id: 1, formTemplate: {name: 'Pre-Evaluation Report', link: '/FormBuilder'}, createdBy: 'Ken', updatedAt: new Date('05/12/2022')},
    //   ];

    return (
      <Box sx={{ width: '80%'}} marginX={"auto"}>
          {dataGrid}
      </Box>
    )
};

export default FormTable;
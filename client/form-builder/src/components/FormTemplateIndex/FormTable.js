import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getAllFormTemplate } from '../../services/FormTemplate.js';
import { getAllUsers } from '../../services/User.js';
//import moment from 'moment';
// columns will be Project Name, Vendor Name, Avatar (from vendor), Forms (each row is one form), Vendor, Admin, Approver (status tick or X)

const columns: GridColDef[] = [
    {
      field: 'formName',
      headerName: 'Form Template Name',
      flex: 2,
      editable: false,
      renderCell: (params) => { 
        return <a href={params.value.link}>{params.value.name}</a>
      }
    },

    {
      field: 'createdBy',
      headerName: 'Created By',
      flex: 1,
      editable: false,
    },

    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      flex: 1,
      editable: false, 
      renderCell: (params) => {
        return dateConverter(params.value)
      }
    }, 
  ];

function dateConverter(jsonDate) { 
  let jsonDateArray = jsonDate.split('-'); 
  let day = jsonDateArray[2].substr(0,2);
  let year = jsonDateArray[0];
  let month = jsonDateArray[1];
  let dateString = day + '/' + month + '/' + year; 
  return dateString;
}


  
const FormTable = () => {
    const [formTemplates, setFormTemplates] = useState(null); 
    const [dataGrid, setDataGrid] = useState(null); 
    const [users, setUsers] = useState(null); 

    useEffect(() => {
        getAllFormTemplate()
            .then(response => {
                setFormTemplates(response);
            })
            .catch(error => {
                console.log(error.message); 
            })

        getAllUsers() 
            .then(response => { 
              setUsers(response); 
              console.log(response)
            })
            .catch(error => { 
              console.log(error.message); 
            })
    }, [])

    function findUsernameByUserId(id) { 
      for (let user of users) { 
        if (user.id === id) { 
          return user.username;
        }
      }
    }

    useEffect(() => {
        if (formTemplates !== null) { 
            let newDataGridRows = []; 
            let rowIdCounter = 1; 
            for (let formTem of formTemplates) { 
              let row = {id: rowIdCounter}; 
              rowIdCounter++; 
              row['formName'] = {name: formTem.formName, link: '/FormView?formTemplateId=' + formTem.formTemplateId};
              // bernice need to query out the username from the userDB using the formTem.createdBy userId
              row['createdBy'] = findUsernameByUserId(formTem.createdBy);
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
              sx={{
                '& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaderTitle': {
                  backgroundColor: "secondary.main",
                  color:"white",
                  fontWeight: 'bold',
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
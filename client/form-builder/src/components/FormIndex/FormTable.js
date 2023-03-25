import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { randomColor, randomDesk, randomEmail, randomFeeRate, generateFilledQuantity, randomId, randomIncoterm, generateIsFilled, randomQuantity, randomTraderName, randomUnitPrice, randomUnitPriceCurrency, randomStatusOptions, randomPnL, randomTradeDate, randomMaturityDate, randomBrokerId, randomCompanyName, randomCountry, randomCurrency, randomAddress, randomCity, randomUpdatedDate, randomCreatedDate, randomRateType, randomContractType, randomTaxCode } from '@mui/x-data-grid-generator/services';
import { renderCountry, renderAvatar, renderIncoterm, renderPnl, renderProgress, renderStatus, renderTotalPrice, renderEditCurrency, renderEditProgress, renderEditStatus, renderEditIncoterm } from '@mui/x-data-grid-generator/renderer';
import { CONTRACT_TYPE_OPTIONS, COUNTRY_ISO_OPTIONS_SORTED, CURRENCY_OPTIONS, INCOTERM_OPTIONS, RATE_TYPE_OPTIONS, STATUS_OPTIONS, TAXCODE_OPTIONS } from '@mui/x-data-grid-generator/services/static-data';
import { FormPills } from './index.js';
import { lineHeight } from '@mui/system';
import { getAllFormResponses } from '../../services/FormResponse.js';
import { getAllFormTemplate } from '../../services/FormTemplate.js';
import { getAllUsers } from '../../services/User.js';
import { getAllProjects } from '../../services/DashboardAPI.js';

// columns will be Project Name, Vendor Name, Avatar (from vendor), Forms (each row is one form), Vendor, Admin, Approver (status tick or X)

const columns: GridColDef[] = [
    // {
    // field: 'vendorLogo',
    // headerName: 'Logo',
    // generateData: randomColor,
    // renderCell: renderAvatar,
    // valueGetter: params => params.row.vendor == null || params.row.vendorLogo == null ? null : {
    //   name: params.row.vendor,
    //   color: params.row.vendorLogo
    // },
    // sortable: false,
    // filterable: false,
    // groupable: false,
    // aggregable: false,
    // disableExport: true
    // },

    {
      field: 'project',
      headerName: 'Project',
      flex: 2,
      editable: false,
    },

    {
      field: 'vendor',
      headerName: 'Vendor',
      flex: 2,
      editable: false,
    },

    // ken help to enable multiline when there are too many forms to fit into 1 lineHeight
    {
      field: 'forms',
      headerName: 'Forms',
      renderCell: (params) => {
        return <FormPills forms={params}/>
      },
      editable: false,
      flex: 5,
    }, 

    {
      field: 'status',
      headerName: 'Status',
      editable: false,
      flex: 1,
    }, 
    
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   generateData: randomStatusOptions,
    //   renderCell: renderStatus,
    //   renderEditCell: renderEditStatus,
    //   type: 'singleSelect',
    //   valueOptions: STATUS_OPTIONS,
    //   width: 150,
    //   editable: false,
    // },
  ];


  
const FormTable = () => {
  const [formResponses, setFormResponses] = useState(null); 
  const [formTemplates, setFormTemplates] = useState(null); 
  const [users, setUsers] = useState(null); 
  const [projects, setProjects] = useState(null); 
  const [rows, setRows] = useState(null); 
  const [dataGrid, setDataGrid] = useState(null); 

  useEffect(() => { 
    getAllFormTemplate() 
      .then(response => {
        let newFormTemplateDict = {} 
        for (let form of response) { 
          newFormTemplateDict[form.formTemplateId] = form.formName; 
        }
        setFormTemplates(newFormTemplateDict);
      })
      .catch(error => {
        console.log(error.message)
      })
    getAllUsers()
      .then(response => {
        let newUserDict = {}; 
        for (let user of response) { 
          newUserDict[user.id] = user.username; 
        }
        setUsers(newUserDict);
      })
      .catch (error => {
        console.log(error.message);
      })
    getAllProjects() 
      .then(response => { 
        let newProjectDict = {};
        for (let proj of response) { 
          newProjectDict[proj.projectID] = proj.projectName; 
        }
        setProjects(newProjectDict);
      })
  }, [])

  useEffect(() => { 
    getAllFormResponses()
      .then(response => {
        setFormResponses(response);
        // getAllData() 
        //   .then(fakeResponse => { 
            let formResByVendorProject = {};
            for (let formResponse of response) { 
              let index = [formResponse.vendorId, formResponse.projectId]; 
              let templateId = formResponse.formTemplateId; 
              let templateName = formTemplates[templateId]; 
              let formStatus = formResponse.status; 
              let formData = {name: templateName, status: formStatus, link: '/FormResponse?formResponseId='+formResponse.formResponseId}
              if (index in formResByVendorProject) { 
                formResByVendorProject[index].push(formData); 
              } else { 
                formResByVendorProject[index] = [formData];
              }
            }
            let newRows = []; 
            let ind = 1; 
            for (let index in formResByVendorProject) { 
              let formResData = {}; 
              formResData.id = ind; 
              let indexData = index.split(',');
              formResData.vendor = users[indexData[0]]; 
              formResData.project = projects[indexData[1]]; 
              formResData.forms = formResByVendorProject[index]
              let totalNumOfForms = formResByVendorProject[index].length; 
              let numCompletedForms = 0; 
              for (let form of formResByVendorProject[index]) { 
                if (form.status === 'approved') { 
                  numCompletedForms++; 
                }
              }
              formResData.status = numCompletedForms + ' / ' + totalNumOfForms; 
              newRows.push(formResData)
              ind++; 
            }
            console.log(newRows)
            setRows(newRows);
            let newDataGrid = (<DataGrid
              autoHeight
              rows={newRows}
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
              sx={{
                '& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaderTitle': {
                  backgroundColor: "secondary.main",
                  color:"white",
                  fontWeight: 'bold',
                },
              }}
              
            />)
            setDataGrid(newDataGrid);
          })        
      // })
      .catch(error => {
        console.log(error.message); 
      })
  }, [formTemplates, users])

    return (
      <Box sx={{ width: '80%',overflowX:'auto', }}
        display={"flex"}
        justifyContent={"center"}
        marginX={"auto"}

      >
        {dataGrid}
    </Box>
    )
};

export default FormTable;
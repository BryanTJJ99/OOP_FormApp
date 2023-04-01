import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { randomColor, randomDesk, randomEmail, randomFeeRate, generateFilledQuantity, randomId, randomIncoterm, generateIsFilled, randomQuantity, randomTraderName, randomUnitPrice, randomUnitPriceCurrency, randomStatusOptions, randomPnL, randomTradeDate, randomMaturityDate, randomBrokerId, randomCompanyName, randomCountry, randomCurrency, randomAddress, randomCity, randomUpdatedDate, randomCreatedDate, randomRateType, randomContractType, randomTaxCode } from '@mui/x-data-grid-generator/services';
import { renderCountry, renderAvatar, renderIncoterm, renderPnl, renderProgress, renderStatus, renderTotalPrice, renderEditCurrency, renderEditProgress, renderEditStatus, renderEditIncoterm } from '@mui/x-data-grid-generator/renderer';
import { CONTRACT_TYPE_OPTIONS, COUNTRY_ISO_OPTIONS_SORTED, CURRENCY_OPTIONS, INCOTERM_OPTIONS, RATE_TYPE_OPTIONS, STATUS_OPTIONS, TAXCODE_OPTIONS } from '@mui/x-data-grid-generator/services/static-data';
import { FormPills } from '../FormIndex/index.js';
import { ClientFormPills } from '../ClientProject';
import { lineHeight } from '@mui/system';
import { getAllProjects } from '../../services/DashboardAPI';
// import { getAllFormResponses } from '../../services/FormResponse'
import { getFormTemplateById } from '../../services/FormTemplate'
import { getAllFormResponses, getFormReponseByVendorId } from '../../services/FormResponse'
// columns will be Project Name, Vendor Name, Avatar (from vendor), Forms (each row is one form), Vendor, Admin, Approver (status tick or X)
import { getCurrentUser } from '../../services/AuthService.js';

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

  // {
  //   field: 'vendor',
  //   headerName: 'Vendor',
  //   flex: 2,
  //   editable: false,
  // },

  // ken help to enable multiline when there are too many forms to fit into 1 lineHeight
  {
    field: 'forms',
    headerName: 'Forms',
    renderCell: (params) => {
      return <ClientFormPills forms={params} />
    },
    editable: false,
    flex: 5,
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



const ClientFormTable = (props) => {
  // const rows = [
  //   { id: 1, vendor: 'Ken Company', project: 'Wack Stuff', forms: [{name: 'Reflection', status: 'partial', link: '/FormView?formResponseId=64174e893e557a26fc1e0d69'}]},
  //   { id: 2, vendor: 'Bryan Company', project: 'Good Stuff', forms: [{name: 'Pre Evaluation Assessment', status: 'unfilled', link: '/FormView?formResponseId=64174e893e557a26fc1e0d69'}, {name: 'Post Eval Report', status: 'complete', link: '/FormResponse'}, {name: 'Reflection', status: 'partial', link: '/FormResponse'}]},
  //   { id: 3, vendor: 'ZX Company', project: 'Smart Stuff', forms: [{name: 'Pre Evaluation Assessment', status: 'unfilled', link: '/FormResponse'}]},
  //   { id: 4, vendor: 'HM Company', project: 'Quick Stuff', forms: [{name: 'Customer Service Form', status: 'complete', link: '/FormResponse'}, {name: 'Post Eval Report', status: 'complete', link: '/FormResponse'}]},
  //   { id: 5, vendor: 'Ber Company', project: 'Amazing Stuff', forms: [{name: 'Pre Evaluation Assessment', status: 'partial', link: '/FormResponse'}, {name: 'Customer Service Form', status: 'unfilled', link: '/FormResponse'}, {name: 'Post Eval Report', status: 'complete', link: '/FormResponse'}, {name: 'Reflection', status: 'complete', link: '/FormResponse'}]},
  //   { id: 6, vendor: 'KM Company', project: 'Wow Stuff', forms: [{name: 'Post Eval Report', status: 'partial', link: '/FormResponse'}]},
  //   { id: 7, vendor: 'Elt Company', project: 'Great Stuff', forms: [{name: 'Post Eval Report', status: 'partial', link: '/FormResponse'}, {name: 'Reflection', status: 'unfilled', link: '/FormResponse'}]},
  // ];
  const [vendorId, setVendorId] = useState(getCurrentUser().id)
  // const [vendorId, setVendorId] = useState("6409dc37e3139a5d267579b3")
  const [rows, setRows] = useState([])
  useEffect(() => {
    let newrows = [];
    // GET request using axios inside useEffect React hook
    getAllProjects()
      .then(response => {
        let vendorProjects = [];
        //get vendor projects
        for (let project of response) {
          if (project.vendorId.includes(vendorId)) {
            vendorProjects.push(project)
          }
        }
        getAllFormResponses()
          .then(response2 => {
            let vendorForms = [];
            //get vendor forms
            for (let FormResponse of response2) {
              if (FormResponse.vendorId == vendorId) {
                vendorForms.push(FormResponse);
              }
            }
            let idCounter = 0
            let testcount = 0
            //create param for ClientFormPill
            for (let project1 of vendorProjects) {
              idCounter++
              let param = { id: idCounter, project: project1.projectName };
              var forms = [];
              for (let FormResponse of vendorForms) {
                if (project1.projectID === FormResponse.projectId) {

                  getFormTemplateById(FormResponse.formTemplateId)
                    .then(response => {
                      let formLink = "FormView?formResponseId=" + FormResponse.formResponseId
                      testcount++
                      let formDetails = { name: response.formName, status: FormResponse.status, link: formLink }
                      forms.push(formDetails)
                      
                    })
                    .catch (error => { 
                      console.log(error.message); 
                    })


                }

              }
              
              param["forms"] = forms;
              newrows.push(param);
            }
            setRows(newrows);




          })

      })
      .catch(error => {
        console.log(error.message)
      })
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  return (
    <Box sx={{ width: '80%', overflowX: 'auto', }}
      display={"flex"}
      justifyContent={"center"}
      marginX={"auto"}

    >
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
        sx={{
          '& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaderTitle': {
            backgroundColor: "primary.main",
            color: "white",
            fontWeight: 'bold',
          },
        }}

      />
    </Box>
  )
};

export default ClientFormTable;
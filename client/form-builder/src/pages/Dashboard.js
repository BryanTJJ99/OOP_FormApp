import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { randomColor, randomDesk, randomEmail, randomFeeRate, generateFilledQuantity, randomId, randomIncoterm, generateIsFilled, randomQuantity, randomTraderName, randomUnitPrice, randomUnitPriceCurrency, randomStatusOptions, randomPnL, randomTradeDate, randomMaturityDate, randomBrokerId, randomCompanyName, randomCountry, randomCurrency, randomAddress, randomCity, randomUpdatedDate, randomCreatedDate, randomRateType, randomContractType, randomTaxCode } from '@mui/x-data-grid-generator/services';
import { renderCountry, renderAvatar, renderIncoterm, renderPnl, renderProgress, renderStatus, renderTotalPrice, renderEditCurrency, renderEditProgress, renderEditStatus, renderEditIncoterm } from '@mui/x-data-grid-generator/renderer';
import { CONTRACT_TYPE_OPTIONS, COUNTRY_ISO_OPTIONS_SORTED, CURRENCY_OPTIONS, INCOTERM_OPTIONS, RATE_TYPE_OPTIONS, STATUS_OPTIONS, TAXCODE_OPTIONS } from '@mui/x-data-grid-generator/services/static-data';
// columns will be Project Name, Vendor Name, Avatar (from vendor), Forms (each row is one form), Vendor, Admin, Approver (status tick or X)

const columns: GridColDef[] = [
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
      generateData: randomColor,
      renderCell: renderAvatar,
      valueGetter: params => params.row.vendorName == null || params.row.avatar == null ? null : {
        name: params.row.vendorName,
        color: params.row.avatar
      },
      sortable: false,
      filterable: false,
      groupable: false,
      aggregable: false,
      disableExport: true
    },
    {
      field: 'vendorEmail',
      headerName: 'Email',
      width: 150,
      editable: true,
    },
    {
      field: 'form',
      headerName: 'Form',
      description: 'This column has a value getter and is not sortable.',
      editable: false,
      width: 250,
    }, {
      field: 'status',
      headerName: 'Status',
      generateData: randomStatusOptions,
      renderCell: renderStatus,
      renderEditCell: renderEditStatus,
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
    { id: 1, projectName: 'Cloud', vendorName: 'Kong Leong', avatar: '',vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 2, projectName: 'Cloud', vendorName: 'Justin', avatar: '',vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Rejected'},
    { id: 3, projectName: 'DigiX', vendorName: 'Accenture', avatar: '',vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'PartiallyFilled'},
    { id: 4, projectName: 'DigiX', vendorName: 'Tata', avatar: '',vendorEmail: 'abc@gmail.com' ,form: 'Safety Assessment', status: 'Open'},
    { id: 5, projectName: 'SmartNation', vendorName: 'NCS', avatar: '',vendorEmail: 'abc@gmail.com' ,form: 'Optional Sub-Contractor survey', status: 'Reviewed'},
    { id: 6, projectName: '5G', vendorName: 'NCS', avatar: '',vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 7, projectName: '5G', vendorName: 'NCS', avatar: '',vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 8, projectName: '5G', vendorName: 'NCS', avatar: '',vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 9, projectName: '5G', vendorName: 'NCS', avatar: '',vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 10, projectName: '5G', vendorName: 'NCS', avatar: '',vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
    { id: 11, projectName: '5G', vendorName: 'NCS', avatar: '',vendorEmail: 'abc@gmail.com' ,form: 'Pre Evaluation Assessment', status: 'Filled'},
  ];
  
const Dashboard = () => {
    return (
      <Box sx={{ height: 735, width: '80%', }}
        display={"flex"}
        justifyContent={"center"}
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
    )
};

export default Dashboard;
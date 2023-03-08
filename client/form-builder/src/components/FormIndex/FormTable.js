import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { randomColor, randomDesk, randomEmail, randomFeeRate, generateFilledQuantity, randomId, randomIncoterm, generateIsFilled, randomQuantity, randomTraderName, randomUnitPrice, randomUnitPriceCurrency, randomStatusOptions, randomPnL, randomTradeDate, randomMaturityDate, randomBrokerId, randomCompanyName, randomCountry, randomCurrency, randomAddress, randomCity, randomUpdatedDate, randomCreatedDate, randomRateType, randomContractType, randomTaxCode } from '@mui/x-data-grid-generator/services';
import { renderCountry, renderAvatar, renderIncoterm, renderPnl, renderProgress, renderStatus, renderTotalPrice, renderEditCurrency, renderEditProgress, renderEditStatus, renderEditIncoterm } from '@mui/x-data-grid-generator/renderer';
import { CONTRACT_TYPE_OPTIONS, COUNTRY_ISO_OPTIONS_SORTED, CURRENCY_OPTIONS, INCOTERM_OPTIONS, RATE_TYPE_OPTIONS, STATUS_OPTIONS, TAXCODE_OPTIONS } from '@mui/x-data-grid-generator/services/static-data';
import { FormPills } from './index.js';
import { lineHeight } from '@mui/system';
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
      field: 'vendor',
      headerName: 'Vendor',
      width: 250,
      editable: false,
    },

    {
      field: 'project',
      headerName: 'Project',
      width: 250,
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
      width: 500,
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
    const rows = [
      { id: 1, vendor: 'Ken Company', project: 'Wack Stuff', forms: [{name: 'Reflection', status: 'partial', link: '/FormBuilder'}]},
      { id: 2, vendor: 'Bryan Company', project: 'Good Stuff', forms: [{name: 'Pre Evaluation Assessment', status: 'unfilled', link: '/FormBuilder'}, {name: 'Post Eval Report', status: 'complete', link: '/FormBuilder'}, {name: 'Reflection', status: 'partial', link: '/FormBuilder'}]},
      { id: 3, vendor: 'ZX Company', project: 'Smart Stuff', forms: [{name: 'Pre Evaluation Assessment', status: 'unfilled', link: '/FormBuilder'}]},
      { id: 4, vendor: 'HM Company', project: 'Quick Stuff', forms: [{name: 'Customer Service Form', status: 'complete', link: '/FormBuilder'}, {name: 'Post Eval Report', status: 'complete', link: '/FormBuilder'}]},
      { id: 5, vendor: 'Ber Company', project: 'Amazing Stuff', forms: [{name: 'Pre Evaluation Assessment', status: 'partial', link: '/FormBuilder'}, {name: 'Customer Service Form', status: 'unfilled', link: '/FormBuilder'}, {name: 'Post Eval Report', status: 'complete', link: '/FormBuilder'}, {name: 'Reflection', status: 'complete', link: '/FormBuilder'}]},
      { id: 6, vendor: 'KM Company', project: 'Wow Stuff', forms: [{name: 'Post Eval Report', status: 'partial', link: '/FormBuilder'}]},
      { id: 7, vendor: 'Elt Company', project: 'Great Stuff', forms: [{name: 'Post Eval Report', status: 'partial', link: '/FormBuilder'}, {name: 'Reflection', status: 'unfilled', link: '/FormBuilder'}]},
    ];

    return (
      <Box sx={{ width: '80%', }}
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
        />
    </Box>
    )
};

export default FormTable;
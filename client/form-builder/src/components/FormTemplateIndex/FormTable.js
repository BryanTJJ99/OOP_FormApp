import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { randomColor, randomDesk, randomEmail, randomFeeRate, generateFilledQuantity, randomId, randomIncoterm, generateIsFilled, randomQuantity, randomTraderName, randomUnitPrice, randomUnitPriceCurrency, randomStatusOptions, randomPnL, randomTradeDate, randomMaturityDate, randomBrokerId, randomCompanyName, randomCountry, randomCurrency, randomAddress, randomCity, randomUpdatedDate, randomCreatedDate, randomRateType, randomContractType, randomTaxCode } from '@mui/x-data-grid-generator/services';
import { renderCountry, renderAvatar, renderIncoterm, renderPnl, renderProgress, renderStatus, renderTotalPrice, renderEditCurrency, renderEditProgress, renderEditStatus, renderEditIncoterm } from '@mui/x-data-grid-generator/renderer';
import { CONTRACT_TYPE_OPTIONS, COUNTRY_ISO_OPTIONS_SORTED, CURRENCY_OPTIONS, INCOTERM_OPTIONS, RATE_TYPE_OPTIONS, STATUS_OPTIONS, TAXCODE_OPTIONS } from '@mui/x-data-grid-generator/services/static-data';
import { FormPills } from './index.js';
import { lineHeight } from '@mui/system';
import moment from 'moment';
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
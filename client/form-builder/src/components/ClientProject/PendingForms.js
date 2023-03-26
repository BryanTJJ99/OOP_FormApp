import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box, Button, Card, Stack } from "@mui/material";




const PendingForms = (props) => {
  if(props.qtyPendingForms == 0){
  return (
    <>
      <Box>
        You currently have no pending forms.
      </Box>
    </>
  );}
  else{
    return (
      <>
        <Box>
          You currently have {props.qtyPendingForms} pending forms.
        </Box>
      </>
    );}
  }


export default PendingForms
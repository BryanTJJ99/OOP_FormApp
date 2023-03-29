import React, { useEffect, useState } from 'react';
import { Typography, Card, Box } from '@mui/material';

const SectionView = (props) => {
    function toTitleCase(str) {
        return str.toLowerCase().split(' ').map(function (word) {
          return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
      }

    return (
        <Card variant="outlined" className="mt-5 mx-5 mb-3">
            <Box className="text-left" backgroundColor={props.disabled ? "grey.main" : "primary.main"} paddingX={2} paddingY={1}>
                <Typography variant='h6' sx={{fontWeight: 'bold'}} color="white">{props.section.sectionName}</Typography>
                <Typography variant='p' color='grey.light'>Assigned to: {toTitleCase(props.section.assignedTo)}</Typography>
            </Box>
        </Card>
    )
}

export default SectionView;
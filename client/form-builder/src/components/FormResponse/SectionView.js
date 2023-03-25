import React, { useEffect, useState } from 'react';
import { Typography, Card, Box } from '@mui/material';

const SectionView = (props) => {
    return (
        <Card variant="outlined" className="mt-5 mx-5 mb-3">
            <Box className="text-left" backgroundColor="primary.main" paddingX={2} paddingY={1}>
                <Typography variant='h6' sx={{fontWeight: 'bold'}} color="white">{props.section.sectionName}</Typography>
                <Typography variant='p' color='grey.light'>Assigned to: Vendor</Typography>
            </Box>
        </Card>
    )
}

export default SectionView;
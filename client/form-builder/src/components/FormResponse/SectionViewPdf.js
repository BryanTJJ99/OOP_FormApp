import React, { useEffect, useState } from 'react';
import { Typography, Card, Box } from '@mui/material';

const SectionView = (props) => {
    function toTitleCase(str) {
        return str.toLowerCase().split(' ').map(function (word) {
          return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
      }

    return (
        <div variant="outlined" className="mt-5 mx-5 mb-3 card-header bg-dark">
            <div className="text-left" backgroundColor={"primary.main"} paddingX={2} paddingY={1}>
                <h6 sx={{fontWeight: 'bold'}} className='text-white'>{toTitleCase(props.section.sectionName)}</h6>
                <p className='text-light mb-0'>Assigned to: {toTitleCase(props.section.assignedTo)}</p>
            </div>
        </div>
    )
}

export default SectionView;
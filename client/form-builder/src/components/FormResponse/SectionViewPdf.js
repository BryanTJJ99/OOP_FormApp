import React, { useEffect, useState } from 'react';
import { Typography, Card, Box } from '@mui/material';

const SectionView = (props) => {
    function toTitleCase(str) {
        return str.toLowerCase().split(' ').map(function (word) {
          return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
      }

    return (
        <div variant="outlined" className="mt-5 mx-5 mb-3 card-header bg-dark" style={{backgroundColor: 'black', marginTop:'10px'}}>
            <div className="text-left" backgroundColor={"primary.main"} paddingX={2} paddingY={1}>
                <h3 sx={{fontWeight: 'bold'}} style={{color:'white', marginBottom:0, marginLeft:'10px', marginTop:'15px'}} className='text-white'>{toTitleCase(props.section.sectionName)}</h3>
                <p className='text-light mb-0' style={{color:'white', marginBottom:'10px', marginLeft:'10px'}} >Assigned to: {toTitleCase(props.section.assignedTo)}</p>
            </div>
        </div>
    )
}

export default SectionView;
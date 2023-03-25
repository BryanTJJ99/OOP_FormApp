import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';




const Counter = (props) => {
  let displayStatus = "none";
  if (props.counterTitle.includes("Project")){
    displayStatus = "true";
  }
  
  return (
    <>
      <div>{props.counterTitle}</div>
      <Typography component="p" variant="h4">
        {props.count}
      </Typography>
      
      <div>
        <Link sx={{display:displayStatus}}color="primary" href="/FormResponses" >
          View Projects
        </Link>
      </div>
    </>
  );
}

export default Counter
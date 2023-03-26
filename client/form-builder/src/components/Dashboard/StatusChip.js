import * as React from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import InfoIcon from '@mui/icons-material/Info';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonIcon from '@mui/icons-material/Person';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { jsx as _jsx } from "react/jsx-runtime";

const StatusChip = (props) => {
    let color;
    let icon;
    let status = props.status.toLowerCase();
    if (status === null || status === ''){
      status = 'open'
    }
    switch(status) {
        case "approved":
            color = "success"
            icon = <DoneIcon/>
            break;
        case "vendor":
            color = "cyan"
            icon = <PersonIcon/>
            break;
        case "approver":
            color = "indigo"
            icon = <BeenhereIcon/>
            break;
        case "rejected":
            color = "error"
            icon = <ReportProblemIcon/>
            break
        case "admin":
            color = "info"
            icon = <ContentPasteSearchIcon/>
            break
      }
    
    let actualChip; 
    if (props.projPill) { 
      actualChip = <Chip icon={icon} label={props.name} variant="outlined" color={color} component="a" href={props.link} sx={{mr:1}}/>
    } else { 
      actualChip = <Chip icon={icon} label={toTitleCase(status)} variant="outlined" color={color}/>
    }

    function toTitleCase(str) {
      return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
      }).join(' ');
    }
    
    return (
        <>
         {actualChip}
        </>
    )
}
export default StatusChip




















const StyledChip = styled(Chip)(({
  theme
}) => ({
  justifyContent: 'left',
  '& .icon': {
    color: 'inherit'
  },
  '&.Open': {
    color: (theme.vars || theme).palette.info.dark,
    // backgroundColor: (theme.vars || theme).palette.info.dark,
    border: `1px solid ${(theme.vars || theme).palette.info.main}`
  },
  '&.Filled': {
    color: (theme.vars || theme).palette.success.dark,
    // backgroundColor: (theme.vars || theme).palette.info.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`
  },
  '&.Reviewed': {
    color: (theme.vars || theme).palette.success.dark,
    // backgroundColor: (theme.vars || theme).palette.info.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`
  },
  '&.Approved': {
    color: (theme.vars || theme).palette.success.dark,
    // backgroundColor: (theme.vars || theme).palette.info.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`
  },
  '&.PartiallyFilled': {
    color: (theme.vars || theme).palette.warning.dark,
    // backgroundColor: (theme.vars || theme).palette.info.dark,
    border: `1px solid ${(theme.vars || theme).palette.warning.main}`
  },
  '&.Rejected': {
    color: (theme.vars || theme).palette.error.dark,
    // backgroundColor: (theme.vars || theme).palette.info.dark,
    border: `1px solid ${(theme.vars || theme).palette.error.main}`
  }
}));
const Status = /*#__PURE__*/React.memo(props => {
  const {
    status
  } = props;
  let icon = null;
  if (status === 'Rejected') {
    icon = /*#__PURE__*/_jsx(ReportProblemIcon, {
      className: "icon"
    });
  } else if (status === 'Open') {
    icon = /*#__PURE__*/_jsx(InfoIcon, {
      className: "icon"
    });
  } else if (status === 'PartiallyFilled') {
    icon = /*#__PURE__*/_jsx(AutorenewIcon, {
      className: "icon"
    });
  } else if (status === 'Filled') {
    icon = /*#__PURE__*/_jsx(DoneIcon, {
      className: "icon"
    });
  } else if (status === 'Approved' ) {
    icon = /*#__PURE__*/_jsx(HowToRegIcon, {
      className: "icon"
    });
  } else if (status === 'Reviewed') {
    icon = /*#__PURE__*/_jsx(DoneAllIcon, {
      className: "icon"
    });
  }
  let label = status;
  if (status === 'PartiallyFilled') {
    label = 'Partially Filled';
  }
  return /*#__PURE__*/_jsx(StyledChip, {
    className: status,
    icon: icon,
    size: "small",
    label: label,
    variant: "outlined",
  });
});
export function renderStatus(params) {
  if (params.value == null) {
    return '';
  }
  return /*#__PURE__*/_jsx(Status, {
    status: params.value
  });
}
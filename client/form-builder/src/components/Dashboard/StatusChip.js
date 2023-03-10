import * as React from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import InfoIcon from '@mui/icons-material/Info';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { jsx as _jsx } from "react/jsx-runtime";

const StatusChip = ({status}) => {
    let color;
    let icon;
    switch(status) {
        case "Filled":
            color = "success"
            icon = <DoneIcon/>
            break;
        case "Reviewed":
            color = "cyan"
            icon = <DoneAllIcon/>
            break;
        case "Approved":
            color = "indigo"
            icon = <HowToRegIcon/>
            break;
        case "PartiallyFilled":
            color = "warning"
            icon = <AutorenewIcon/>
            break;
        case "Rejected":
            color = "error"
            icon = <ReportProblemIcon/>
            break
        case "Open":
            color = "info"
            icon = <InfoIcon/>
            break
        default:
            color = "info"
            icon = <InfoIcon/>
      }
    return (
        <>
         <Chip icon={icon} label={status} variant="outlined" color={color}/>
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
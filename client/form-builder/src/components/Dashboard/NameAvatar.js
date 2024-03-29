import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
    let initials;
    if (name.split(' ').length === 1){
        initials = name.split(' ')[0][0]
    } else {
        initials = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    }
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials
  }
}

export default function NameAvatar({name}) {
  return (
    <>
      <Avatar sx={{width:5,height:5}} {...stringAvatar(name)} />
    </>
  );
}
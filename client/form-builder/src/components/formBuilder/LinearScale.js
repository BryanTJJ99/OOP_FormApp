import { TextField,Box, Select, MenuItem, FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';

const LinearScale = (props) => { 
    const [minVal, setMinVal] = useState(1); 
    const [maxVal, setMaxVal] = useState(5); 

    return (
        <div className="d-block">
            <div className="d-flex form-group input-group mb-3">
                <div>
                    <Select value={minVal}  onChange={(event) => setMinVal(event.target.value)} label={minVal}>
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                    </Select>
                </div>
                <label className="my-auto mx-3">to</label>
                <div>
                    <Select value={maxVal} onChange={(event) => setMaxVal(event.target.value)} label={minVal}>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                    </Select>
                </div>
            </div>
            <div >
                <div>
                <Box sx={{ display: 'flex', mt:3 }}>
                        <Box sx={{mt:1, mr:2}}>{minVal}</Box>
                        <div class='d-block'>
                            <TextField variant='standard' placeholder="Min value label"></TextField>
                        </div>
                    </Box>
                </div>
                <div className="d-flex">
                
                    <Box sx={{ display: 'flex', mt:3 }}>
                        <Box sx={{mt:1, mr:2}}>{maxVal}</Box>
                        <div class='d-block'>
                            <TextField variant='standard' placeholder="Max value label"></TextField>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default LinearScale;

{/* <div className="d-block">
<div className="d-flex form-group input-group mb-3">
    <div>
        <select value={minVal} className="form-select m-0" onChange={(event) => setMinVal(event.target.value)}>
            <MenuItem>0</MenuItem>
            <MenuItem>1</MenuItem>
        </select>
    </div>
    <label className="my-auto mx-3">to</label>
    <div>
        <select value={maxVal} className="form-select m-0" onChange={(event) => setMaxVal(event.target.value)}>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
            <MenuItem>4</MenuItem>
            <MenuItem>5</MenuItem>
            <MenuItem>6</MenuItem>
            <MenuItem>7</MenuItem>
            <MenuItem>8</MenuItem>
            <MenuItem>9</MenuItem>
            <MenuItem>10</MenuItem>
        </select>
    </div>
</div>
<div className="d-block">
    <div className="d-flex mb-3 row w-50">
        <span className="my-auto col-1">{minVal}</span>
        <input type="text" className="col-5 form-control w-75" placeholder="Min value label"></input>
       
    </div>
    <div className="d-flex row w-50">
        <span className="my-auto col-1">{maxVal}</span>
        <input type="text" className="col-5 form-control w-75" placeholder="Max value label"></input>
    </div>
</div>
</div> */}
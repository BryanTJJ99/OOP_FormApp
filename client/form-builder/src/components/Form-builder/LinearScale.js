import React, { useEffect, useState } from 'react';

const LinearScale = (props) => { 
    const [minVal, setMinVal] = useState(1); 
    const [maxVal, setMaxVal] = useState(5); 

    return (
        <div className="d-block">
            <div className="d-flex form-group input-group mb-3">
                <div>
                    <select value={minVal} className="form-select m-0" onChange={(event) => setMinVal(event.target.value)}>
                        <option>0</option>
                        <option>1</option>
                    </select>
                </div>
                <label className="my-auto mx-3">to</label>
                <div>
                    <select value={maxVal} className="form-select m-0" onChange={(event) => setMaxVal(event.target.value)}>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
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
        </div>
    )
}

export default LinearScale;
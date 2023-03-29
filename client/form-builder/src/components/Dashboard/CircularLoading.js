import React from "react";
import { Box, CircularProgress } from "@mui/material"
import { styled } from "@mui/system"

export default function CircularLoading() {
    const DisabledBackground = styled(Box)({
        width: "100%",
        height: "100%",
        position: "fixed",
        opacity: 0.2,
        zIndex: 4,
    });
    return  (
        <>
            <CircularProgress
                size={70}
                sx={{
                    position:"fixed",
                    left:"50%",
                    top:"50%",
                    transform: "translate(-50%,-50%)",
                    zIndex: 5
                }}
            />
            <DisabledBackground/>
        </>
    )
}
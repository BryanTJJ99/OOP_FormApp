import React, { useState, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import {
    Box,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Alert,
    Link,
} from "@mui/material";

const columns = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 100 },
    {
        field: "username",
        headerName: "Username",
        editable: true,
        flex: 1,
        minWidth: 150,
    },
    {
        field: "email",
        headerName: "Email",
        editable: true,
        flex: 1,
        minWidth: 200,
    },
    {
        field: "role",
        headerName: "Role",
        type: "singleSelect",
        valueOptions: ["Vendor", "Admin", "Approver"],
        editable: true,
        flex: 1,
        minWidth: 100,
    },
];

const rows = [
    { id: 1, username: "Snow", email: "Jon@email.com", role: "Vendor" },
    { id: 2, username: "Lannister", email: "Cersei@email.com", role: "Vendor" },
    { id: 3, username: "Lannister", email: "Jaime@email.com", role: "Admin" },
    { id: 4, username: "Stark", email: "Arya@email.com", role: "Approver" },
];

function computeMutation(newRow, oldRow) {
    for (let field in newRow) {
        if (newRow[field] !== oldRow[field]) {
            return `${field} from '${oldRow[field]}' to '${newRow[field]}'`;
        }
    }
    return null;
}

const AccountManagementPage = () => {
    // const mutateRow = useFakeMutation();
    const [snackbar, setSnackbar] = useState(null);
    const [promiseArguments, setPromiseArguments] = useState(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    const processRowUpdate = useCallback(
        (newRow, oldRow) =>
            new Promise((resolve, reject) => {
                const mutation = computeMutation(newRow, oldRow);
                if (mutation) {
                    // Save the arguments to resolve or reject the promise later
                    setPromiseArguments({ resolve, reject, newRow, oldRow });
                } else {
                    resolve(oldRow); // Nothing was changed
                }
            }),
        []
    );

    const handleNo = () => {
        const { oldRow, resolve } = promiseArguments;
        resolve(oldRow); // Resolve with the old row to not update the internal state
        setPromiseArguments(null);
    };

    const handleYes = async () => {
        const { newRow, oldRow, reject, resolve } = promiseArguments;

        try {
            // Make the HTTP request to save in the backend
            // const response = await mutateRow(newRow);
            setSnackbar({
                children: "User successfully saved",
                severity: "success",
            });
            // resolve(response);
            resolve(newRow);
            setPromiseArguments(null);
        } catch (error) {
            setSnackbar({ children: "Name can't be empty", severity: "error" });
            reject(oldRow);
            setPromiseArguments(null);
        }
    };

    const renderConfirmDialog = () => {
        if (!promiseArguments) {
            return null;
        }

        const { newRow, oldRow } = promiseArguments;
        const mutation = computeMutation(newRow, oldRow);

        return (
            <Dialog maxWidth="xs" open={!!promiseArguments}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent dividers>
                    {`Pressing 'Yes' will change ${mutation}.`}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNo}>No</Button>
                    <Button onClick={handleYes}>Yes</Button>
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <Box sx={{ width: "50%", margin: "50px auto" }}>
            <Link
                to={"/AccountCreation"}
                component={RouterLink}
                underline="none"
                variant="button"
                sx={{
                    display: "block",
                    textAlign: "end",
                }}
            >
                Create New Account
            </Link>
            <Box sx={{ height: "500px", marginTop: "30px" }}>
                {renderConfirmDialog()}
                <DataGrid
                    rows={rows}
                    columns={columns}
                    processRowUpdate={processRowUpdate}
                    // editMode="row"
                    // checkboxSelection
                />
                {!!snackbar && (
                    <Snackbar
                        open
                        onClose={handleCloseSnackbar}
                        autoHideDuration={6000}
                    >
                        <Alert {...snackbar} onClose={handleCloseSnackbar} />
                    </Snackbar>
                )}
            </Box>
        </Box>
    );
};

export default AccountManagementPage;

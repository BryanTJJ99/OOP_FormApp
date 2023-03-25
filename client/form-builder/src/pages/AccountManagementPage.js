import React, { useState, useCallback, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

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
    Autocomplete,
    TextField,
} from "@mui/material";

import {
    Edit as EditIcon,
    DeleteOutlined as DeleteIcon,
    Save as SaveIcon,
    Close as CancelIcon,
} from "@mui/icons-material";

import { GridRowModes, DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import countries from "../components/AccountCreation/Countries";

import axios from "axios";

const AccountManagementPage = (props) => {
    const [snackbar, setSnackbar] = useState(null);
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [promiseArguments, setPromiseArguments] = useState(null);
    const [deleteRow, setDeleteRow] = useState(null);
    const [createdAccount, setCreatedAccount] = useState("false");

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/admin/allUsers")
            .then((response) => {
                let users = response.data;
                for (const user of users) {
                    switch (user.role) {
                        case "ROLE_VENDOR":
                            user.role = "VENDOR";
                            break;
                        case "ROLE_ADMIN":
                            user.role = "ADMIN";
                            break;
                        case "ROLE_APPROVER":
                            user.role = "APPROVER";
                            break;
                        default:
                            break;
                    }
                }
                console.log(users);
                setRows(users);
                props.setCreatedAccount("false");
            });
    }, [props.createdAccount]);

    function sortByCountryName(countriesArr) {
        let newCountriesArr = countriesArr.sort((a, b) => {
            let country1 = a.label;
            let country2 = b.label;
            return country1.localeCompare(country2);
        });
        let countryNames = [];
        for (const country of newCountriesArr) {
            countryNames.push(country.label);
        }
        return countryNames;
    }

    const handleCloseSnackbar = () => setSnackbar(null);

    function computeMutation(newRow, oldRow) {
        let mutations = "";
        for (let field in newRow) {
            if (newRow[field] !== oldRow[field]) {
                mutations += `${field} from '${oldRow[field]}' to '${newRow[field]}'`;
            }
        }
        return mutations;
    }

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id) => () => {
        setDeleteRow(id);
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

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

    const renderConfirmDialog = () => {
        if (!promiseArguments) {
            return null;
        }

        const handleNo = () => {
            const { oldRow, resolve } = promiseArguments;
            resolve(oldRow); // Resolve with the old row to not update the internal state
            setPromiseArguments(null);
        };

        const handleYes = async () => {
            const { newRow, oldRow, reject, resolve } = promiseArguments;
            let userToUpdate = JSON.parse(JSON.stringify(newRow));
            switch (newRow.role) {
                case "VENDOR":
                    userToUpdate.role = "ROLE_VENDOR";
                    break;
                case "ADMIN":
                    userToUpdate.role = "ROLE_ADMIN";
                    break;
                case "APPROVER":
                    userToUpdate.role = "ROLE_APPROVER";
                    break;
                default:
                    break;
            }

            try {
                // Make the HTTP request to save in the backend
                await axios.patch(
                    "http://localhost:8080/api/admin/user/edit",
                    userToUpdate,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                setSnackbar({
                    children: "User successfully saved",
                    severity: "success",
                });
                resolve(newRow);
                setPromiseArguments(null);
            } catch (error) {
                setSnackbar({
                    children: "Fields can't be empty",
                    severity: "error",
                });
                reject(oldRow);
                setPromiseArguments(null);
            }
        };

        const { newRow, oldRow } = promiseArguments;
        const mutations = computeMutation(newRow, oldRow);

        return (
            <Dialog maxWidth="xs" open={!!promiseArguments}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent dividers>
                    {`Pressing 'Yes' will change ${mutations}.`}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNo}>No</Button>
                    <Button onClick={handleYes}>Yes</Button>
                </DialogActions>
            </Dialog>
        );
    };

    const renderDeleteDialog = () => {
        if (!deleteRow) {
            return null;
        }
        const handleCancelDelete = () => {
            setDeleteRow(null);
        };

        const handleConfirmDelete = async () => {
            const userToDelete = rows.filter((row) => row.id === deleteRow)[0];
            let userToUpdateCopy = JSON.parse(JSON.stringify(userToDelete));
            switch (userToDelete.role) {
                case "VENDOR":
                    userToUpdateCopy.role = "ROLE_VENDOR";
                    break;
                case "ADMIN":
                    userToUpdateCopy.role = "ROLE_ADMIN";
                    break;
                case "APPROVER":
                    userToUpdateCopy.role = "ROLE_APPROVER";
                    break;
                default:
                    break;
            }
            try {
                // Make the HTTP request to save in the backend
                await axios.patch(
                    "http://localhost:8080/api/admin/user/delete",
                    userToUpdateCopy,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                setSnackbar({
                    children: "User successfully deleted",
                    severity: "success",
                });
                setRows(rows.filter((row) => row.id !== deleteRow));
                setDeleteRow(null);
            } catch (error) {
                setSnackbar({
                    children: "Error: User could not be deleted",
                    severity: "error",
                });
                setDeleteRow(null);
            }
        };
        const userToDelete = rows.filter((row) => row.id === deleteRow)[0];

        return (
            <Dialog maxWidth="xs" open={!!deleteRow}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent dividers>
                    {`Pressing 'Delete' will delete user with 
                    ID: ${userToDelete.id}
                    Username: ${userToDelete.username}
                    Email: ${userToDelete.email}
                    Role: ${userToDelete.role}`}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>No</Button>
                    <Button onClick={handleConfirmDelete}>Yes</Button>
                </DialogActions>
            </Dialog>
        );
    };

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
            field: "name",
            headerName: "Name",
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
            valueOptions: ["VENDOR", "ADMIN", "APPROVER"],
            editable: true,
            flex: 1,
            minWidth: 100,
        },
        {
            field: "country",
            headerName: "Country",
            type: "singleSelect",
            valueOptions: sortByCountryName(countries),
            editable: true,
            flex: 1,
            minWidth: 100,
        },
        // {
        //     field: "country",
        //     headerName: "Country",
        //     editable: true,
        //     flex: 1,
        //     minWidth: 200,
        //     renderCell: (params) => (
        //         <Autocomplete
        //             disabled={GridRowModes == "Edit" ? true : false}
        //             disablePortal
        //             id="countrySelect"
        //             options={sortByCountryName(countries)}
        //             sx={{ width: "100%" }}
        //             autoHighlight
        //             renderInput={(params) => <TextField {...params} />}
        //         />
        //     ),
        // },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box sx={{ width: "90%", margin: "50px auto" }}>
            <Link
                to={"/AccountCreation"}
                component={RouterLink}
                underline="none"
                variant="button"
                sx={{
                    display: "block",
                    textAlign: "end",
                }}
                setCreatedAccount={setCreatedAccount}
            >
                Create New Account
            </Link>
            <Box
                sx={{
                    marginTop: "30px",
                    height: "500px",
                    width: "100%",
                    "& .actions": {
                        color: "text.secondary",
                    },
                    "& .textPrimary": {
                        color: "text.primary",
                    },
                }}
            >
                {renderConfirmDialog()}
                {renderDeleteDialog()}
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
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

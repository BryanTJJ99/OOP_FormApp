import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { FormPills } from "../FormIndex/index.js";
import { ClientFormPills } from "../ClientProject";
import { lineHeight } from "@mui/system";
import { getAllProjects } from "../../services/DashboardAPI";
import { getAllFormResponses } from "../../services/FormResponse";
import { getFormTemplateById } from "../../services/FormTemplate";
// columns will be Project Name, Vendor Name, Avatar (from vendor), Forms (each row is one form), Vendor, Admin, Approver (status tick or X)
import { getCurrentUser } from '../../services/AuthService.js';

const columns: GridColDef[] = [
    {
        field: "project",
        headerName: "Project",
        flex: 2,
        editable: false,
    },

    // ken help to enable multiline when there are too many forms to fit into 1 lineHeight
    {
        field: "forms",
        headerName: "Forms",
        renderCell: (params) => {
            return <ClientFormPills forms={params} />;
        },
        editable: false,
        flex: 5,
    },
];

const ClientFormTable = (props) => {
    // const [vendorId, setVendorId] = useState(getCurrentUser().id)
    const [rows, setRows] = useState([]);
    const vendorId = props.vendorId;

    useEffect(() => {
        let newrows = [];
        // GET request using axios inside useEffect React hook
        getAllProjects()
            .then((response) => {
                let vendorProjects = [];
                //get vendor projects
                for (let project of response) {
                    if (project.vendorId.includes(vendorId)) {
                        vendorProjects.push(project);
                    }
                }
                getAllFormResponses().then(async (response2) => {
                    let vendorForms = [];
                    //get vendor forms
                    for (let FormResponse of response2) {
                        if (FormResponse.vendorId == vendorId) {
                            vendorForms.push(FormResponse);
                        }
                    }
                    let idCounter = 0;
                    let testcount = 0;

                    //create param for ClientFormPill
                    for (let project1 of vendorProjects) {
                        idCounter++;
                        let param = {
                            id: idCounter,
                            project: project1.projectName,
                        };
                        var forms = [];
                        for (let FormResponse of vendorForms) {
                            if (project1.projectID == FormResponse.projectId) {
                                const response = await getFormTemplateById(
                                    FormResponse.formTemplateId
                                );
                                let formLink =
                                    "FormResponse?formResponseId=" +
                                    FormResponse.formResponseId;
                                testcount++;
                                let formDetails = {
                                    name: response.formName,
                                    status: FormResponse.status,
                                    link: formLink,
                                };
                                forms.push(formDetails);
                            }
                        }

                        param["forms"] = forms;
                        newrows.push(param);
                    }
                    setRows(newrows);
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    return (
        <Box
            sx={{ width: "100%", overflowX: "auto",mx:0,px:0 }}
            display={"flex"}
            justifyContent={"center"}
            marginX={"auto"}
        >
            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                checkboxSelection={false}
                disableRowSelectionOnClick
                sx={{
                    "& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaderTitle":
                        {
                            backgroundColor: "primary.main",
                            color: "white",
                            fontWeight: "bold",
                        },
                    mx:0,
                    px:0,
                }}
            />
        </Box>
    );
};

export default ClientFormTable;

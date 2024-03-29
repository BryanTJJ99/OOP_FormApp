import React, { useEffect, useState, useRef } from "react";
import {
    TextField,
    Box,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@mui/material";
import {
    FormInfo,
    QuestionView,
    SectionView,
    QuestionViewPdf,
    SectionViewPdf,
} from "../components/FormResponse/index.js";
import { getFormTemplateById } from "../services/FormTemplate.js";
import {
    updateFormResponse,
    getFormResponseById,
    updateFilesInFormAnswer,
    generatePdf,
} from "../services/FormResponse.js";
import StatusChip from "../components/Dashboard/StatusChip.js";
import { getCurrentUserRole } from "../services/AuthService.js";
import html2pdf from "html2pdf.js";
import ReactToPrint, { toPdf } from "react-to-print";
import { PDFDownloadLink } from "@react-pdf/renderer";
import jsPDF from "jspdf";
import QuantumLeapLogo from "../assets/QuantumLeapLogo.png";
import { sendCustomEmail } from "../services/EmailAPI.js";

const FormResponse = (props) => {
    const [questionsSectionArea, setQuestionsSectionArea] = useState(Array(0));
    const [formResponse, setFormResponse] = useState(null);
    const [formTemplate, setFormTemplate] = useState(null);
    const [formInfo, setFormInfo] = useState(null);
    const [fileMap, setFileMap] = useState({});
    const [nextStage, setNextStage] = useState("vendor");
    const [statusSection, setStatusSection] = useState(null);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [currStage, setCurrStage] = useState(null);
    const [emailMessage, setEmailMessage] = useState(null);
    const [submitButton, setSubmitButton] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [saveState, setSaveState] = useState(false);
    const formRef = useRef(null);
    const [versHist, setVersHist] = useState("default");
    const [formAnswer, setFormAnswer] = useState(null);
    const [pdfElement, setPdfElement] = useState(null);
    const [changeInput, setChangeInput] = useState([]);

    const nextStageRef = {
        vendor: "admin",
    };

    const userRoleRef = {
        ROLE_VENDOR: "vendor",
        ROLE_ADMIN: "admin",
        ROLE_APPROVER: "approver",
    };

    const handleNextStageChange = (event) => {
        console.log(event.target.value);
        setNextStage(event.target.value);
    };

    const handleEmailMessageChange = (event) => {
        console.log(event.target.value);
        setEmailMessage(event.target.value);
    };

    function handlePopUpClose() {
        setOpenPopUp(false);
    }

    function handlePopUpOpen() {
        setOpenPopUp(true);
    }

    async function handleIgnoreRequiredFields(event) {
        event.preventDefault();
        const form = formRef.current;
        const fields = form.querySelectorAll("[required]");
        fields.forEach((field) => {
            field.required = false;
        });
        await setSaveState(true);
        submitForm();
    }

    async function handleFormResponseSubmit(e) {
        console.log('ewoifjw')
        // let form = document.getElementById('form');
        // handleFormResponseSubmit();
        // form.submit();
        e.preventDefault();
        setOpenPopUp(false);
        

        const data = new FormData(e.currentTarget);
        let numOfQuestions = formTemplate.questions.length;
        let listOfMultiSelect = [];
        for (let ques of formTemplate.questions) {
            if (ques.questionType === "checkbox") {
                listOfMultiSelect.push(ques.questionOrder);
            }
        }
        console.log("fileMap", fileMap);
        for (let i = 1; i <= numOfQuestions; i++) {
            let dataToStore = data.get(i.toString());
            console.log(i, dataToStore);
            if (dataToStore instanceof File) {
                if (dataToStore.size === 0) {
                    continue;
                }
            }
            if (listOfMultiSelect.includes(i)) {
                dataToStore = data.get(i.toString()).split(",");
            }
            if (i in fileMap) {
                let fileToStore = fileMap[i.toString()];
                if (fileToStore[1] === null) {
                    continue;
                }
                if (!(fileToStore instanceof File)) {
                    dataToStore = [fileToStore[1], fileToStore[2]];
                } else {
                    console.log(fileToStore);
                    let file_type = fileToStore.type;
                    const reader = new FileReader();
                    // reader.readAsDataURL(fileToStore);
                    await readFileAsync(fileToStore, reader)
                        .then((result) => {
                            dataToStore = [result, file_type];
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                    // let base64String;
                    // reader.onload = function () {
                    //     console.log(reader, reader.result)
                    //     base64String = reader.result.split(',')[1];
                    //     dataToStore = base64String;
                    // };
                }
            }
            if (dataToStore !== null) {
                formAnswer[i] = dataToStore;
                setFormAnswer(formAnswer);
            }
        }
        let today = new Date();
        let statusUpdated;
        if (saveState) {
            statusUpdated = currStage;
        } else if (currStage === "vendor") {
            statusUpdated = nextStageRef[currStage];
        } else {
            statusUpdated = nextStage;
        }
        
        let formResponseData = {
            formResponseId: formResponse.formResponseId,
            status: statusUpdated,
            formAnswer: formAnswer,
            updatedAt: today.toJSON(),
        };
        // console.log(fileMap);
        // let formData = new FormData();
        // formData.append("formResponse", JSON.stringify(formResponseData));
        // for (const [key, value] of Object.entries(fileMap)) {
        //     formData.append(`fileMap`, value);
        // }
        // formData.append("fileMap", fileMap);
        // formData.append("formResponse", `{"formTemplateId":"6414f557b713704fd25c1b34","vendorId":"6409dc37e3139a5d267579b3","reviewedBy":"6411538f436af646394c3fe4","approvedBy":"6409dc0be3139a5d267579b2","status":"open","formAnswer":{"1":"ken","2":"ken is sleeping","3":"0","4":["1","2"],"5":"0","6":""}}`);
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]);
        // }

        await setPdfElement(
            <Box id="formToPrint" display='none'>
                <h1>Quantum Leap Incorporation Pte Ltd</h1>
                {questionsSectionArea.map((item) => {
                    if (item.hasOwnProperty("sectionId")) {
                        if (
                            userRoleRef[userRole] === formResponse.status &&
                            userRoleRef[userRole] === item.assignedTo
                        ) {
                            access = true;
                        } else {
                            access = false;
                        }
                        // console.log(userRoleRef[userRole], formResponse.status, item.assignedTo)
                        return (
                            <SectionViewPdf
                                section={item}
                                key={"Section" + item.sectionOrder}
                                disabled={!access}
                            ></SectionViewPdf>
                        );
                    } else {
                        let required = false;
                        if (access && item.isRequired) {
                            required = true;
                        }
                        return (
                            <QuestionViewPdf
                                question={item}
                                key={"Question" + item.questionOrder}
                                handleFileUpload={handleFileUpload}
                                response={formResponse}
                                disabled={!access}
                                required={required}
                            ></QuestionViewPdf>
                        );
                    }
                })}
            </Box>)
        
        console.log(document.getElementById("formToPrint").innerHTML);
        const inputHtml = document.getElementById("formToPrint").innerHTML;

        // Use a regular expression to add closing tags
        const fixedInputHtml = inputHtml.replace(/<input.*?>/g, (match) => {
            if (match.endsWith("/>")) {
                return match; // Don't add closing tag if input is self-closing
            }
            return `${match}</input>`;
        });

        const fixedBrHtml = fixedInputHtml.replace(/<br.*?>/g, (match) => {
            return `${match}</br>`;
        });

        let newVersionHist = { ...formResponse.versionHistory };
        let todayArray = today.toString().split(" ").slice(1, 5);
        newVersionHist[
            todayArray[1] +
                " " +
                todayArray[0] +
                " " +
                todayArray[2] +
                ", " +
                todayArray[3]
        ] = fixedBrHtml;

        formResponseData.versionHistory = newVersionHist;

        updateFormResponse(formResponseData)
            .then((response) => {
                console.log(formResponseData);
                console.log(response);
            })
            .catch((error) => {
                console.log(error.message);

            });
        
        if (saveState === false) { 
            let emailData = {
                vendorEmail: "bernice.teo.2021@smu.edu.sg", // hardcoded to Bernice's email
                subject:
                    formTemplate.formName +
                    " has been updated to " +
                    statusUpdated +
                    " status",
                message: emailMessage,
            };
    
            sendCustomEmail(emailData)
                .then((response) => {
                    console.log(response);
                    
                })
                .catch((error) => {
                    console.log(error.message);
                });
            
            if (userRole === "ROLE_VENDOR") {
                window.location.href = "/ClientProject";
            } else {
                window.location.href = "/Project";
            }
        }

        if (userRole === "ROLE_VENDOR") {
            window.location.href = "/ClientProject";
        } else {
            window.location.href = "/Project";
        }

        // updateFilesInFormAnswer(fileMap, "64164098499249116ec5c17e")
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log(error.message);
        //     })
    }

    async function readFileAsync(file, reader) {
        return new Promise((resolve, reject) => {
            reader.onload = () => {
                let base64String = reader.result.split(",")[1];
                resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function handleFileUpload(questionOrder, fileToUpload) {
        let newFileMap = { ...fileMap };
        newFileMap[questionOrder] = fileToUpload;
        setFileMap(newFileMap);
    }

    function submitForm() {
        // let form = document.getElementById('form');
        // handleFormResponseSubmit();
        // form.submit();
        setOpenPopUp(false);
        let submitButton1 = document.getElementById("submitButton");
        console.log(submitButton1)
        submitButton1.click();
        // let formSubmit = document.getElementById('form'); 
        // formSubmit.submit();
        console.log(formInfo);
    }

    useEffect(() => {
        // let newQuestionsSectionArea = [...questionsSectionArea, <QuestionView />];
        // setQuestionsSectionArea(newQuestionsSectionArea);
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const formResponseId = urlParams.get("formResponseId");
        getFormResponseById(formResponseId).then((response) => {
            setFormResponse(response);
            setFormAnswer(response.formAnswer);
            let copyUserRole = getCurrentUserRole();
            console.log(response)
            let disabled = (userRoleRef[copyUserRole] !== response.status);
            setSubmitButton(
                <Box display={"flex"} sx={{ float: "right" }} className="me-5">
                    <Box marginRight={2}>
                        <Button
                            variant="contained"
                            onClick={handleIgnoreRequiredFields}
                            disabled={disabled}
                        >
                            Save
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            onClick={handlePopUpOpen}
                            disabled={disabled}
                        >   
                            Submit Form
                        </Button>
                        
                    </Box>
                </Box>
            );
            setUserRole(copyUserRole);
            let formTemplateId = response.formTemplateId;
            getFormTemplateById(formTemplateId)
                .then((response) => {
                    setFormTemplate(response);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        });
    }, []);

    const emailRecipient = {
        vendor: "Admin",
        admin: "Approver",
        approver: "Vendor and Admin",
    };

    const handleVersionHistChange = (event) => {
        setVersHist(event.target.value);
        console.log(event.target.value, formResponse.versionHistory);
        console.log(formResponse.versionHistory[event.target.value]);
        generatePdf(formResponse.versionHistory[event.target.value])
            .then((response) => {
                console.log(response.data);
                const link = document.createElement("a");
                link.setAttribute("href", `${response.data}`);
                link.setAttribute("download", event.target.value);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        if (formTemplate !== null) {
            setFormInfo(<FormInfo formTemplate={formTemplate} />);
            let currStatus = formResponse.status;
            setCurrStage(currStatus);
            setNextStage(currStatus);
            let versionHistoryButtons = [];
            for (let date in formResponse.versionHistory) {
                versionHistoryButtons.push(
                    <MenuItem value={date}>{date}</MenuItem>
                );
            }
            setStatusSection(
                <Box
                    display={"flex"}
                    justifyContent="space-between"
                    className="mx-5 mt-5"
                >
                    <Box display="flex">
                        <Typography marginY={"auto"} marginRight={1}>
                            Status:
                        </Typography>
                        <Box marginY="auto">
                            <StatusChip status={currStatus}></StatusChip>
                        </Box>
                    </Box>
                    <Box>
                        <Select
                            onChange={handleVersionHistChange}
                            value={versHist}
                        >
                            <MenuItem value={"default"} disabled>
                                Choose a version history to print
                            </MenuItem>
                            {versionHistoryButtons}
                        </Select>
                    </Box>
                </Box>
            );
            let questionSectionDict = {};
            console.log(formTemplate); // give an Axios error
            for (let section of formTemplate.sections) {
                questionSectionDict[section.sectionOrder] = [];
            }
            for (let question of formTemplate.questions) {
                questionSectionDict[question.belongsToSection].push(question);
            }
            let newQuestionsSectionArea = [];
            for (let sectionOrderKey in questionSectionDict) {
                for (let section of formTemplate.sections) {
                    if (section.sectionOrder === parseInt(sectionOrderKey)) {
                        newQuestionsSectionArea.push(section);
                        break;
                    }
                }
                for (let question of questionSectionDict[sectionOrderKey]) {
                    newQuestionsSectionArea.push(question);
                }
            }
            setQuestionsSectionArea(newQuestionsSectionArea);
        }
    }, [formTemplate]);

    let access;

    useEffect(() => { 
        console.log("oiwej")
        console.log(pdfElement)
        
    }, [questionsSectionArea, changeInput])

    return (
        <div>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                crossOrigin="anonymous"
            ></link>
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                crossOrigin="anonymous"
            ></script>
            {formInfo}
            {statusSection}
            <Box
                component="form"
                onSubmit={handleFormResponseSubmit}
                id="form"
                ref={formRef}
            >
                {questionsSectionArea.map((item) => {
                    if (item.hasOwnProperty("sectionId")) {
                        if (
                            userRoleRef[userRole] === formResponse.status &&
                            userRoleRef[userRole] === item.assignedTo
                        ) {
                            access = true;
                        } else {
                            access = false;
                        }
                        // console.log(userRoleRef[userRole], formResponse.status, item.assignedTo)
                        return (
                            <SectionView
                                section={item}
                                key={"Section" + item.sectionOrder}
                                disabled={!access}
                            ></SectionView>
                        );
                    } else {
                        let required = false;
                        if (access && item.isRequired) {
                            required = true;
                        }
                        return (
                            <QuestionView
                                question={item}
                                key={"Question" + item.questionOrder}
                                handleFileUpload={handleFileUpload}
                                response={formResponse}
                                disabled={!access}
                                required={false}
                                handleChange={setChangeInput}
                            ></QuestionView>
                        );
                    }
                })}
                {submitButton}
                <button
                    type="submit"
                    className="d-none"
                    id="submitButton"
                ></button>
            </Box>

            {pdfElement}

            <Dialog
                open={openPopUp}
                onClose={handlePopUpClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {`Write an email to ${emailRecipient[currStage]}:`}
                </DialogTitle>
                <TextField
                    value={emailMessage}
                    placeholder="Your email message"
                    multiline
                    rows={3}
                    sx={{ marginX: 3 }}
                    onChange={handleEmailMessageChange}
                ></TextField>
                {/* {nextStageElem} */}
                {(currStage === "approver" || currStage === "admin") && (
                    <Box display="flex" margin={3}>
                        <Typography marginY={"auto"} marginRight={1}>
                            Assign:
                        </Typography>
                        <FormControl size="small" fullWidth required={true}>
                            {currStage === "approver" && (
                                <Select
                                    id="demo-select-small"
                                    value={nextStage}
                                    onChange={handleNextStageChange}
                                >
                                    <MenuItem value="" disabled>
                                        Select next stage
                                    </MenuItem>
                                    <MenuItem value="approved">
                                        Approved
                                    </MenuItem>
                                    <MenuItem value="vendor">
                                        Rejected, back to Vendor
                                    </MenuItem>
                                    <MenuItem value="admin">
                                        Rejected, back to Admin
                                    </MenuItem>
                                </Select>
                            )}
                            {currStage === "admin" && (
                                <Select
                                    id="demo-select-small"
                                    value={nextStage}
                                    onChange={handleNextStageChange}
                                >
                                    <MenuItem value="" disabled>
                                        Select next stage
                                    </MenuItem>
                                    <MenuItem value="approver">
                                        Accepted, pass to Approver
                                    </MenuItem>
                                    <MenuItem value="vendor">
                                        Rejected, back to Vendor
                                    </MenuItem>
                                </Select>
                            )}
                        </FormControl>
                    </Box>
                )}
                <DialogActions>
                    <Button onClick={handlePopUpClose}>Cancel</Button>
                    <Button onClick={submitForm}>{currStage === "approver" ? "Approve Form":"Submit Form"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FormResponse;
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<FormBuilder />);

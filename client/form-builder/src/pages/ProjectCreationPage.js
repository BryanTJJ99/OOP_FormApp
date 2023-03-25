import { Transition } from '@headlessui/react';
import { Button } from "@mui/material";
import { Link } from "react-router-dom"
import { React, useState } from "react";
import ProjectCreationPage1 from "../components/Projects/ProjectCreationPage1";
import ProjectCreationPage2 from "../components/Projects/ProjectCreationPage2";
import ProjectCreationPage3 from "../components/Projects/ProjectCreationPage3";


// import Navbar from "./components/Navbar/Navbar";

const ProjectCreationPage = (props) => {


    const [activePage,setActivePage] = useState('1')
    
    // const [projectName, setProjectName] = useState()
    // const [vendorCompanyName, setVendorCompanyName] = useState()
    // const [projectDescription, setProjectDescription] = useState()
    // const [selectedFormArr, setSelectedFormArr] = useState([])

    
    const [projectData, setProjectData] = useState({
        projectName: '',
        vendorCompanyName: '',
        projectDescription: '',
        selectedForm: []
      })


    // const handleProjectDataChange = (field, value) => {
    //     setProjectData({ ...projectData, [field]: value })
    //   }
    const handleProjectDataChange = (field, value) => {
        if (field === 'selectedForm') {
            const foundIndex = projectData.selectedForm.findIndex(form => form.id === value.id);
            if(foundIndex !== -1){
                setProjectData(prevState => ({
                    ...prevState,
                    selectedForm: prevState.selectedForm.filter((_, index) => index !== foundIndex)
                }));
            }
            else{
                setProjectData(prevState => ({
                    ...prevState,
                    selectedForm: [...prevState.selectedForm, value]
                }))
            }
        } else {
          setProjectData({ ...projectData, [field]: value })
        }
    }
    
    


    return (
        <div>


        <Link to="/Project" style={{ textDecoration : "none" }}>
            <Button             
            style={{ backgroundColor: '#a8c7f7', color: 'inherit', height:50, width:150 }} 
            // onClick = {}
            >
                Back to Projects 
            </Button>
        </Link>

        {activePage === '1' && (
            <Transition
                show={activePage === '1'}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 "
      
            >
            {/* <ProjectCreationPage1 setActivePage={setActivePage} setProjectName={setProjectName} setVendorCompanyName={setVendorCompanyName} setProjectDescription={setProjectDescription}/> */}
            <ProjectCreationPage1 
                setActivePage={setActivePage} 
                handleProjectDataChange={handleProjectDataChange} 
                projectData={projectData}
            />

            </Transition>
            )}
        
        {activePage === '2' && (
            <Transition
                show={activePage === '2'}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 "
            >
            <ProjectCreationPage2 
                setActivePage={setActivePage}
                projectData={projectData}
                handleProjectDataChange={handleProjectDataChange} 
            />
            </Transition>
            )}
        
        {activePage === '3' && (
            <Transition
                show={activePage === '3'}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 "
      
            >
            {/* <ProjectCreationPage3 setActivePage={setActivePage} projectName={projectName} vendorCompanyName={vendorCompanyName} projectDescription={projectDescription}/> */}

            <ProjectCreationPage3 
            setActivePage={setActivePage} 
            projectData={projectData}
          />
            
            
            </Transition>
            )}
        </div>
    );
};

export default ProjectCreationPage;
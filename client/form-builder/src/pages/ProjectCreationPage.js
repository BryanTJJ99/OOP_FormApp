import React from "react";
import ProjectCreationPage1 from "../components/Projects/ProjectCreationPage1";
import ProjectCreationPage2 from "../components/Projects/ProjectCreationPage2";
import ProjectCreationPage3 from "../components/Projects/ProjectCreationPage3";
import { Transition } from '@headlessui/react';


// import Navbar from "./components/Navbar/Navbar";

const ProjectCreationPage = (props) => {


    const [activePage,setActivePage] = React.useState('1')
    
    const [projectName, setProjectName] = React.useState()
    const [vendorCompanyName, setVendorCompanyName] = React.useState()
    const [projectDescription, setProjectDescription] = React.useState()
    
    const [selectedFormArr, setSelectedFormArr] = React.useState([])


    return (
        <div>
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
            <ProjectCreationPage1 setActivePage={setActivePage} setProjectName={setProjectName} setVendorCompanyName={setVendorCompanyName} setProjectDescription={setProjectDescription}/>
            {console.log(projectName)}
            {console.log(vendorCompanyName)}
            {console.log(projectDescription)}

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
            <ProjectCreationPage2 setActivePage={setActivePage}/>
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
            <ProjectCreationPage3 setActivePage={setActivePage} projectName={projectName} vendorCompanyName={vendorCompanyName} projectDescription={projectDescription}/>
            </Transition>
            )}
        </div>
    );
};

export default ProjectCreationPage;
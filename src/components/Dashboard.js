import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import Logo from "./Resource/logo2.png";
import { Link } from "react-router-dom";
import useStore from "./Store";
// styling dahsboard container

const DashboardContainer = styled.div`
  margin-right: ${(props) => (props.isSidebarOpen ? "250px" : "0")};
  padding: 20px;
  transition: margin-right 0.3s ease;
  //   border: 2px solid red;
  height: fit-content;
`;

// toggel button
const ToggleButton = styled.button`
  position: fixed;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  color: grey;
  font-size: 24px;
  z-index: 1001;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: transparent;
  }
`;

const DashboardTitle = styled.h1`
  font-size: 36px; /* Adjust the size as needed */
  font-weight: bold;
  margin-bottom: 20px;
`;

// PDF icons
const PDFIcon = styled(FontAwesomeIcon)`
  font-size: 36px; /* Adjust the size as needed */
  margin: 10px;
  cursor: pointer;
  color: #738065;
  &:hover {
    color: #98ad81; /* Change color on hover */
  }
`;

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pdfList, setPdfList] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useStore();
  const [name, setname] = useState("")
  // side bar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(isLoggedIn){

      setname(user.name)
    }

    // Fetch PDF list from local storage
    const storedPdfList = JSON.parse(localStorage.getItem("pdfList")) || [];
    // Keep only the last 4 entries
    const lastFourPdfs = storedPdfList.slice(-4);
    setPdfList(lastFourPdfs);
  }, []);


  // click to open pdf
  const handlePdfClick = (pdfData) => {
    // Open PDF in a new tab
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
    );
  };

  // overall design
  return (
    <>
      {/* <nav className='fixed z-50 top-0 bg-white  w-screen py-6 px-14'>
          <Link to="/">
          <img src={Logo} alt="" className='w-32' />
          </Link>
        </nav> */}
      <div className="py-12 pb-0  bg-white w-screen   pl-14 pr-14">
        <h1
          className="text-2xl text-center xl:text-left mb-5 inline-block text-Text1 border-b-8 border-S-Orange leading-none font-bold "
         
        >
          My Files
        </h1>
      </div>
      {/* <Sidebar isOpen={isSidebarOpen} />
      <ToggleButton  onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </ToggleButton> */}
       
       {isLoggedIn && (
                 <div className="h-[23rem] overflow-x-scroll grid grid-cols-1 scrollbar-hide sm:grid-cols-3 px-11  bg-white mt-4  w-screen  ">
                 {pdfList.length > 0
                   ? pdfList.map((pdf) => (

                       <div
                         key={pdf.id}
                         onClick={() => handlePdfClick(pdf.data)}
                         className="   hover:cursor-pointer shadow-md m-2   flex  items-center justify-center h-40 px-5"
                       >
                         <PDFIcon
                           icon={faFilePdf}
                           onClick={() => handlePdfClick(pdf.data)}
                         />
                         <div className="pdf-date h-fit flex items-center justify-center pointer-events-none  text-xl text-Text2 font-bold select-none">
                           {(() => {
                             // console.log('PDF data:', pdf); // Add this log
                             if (pdf.generatedDate) {
                               const generatedDate = new Date(pdf.generatedDate);
                               // console.log('Parsed date:', generatedDate); // Add this log
                               if (!isNaN(generatedDate.getTime())) {
                                 const day = generatedDate
                                   .getDate()
                                   .toString()
                                   .padStart(2, "0");
                                 const month = (generatedDate.getMonth() + 1)
                                   .toString()
                                   .padStart(2, "0");
                                 const year = generatedDate.getFullYear();
                                 return (
                                 <div className="flex flex-col">
                                  <span>

                                    {name? `${name}`:""}
                                  </span>
                                  <span>

                                   {day}-{month}-{year}
                                  </span>
                                 </div>
                                 );
                               }
                             }
                             return "Date not available";
                           })()}
                         </div>
                       </div>

                       
                     ))
                   : "No PDFs available"}
               </div>
              )}

       
   
    </>
  );
};

export default Dashboard;

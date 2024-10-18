// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilePdf, faTrash } from "@fortawesome/free-solid-svg-icons";
// import useStore from "./Store";

// const Dashboard = () => {
//   const [pdfList, setPdfList] = useState([]);
//   const { isLoggedIn } = useStore();
//   const [name, setName] = useState("");

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('userdata'));
//     if (isLoggedIn) {
//       setName(user.name);
//     }
//     const storedPdfList = JSON.parse(localStorage.getItem("pdfList")) || [];
//     setPdfList(storedPdfList);
//   }, [isLoggedIn]);

//   const handlePdfClick = (pdfData) => {
//     const pdfWindow = window.open();
//     pdfWindow.document.write(
//       `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
//     );
//   };

//   const handleDelete = (id) => {
//     const updatedList = pdfList.filter(pdf => pdf.id !== id);
//     setPdfList(updatedList);
//     localStorage.setItem("pdfList", JSON.stringify(updatedList));
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-full">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">My PDFs</h1>
//       {isLoggedIn && (
//         <div className="overflow-y-auto">
//           {pdfList.length > 0 ? (
//             <ul className="space-y-4">
//               {pdfList.map((pdf) => (
//                 <li key={pdf.id} className="flex items-center justify-between bg-gray-50 px-4 py-1 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out">
//                   <div className="flex items-center space-x-4">
//                     <FontAwesomeIcon icon={faFilePdf} className="text-P-Green1 text-2xl" />
//                     <div>
//                       <p className="font-semibold text-gray-700">{name || "Unnamed PDF"}</p>
//                       <p className="text-sm text-gray-500">
//                         {new Date(pdf.generatedDate).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handlePdfClick(pdf.data)}
//                       className="px-3 py-1 bg-P-Green1 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
//                     >
//                       View
//                     </button>
//                     <button
//                       onClick={() => handleDelete(pdf.id)}
//                       className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150 ease-in-out"
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-center text-gray-500">No PDFs available</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faTrash } from "@fortawesome/free-solid-svg-icons";
import useStore from "./Store";

const Dashboard = () => {
  const [pdfList, setPdfList] = useState([]);
  const { isLoggedIn } = useStore();
  const [name, setName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userdata'));
    if (isLoggedIn) {
      setName(user.name);
    }

    const storedPdfList = JSON.parse(localStorage.getItem("pdfList")) || [];
    // Filter PDFs by user ID
    const userPdfList = storedPdfList.filter(pdf => pdf.id === user.user_id);
    setPdfList(userPdfList);
  }, [isLoggedIn]);

  const handlePdfClick = (pdfData) => {
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
    );
  };

  const handleDelete = (id) => {
    const updatedList = pdfList.filter(pdf => pdf.id !== id);
    setPdfList(updatedList);
    localStorage.setItem("pdfList", JSON.stringify(updatedList));
  };

  return (
    <div className="container mx-auto px-4 py-8 h-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My PDFs</h1>
      {isLoggedIn && (
        <div className="overflow-y-auto">
          {pdfList.length > 0 ? (
            <ul className="space-y-4">
              {pdfList.map((pdf) => (
                <li key={pdf.id} className="flex items-center justify-between bg-gray-50 px-4 py-1 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out">
                  <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faFilePdf} className="text-P-Green1 text-2xl" />
                    <div>
                      <p className="font-semibold text-gray-700">{name || "Unnamed PDF"}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(pdf.generatedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePdfClick(pdf.data)}
                      className="px-3 py-1 bg-P-Green1 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(pdf.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150 ease-in-out"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No PDFs available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

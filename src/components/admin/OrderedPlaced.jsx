
// import React, { useEffect, useState } from "react";
// import { BASE_URL } from "../../Api/api";
// import axios from "axios";
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
// import { DateRangePicker } from 'react-date-range';
// // import sellPrice from "";

// const OrderedPlaced = () => {
//   const [Order, setAllOrder] = useState([]);
//   const [allTheOrder, setAllTheOrder] = useState([]);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());

//   const getAccessories = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/getdata`);
//       setAllOrder(response.data.data);
//       setAllTheOrder(response.data.data);
//       console.log(response.data.data); // Log the response data
//       console.log("billData", Order);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAccessories();
//   }, []);

//   const handleSelect = (date) => {
//     let filtered = allTheOrder.filter((order) => {
//       return order.dataAdmin.some((admin) => {
//         let orderDate = new Date(admin.createdAt);
//         return (
//           orderDate >= date.selection.startDate &&
//           orderDate <= date.selection.endDate
//         );
//       });
//     });
//     setStartDate(date.selection.startDate);
//     setEndDate(date.selection.endDate);
//     setAllOrder(filtered);
//   };

//   const selectionRange = {
//     startDate: startDate,
//     endDate: endDate,
//     key: 'selection',
//   };

//   // const deleteOrder = async (orderId) => {
//   //   try {
//   //     await axios.delete(`${BASE_URL}/deletedata/${orderId}`);
//   //     getAccessories();
//   //   } catch (error) {
//   //     console.log("error", error);
//   //   }
//   // };

//   return (
//     <div>
//       <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
//       <h2 className="fw-bolder mb-4 mt-3">
//         Total No. Of Accessories Sell: {Order?.length}{" "}
//       </h2>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>S.No</th>
//             <th>Seller Name</th>
//             <th>Selling Time</th>
//             <th>Accessories Name</th>
//             <th>Sell Quantity</th>
//             <th>Remaining Stock</th>
//             <th>Amount</th>
//             {/* <th>Action</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {Order?.map((e, i) => (
//             <tr key={e._id}>
//               <td>{i + 1}</td>
//               <td>
//                 {e.dataAdmin.map((item, index) => (
//                   <p key={index}>{item.sellerName}</p>
//                 ))}
//               </td>
//               <td>
//                 {e.dataAdmin.map((item, index) => {
//                   const date = new Date(item.createdAt);
//                   return <p key={index}>{date.toLocaleDateString()}</p>;
//                 })}
//               </td>
//               <td>
//                 {e.dataAdmin.map((item, index) => (
//                   <div key={index}>
//                     {item.AccessoriesItems.map((acc, idx) => (
//                       <p key={idx}>{acc.title}</p>
//                     ))}
//                   </div>
//                 ))}
//               </td>
//               <td>
//                 {e.dataAdmin.map((item, index) => (
//                   <div key={index}>
//                     {item.AccessoriesItems.map((acc, idx) => (
//                       <p key={idx}>{acc.quantity}</p>
//                     ))}
//                   </div>
//                 ))}
//               </td>
//               <td>
//                 {e.remainingStock?.map((stock, index) => (
//                   <p key={index}>{stock.remainingStock}</p>
//                 ))}
//               </td>
//               <td>
//                 {e.dataAdmin.map((item, index) => (
//                   <div key={index}>
//                     {item.AccessoriesItems.map((acc, idx) => (
//                       <p key={idx}>{acc.quantity * acc.sellPrice} </p>
//                     ))}
//                   </div>
//                 ))}
//               </td>
//               {/* <td>
//                 <button
//                   className="btn btn-danger text-black"
//                   onClick={() => deleteOrder(e._id)}
//                 >
//                   Delete
//                 </button>
//               </td> */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderedPlaced;


import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Api/api";
import axios from "axios";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const OrderedPlaced = () => {
  const [Order, setAllOrder] = useState([]);
  const [allTheOrder, setAllTheOrder] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const getAccessories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getdata`);
      setAllOrder(response.data.data);
      setAllTheOrder(response.data.data);
      console.log(response.data.data); // Log the response data
      console.log("billData", Order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccessories();
  }, []);

  const handleSelect = (date) => {
    let filtered = allTheOrder.filter((order) => {
      return order.dataAdmin.some((admin) => {
        let orderDate = new Date(admin.createdAt);
        return (
          orderDate >= date.selection.startDate &&
          orderDate <= date.selection.endDate
        );
      });
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setAllOrder(filtered);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`${BASE_URL}/deletedata/${orderId}`);
      getAccessories();
    } catch (error) {
      console.log("error", error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    const tableColumn = ["S.No", "Seller Name", "Selling Time", "Accessories Name", "Sell Quantity", "Remaining Stock", "Amount"];
    const tableRows = [];

    Order.forEach((order, index) => {
      order.dataAdmin.forEach((admin) => {
        const rowData = [
          index + 1,
          admin.sellerName,
          new Date(admin.createdAt).toLocaleDateString(),
          admin.AccessoriesItems.map(item => item.title).join(", "),
          admin.AccessoriesItems.map(item => item.quantity).join(", "),
          order.remainingStock?.map(stock => stock.remainingStock).join(", "),
          admin.AccessoriesItems.map(item => item.quantity * item.sellPrice).join(", ")
        ];
        tableRows.push(rowData);
      });
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Closing Details", 14, 15);
    doc.save("order_details.pdf");
  };

  return (
    <div>
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
      <h2 className="fw-bolder mb-4 mt-3">
        Total No. Of Accessories Sell: {Order?.length}{" "}
      </h2>
      <button onClick={downloadPDF} className="btn btn-primary mb-3">Download PDF</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Seller Name</th>
            <th>Selling Time</th>
            <th>Accessories Name</th>
            <th>Sell Quantity</th>
            <th>Remaining Stock</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {Order?.map((e, i) => (
            <tr key={e._id}>
              <td>{i + 1}</td>
              <td>
                {e.dataAdmin.map((item, index) => (
                  <p key={index}>{item.sellerName}</p>
                ))}
              </td>
              <td>
                {e.dataAdmin.map((item, index) => {
                  const date = new Date(item.createdAt);
                  return <p key={index}>{date.toLocaleDateString()}</p>;
                })}
              </td>
              <td>
                {e.dataAdmin.map((item, index) => (
                  <div key={index}>
                    {item.AccessoriesItems.map((acc, idx) => (
                      <p key={idx}>{acc.title}</p>
                    ))}
                  </div>
                ))}
              </td>
              <td>
                {e.dataAdmin.map((item, index) => (
                  <div key={index}>
                    {item.AccessoriesItems.map((acc, idx) => (
                      <p key={idx}>{acc.quantity}</p>
                    ))}
                  </div>
                ))}
              </td>
              <td>
                {e.remainingStock?.map((stock, index) => (
                  <p key={index}>{stock.remainingStock}</p>
                ))}
              </td>
              <td>
                {e.dataAdmin.map((item, index) => (
                  <div key={index}>
                    {item.AccessoriesItems.map((acc, idx) => (
                      <p key={idx}>{acc.quantity * acc.sellPrice} </p>
                    ))}
                  </div>
                ))}
              </td>
              <td>
                {/* <button
                 className="btn btn-danger text-black"
                 onClick={() => deleteOrder(e._id)}                >
                  Delete
                 </button> */}
               </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderedPlaced;

// import React, { useState } from "react";
// import { BiSolidSave } from "react-icons/bi";
// import { IoClose } from "react-icons/io5";
// import { addNote } from "../../../Service/services";
// import { FaPenToSquare } from "react-icons/fa6";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { v4 as uuidv4 } from "uuid";

// interface TextAreaProps {
//   data: any;
//   handleClose: any;
//   productDetails?: any;
//   notes?: any;
//   setAllNotes?: any;
//   textAreas?: any;
// }

// const TextArea = ({
//   productDetails,
//   handleClose,
//   notes = [],
//   setAllNotes,
//   textAreas,
// }: TextAreaProps) => {
//   const [noteValue, setNoteValue] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setNoteValue(e.target.value);
//   };

//   const createNote = async () => {
//     const newNote = {
//       id: uuidv4(),
//       note: noteValue,
//       asin: productDetails?.productDetails?.asin,
//       createdAt: new Date(),
//     };
//     setAllNotes?.((prev: any) => [...prev, newNote]);
//     setNoteValue("");

//     try {
//       const response = await addNote(newNote);

//       if (response?.status === 200) {
//         // Update state to include new note
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = (id: number) => {
//     setAllNotes((prev: any) =>
//       prev?.filter((textAreaId: any) => textAreaId?.id !== id)
//     );
//   };

//   console.log(textAreas, "textAreas");
//   return (
//     <div>
//       {textAreas?.map((id: any) => (
//         <div key={id} className="default-textarea d-flex mt-1 nat-note">
//           <div className="nat-note-left">
//             <textarea
//               name="note"
//               className="textarea-note-text"
//               value={noteValue}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="d-flex flex-column gap-1">
//             <button className="btn-refresh seller-btn" onClick={createNote}>
//               <BiSolidSave className="icon-text" />
//             </button>
//             <button
//               className="btn-refresh seller-btn"
//               onClick={() => handleClose(id)}
//             >
//               <IoClose className="icon-text" />
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* {textAreas?.length ? (
//         textAreas.map((index: any) => (
//           <div key={index} className="default-textarea d-flex mt-1 nat-note">
//             <div className="nat-note-left">
//               <textarea
//                 name="note"
//                 className="textarea-note-text"
//                 // value={item.note}
//               />
//             </div>
//             <div className="d-flex flex-column gap-1">
//               <button className="btn-refresh seller-btn">
//                 <BiSolidSave className="icon-text" />
//               </button>
//               <button
//                 className="btn-refresh seller-btn"
//                 onClick={() => handleClose()}
//               >
//                 <BiSolidSave className="icon-text" />
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <></>
//       )} */}

//       {/* Display existing notes */}
//       {notes?.length
//         ? notes.map((item: any, index: any) => (
//             <div key={index} className="default-textarea d-flex mt-1 nat-note">
//               <div className="nat-note-left">
//                 <textarea
//                   name="note"
//                   className="textarea-note-text"
//                   value={item.note}
//                   disabled
//                 />
//               </div>
//               <div className="d-flex flex-column gap-1">
//                 <button className="btn-refresh seller-btn">
//                   <FaPenToSquare className="icon-text" />
//                 </button>
//                 <button
//                   className="btn-refresh seller-btn"
//                   onClick={() => handleDelete(item?.id)}
//                 >
//                   <RiDeleteBinLine className="icon-text" />
//                 </button>
//               </div>
//             </div>
//           ))
//         : null}
//     </div>
//   );
// };

// export default TextArea;

// import React, { useState } from "react";
// import { BiSolidSave } from "react-icons/bi";
// import { IoClose } from "react-icons/io5";
// import { addNote } from "../../../Service/services";
// import { FaPenToSquare } from "react-icons/fa6";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { v4 as uuidv4 } from "uuid";

// interface TextAreaProps {
//   data: any;
//   handleClose: any;
//   productDetails?: any;
//   notes?: any;
//   setAllNotes?: any;
//   textAreas?: any;
// }

// const TextArea = ({
//   productDetails,
//   handleClose,
//   notes = [],
//   setAllNotes,
//   textAreas,
// }: TextAreaProps) => {
//   const initialNoteValues = textAreas?.map(() => "");
//   const [noteValues, setNoteValues] = useState(initialNoteValues);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLTextAreaElement>,
//     index: number
//   ) => {
//     const newNoteValues = [...noteValues];
//     newNoteValues[index] = e.target.value;
//     setNoteValues(newNoteValues);
//   };

//   const createNote = async (index: number) => {
//     const newNote = {
//       id: uuidv4(),
//       note: noteValues[index],
//       asin: productDetails?.productDetails?.asin,
//       createdAt: new Date(),
//     };
//     setAllNotes?.((prev: any) => [...prev, newNote]);
//     setNoteValues((prevNoteValues: any) => {
//       const newNoteValues = [...prevNoteValues];
//       newNoteValues[index] = ""; // Reset textarea value after saving
//       return newNoteValues;
//     });

//     try {
//       const response = await addNote(newNote);

//       if (response?.status === 200) {
//         // Update state to include new note
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = (id: number) => {
//     setAllNotes((prev: any) =>
//       prev?.filter((textAreaId: any) => textAreaId?.id !== id)
//     );
//   };

//   return (
//     <div>
//       {textAreas?.map((id: any, index: number) => (
//         <div key={id} className="default-textarea d-flex mt-1 nat-note">
//           <div className="nat-note-left">
//             <textarea
//               name="note"
//               className="textarea-note-text"
//               value={noteValues[index]}
//               onChange={(e) => handleChange(e, index)}
//             />
//           </div>
//           <div className="d-flex flex-column gap-1">
//             <button
//               className="btn-refresh seller-btn"
//               onClick={() => createNote(index)}
//             >
//               <BiSolidSave className="icon-text" />
//             </button>
//             <button
//               className="btn-refresh seller-btn"
//               onClick={() => handleClose(id)}
//             >
//               <IoClose className="icon-text" />
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* Display existing notes */}
//       {notes?.length
//         ? notes.map((item: any, index: any) => (
//             <div key={index} className="default-textarea d-flex mt-1 nat-note">
//               <div className="nat-note-left">
//                 <textarea
//                   name="note"
//                   className="textarea-note-text"
//                   value={item.note}
//                   disabled
//                 />
//               </div>
//               <div className="d-flex flex-column gap-1">
//                 <button className="btn-refresh seller-btn">
//                   <FaPenToSquare className="icon-text" />
//                 </button>
//                 <button
//                   className="btn-refresh seller-btn"
//                   onClick={() => handleDelete(item?.id)}
//                 >
//                   <RiDeleteBinLine className="icon-text" />
//                 </button>
//               </div>
//             </div>
//           ))
//         : null}
//     </div>
//   );
// };

// export default TextArea;

import React, { useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";

interface TextAreaProps {
  data: any;
  handleClose: any;
  productDetails?: any;
  setAllNotes?: any;
  textAreas?: any;
  notes?: any;
}

const TextArea = ({
  productDetails,
  handleClose,
  setAllNotes,
  textAreas,
}: TextAreaProps) => {
  const [noteValues, setNoteValues] = useState(textAreas?.map(() => ""));
  const [savedIndices, setSavedIndices] = useState<number[]>([]); // To keep track of saved notes

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newNoteValues = [...noteValues];
    newNoteValues[index] = e.target.value;
    setNoteValues(newNoteValues);
  };

  return (
    <div>
      {textAreas?.map((id: any, index: number) => (
        <div key={id} className="default-textarea d-flex mt-1 nat-note">
          <div className="nat-note-left">
            {savedIndices.includes(index) ? (
              <div className="textarea-note-text">{noteValues[index]}</div>
            ) : (
              <textarea
                name="note"
                className="textarea-note-text"
                value={noteValues[index]}
                onChange={(e) => handleChange(e, index)}
              />
            )}
          </div>
          <div className="d-flex flex-column gap-1">
            {savedIndices.includes(index) ? (
              <>
                <button className="btn-refresh seller-btn">
                  <FaPenToSquare className="icon-text" />
                </button>
                <button
                  className="btn-refresh seller-btn"
                  onClick={() => handleClose(id?.toString())}
                >
                  <RiDeleteBinLine className="icon-text" />
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn-refresh seller-btn"
                  // onClick={() => createNote(index)}
                >
                  <BiSolidSave className="icon-text" />
                </button>
                <button
                  className="btn-refresh seller-btn"
                  onClick={() => handleClose(id?.toString())}
                >
                  <IoClose className="icon-text" />
                </button>
              </>
            )}
            {/* <button
              className="btn-refresh seller-btn"
              onClick={() => handleClose(id)}
            >
              // <RiDeleteBinLine className="icon-text" />
              <IoClose className="icon-text" />
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TextArea;

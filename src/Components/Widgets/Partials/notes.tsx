import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TextArea from "./textArea";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";

interface NotesProps {
  data: any;
  productDetails: any;
  getAllNotes: any;
  notes?: any;
  setAllNotes?: any;
}
const Notes = ({
  data,
  productDetails,
  getAllNotes,
  notes,
  setAllNotes,
}: NotesProps) => {
  const [textAreas, setTextAreas] = useState<number[]>([]);

  const addTextArea = () => {
    setTextAreas((prev: any) => [...prev, uuidv4()]);
  };

  const removeTextArea = (id: any) => {
    const index = textAreas.indexOf(id);
    if (index !== -1) {
      const newTextAreas = [...textAreas];
      newTextAreas.splice(index, 1);
      setTextAreas(newTextAreas);
    }
  };
  return (
    <div className="offers-content d-flex gap-2 flex-wrap">
      {data?.map((item: any, rowIndex: any) =>
        item.type === "icon" ? (
          <Link
            key={rowIndex}
            to={item.link}
            target={item.target}
            // type="button"
            className="btn-refresh seller-btn"
          >
            <IoStar />
          </Link>
        ) : (
          <button
            key={rowIndex}
            type="button"
            onClick={() => addTextArea()}
            className="btn-refresh seller-btn"
          >
            {item.title}
          </button>
        )
      )}
      <div className="text-area-wrapper">
        <TextArea
          data={[]}
          handleClose={removeTextArea}
          productDetails={productDetails}
          notes={notes}
          setAllNotes={setAllNotes}
          textAreas={textAreas}
        />
      </div>
    </div>
  );
};

export default Notes;

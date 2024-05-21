import axios from "axios";
import { Fragment, useState } from "react";
import { MouseEvent } from "react";

function FormField() {
  const [getName, setName] = useState("");
  const [getId, setId] = useState(0);

  return (
    <button
      onClick={() => {
        console.log(getId);
      }}
    >
      ZOB
    </button>
  );
}

export default FormField;

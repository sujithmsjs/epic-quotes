import { useRef } from "react";

const useCopy = () => {
  const ref = useRef(null);
  const action = () => {
    const textToCopy = ref.current.innerText;
    console.info(textToCopy);

    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = textToCopy;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    tempTextarea.setSelectionRange(0, 99999); // htmlFor mobile devices
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
  };
  return [ref, action];
};

export default useCopy;

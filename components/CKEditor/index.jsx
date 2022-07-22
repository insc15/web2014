import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "./jodit";

export default function Editor({height}) {
  const editor = useRef(null);
  const [content, setContent] = useState("Start writing");
  const config = {
    readonly: false,
    height: height || 400
  };

  useEffect(()=>{
    console.log(content)
  },[content])

  return (
    <div className="App">
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => {setContent(newContent)}}
        onChange={(newContent) => {}}
      />
    </div>
  );
}
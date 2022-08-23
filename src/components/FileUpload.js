import {useState, useRef, useEffect} from "react";

import "../css/fileUpload.css";
import "../css/utils.css";


const FileUpload = ({files, setFiles}) => {
  const warnRef = useRef();

  useEffect(() => {
    if(Object.keys(files).length !== 10){
      warnRef.current.innerHTML = "";
      warnRef.current.style.marginBottom = "0";
    }
  }, [files]);

  const removeFile = (file) => {
    setFiles(files.filter(e => e !== file));
  }

  const addFile = (e) => {
    const file = e.target.files[0];
    if(!file){
      return;
    }
    if(Object.keys(files).length === 10){
      warnRef.current.innerHTML = ".حداکثر تا ۱۰ عدد فایل می توانید آپلود کنید";
      warnRef.current.classList.add("small-font");
      warnRef.current.style.color = 'red';
      warnRef.current.style.marginBottom = "10px";
    } else{
      setFiles([...files, file]);
    }
    e.target.value = null;
  }

  const filesList = files.map((file, index) => {
    return (
      <div className="file-bar-big" key={index}>
        <div className="file-bar-small">
          <span className="small-font">اسلاید {index + 1}</span>
          <span>{file.name}</span>
        </div>
        <span className="remove-file small-font" onClick={() => removeFile(file)}>حذف کردن</span>
     </div>
    );
  });

  return (
    <div className='file-upload'>
      <div className='files-list'>{files.length === 0 ? null : filesList}</div>
      <input className='file-input' type='file' onChange={(e) => addFile(e)} accept="image/*,video/*"/>
      <div className="warning" ref={warnRef}></div>
    </div>
  );

}

export default FileUpload;

import {useState} from "react";

import { Editor } from "react-draft-wysiwyg";
import { EditorState} from 'draft-js';

import InstaPostApi from "../api/InstaPostAPI";
import FileUpload from "./FileUpload";


import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../css/editor.css";
import "../css/utils.css";


const App = () => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [files, setFiles] = useState([]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  }

  const sendPlainText = async (text) => {
    const formData = new FormData();
    formData.append("caption", text);
    files.forEach((file, i) => {
      formData.append(i, file);
    });
    const response = await InstaPostApi.post("add-post/", formData);

  }

  return (
    <div>
      <Editor
        EditorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editor-class"
        onEditorStateChange={onEditorStateChange}
        hashtag={{
          separator: ' ',
          trigger: '#',
        }}
        toolbar={{
          options: ['fontFamily', 'list', 'textAlign', 'emoji', 'history']
        }}
      />
      <FileUpload files={files} setFiles={setFiles} />
      <button
        className="default-btn"
        onClick={() => sendPlainText(editorState.getCurrentContent().getPlainText())}
      >پست کن</button>
    </div>

  );
}


export default App;

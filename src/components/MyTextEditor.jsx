import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import axios from "axios"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default function MyTextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const urls  = "http://localhost:5000/api/upload";
  const HandleUpload = async (file) => {
    try {
        const response = await axios.post(urls, file);
        console.log(response)
        console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const url = 'http://localhost:5000/api/articles';
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const newData = {
      title: "Hii My self Krishna",
      data: data
    };
    try {
      const response = await axios.post(url, newData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(url+"/datas");
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
   
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              uploadCallback: HandleUpload,
              previewImage: true,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
              alt: { present: true, mandatory: false },
              defaultSize: {
                height: "100",
                width: "100",
              },
            },
          }}
        />
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <button onClick={getData}>Get Data</button>
    </div>
  );
}

import axios from "axios";
import { EditorState, convertToRaw } from "draft-js";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";

import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function KrEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [img, setImg] = useState([]);

 
  
  function addValueToArray(newValue) {
    setImg(prevArray => [...prevArray, newValue]);
  } 
  const HandleUpload = (file) => {
    
    console.log(file);
    addValueToArray(file)
    console.log(img);
    return new Promise((resolve, reject) => {
      resolve({ data: { link: URL.createObjectURL(file) } });
    });
  };
 
 

  const onEditorStateChange = (editorState) => {
    
    setEditorState(editorState);
  };

  let url = "http://localhost:5000/api/articles";

  const onSubmit = async (e) => {

    e.preventDefault();
    const data01 = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    console.log(data01);
    let newData = {
      title: "Hii My self Krishna",
      data: data01,
      file: img,
    };
    console.log(newData);
    console.log(img);
    const formdata = new FormData();
    img.forEach((file) => formdata.append("img", file));
    formdata.append("title", "Hii My self Krishna I want to Add Multiple images");
    formdata.append("data", data01);

    await fetch("http://localhost:5000/api/articles", {
      method: "POST",
      body: formdata,
    })
      .then((result) => result.json())
      .then((res) => {
        console.log(res);
      });
    // const response = await axios.post(url, newData)

    // if (response.data) {
    //   localStorage.setItem('user', JSON.stringify(response.data))
    // }

    // return response.data
  };
  let datas;
  const getData = async (e) => {
    e.preventDefault();
    const response = await axios.get(url + "/datas");

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    console.log(response.data);
    datas = response.data;
    return response.data;
  };

  console.log(datas);

  return (
    <div>
      <form action="submit" onSubmit={onSubmit}>
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
        <button>Submit</button>
      </form>
      <button action="get" onClick={getData}>
        Get Data
      </button>
    </div>
  );
}

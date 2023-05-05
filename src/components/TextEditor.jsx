import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

   HandleUpload  = (file) => {
    return new Promise((resolve, reject) => {
        resolve({ data: { link: URL.createObjectURL(file) } });
    });
   };
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const data = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) 
    //console.log(typeof data) // output string data type

    console.log(data)

  }

  render() {
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return (
      <div>
        <form action="submit" onSubmit={this.onSubmit}>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              uploadCallback: this.HandleUpload,
              previewImage: true, 
              inputAccept:
                "image/gif,image/jpeg,image/jpg,image/png,image/svg",
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
      </div>
    );
  }
}

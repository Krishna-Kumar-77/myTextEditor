import React from 'react';
import { Editor,EditorState } from 'react-draft-wysiwyg';
//import { EditorState} from 'draft-js';

function NewTextEditor() {


const HandleUpload  = (file) => {
    return new Promise((resolve, reject) => {
        resolve({ data: { link: URL.createObjectURL(file) } });
    });
   };

const plainText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
// const content = ContentState.createFromText(plainText);
    
// const [editorState, setEditorState] = React.useState(
//     () => EditorState.createEmpty(),
//   );
    const onChangeEditor = (e) => {
        console.log(e);
        console.log(EditorState);
    }

    
    return (
        <>
        <Editor
                     //   editorState={editorState[i]}
                    // editorState={editorState} onChange={setEditorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onChangeEditor}
                        toolbar={{

                          image: {
                            urlEnabled: true,
                            uploadEnabled: true,
                            alignmentEnabled: true,
                            uploadCallback: HandleUpload,
                            previewImage: true,
                            inputAccept:
                              "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                            alt: { present: false, mandatory: false },
                            defaultSize: {
                              height: "100",
                              width: "100",
                            },
                          },
                        }}
    />
        </>
      )
    }
    
    export default NewTextEditor

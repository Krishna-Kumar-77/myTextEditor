import React, { useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

const CkEditor = () => {
  useEffect(() => {

    ClassicEditor
        .create( document.querySelector( '#editor' ), {
            plugins: [ SimpleUploadAdapter, /* ... */ ],
            toolbar: [ /* ... */ ],
            simpleUpload: {
                // Feature configuration.
            }
        } )
        .then( /* ... */ )
        .catch( /* ... */ );
    
  }, []);

  const handleOnChange = (event, editor) => {
    const data = editor.getData();
    console.log({ event, editor, data });
  };

  const handleOnReady = (editor) => {
    // You can store the "editor" and use when it is needed.
    console.log("Editor is ready to use!", editor);
  };

  const handleOnBlur = (event, editor) => {
    console.log("Blur.", editor);
  };

  const handleOnFocus = (event, editor) => {
    console.log("Focus.", editor);
  };

  return (
    <div className="App">
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor
        editor={ClassicEditor}
        id={"editor"}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={handleOnReady}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
      />
    </div>
  );
};

export default CkEditor;

import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import axios from 'axios';

const EditorImage = () => {
 function uploadImageCallBack(file) {
    let url  = "http://localhost:5000/api/upload"
  return new Promise(
   async (resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //  xhr.open('POST', 'https://api.imgur.com/3/image');
    // //xhr.open('POST', 'http://localhost:5000/uploadFile/');
    //   xhr.setRequestHeader('Authorization', 'none');
    //   const data = new FormData();
    //   data.append('image', file);
    //   xhr.send(data);
    //   xhr.addEventListener('load', () => {
    //     const response = JSON.parse(xhr.responseText);
    //     resolve(response);
    //   });
    //   xhr.addEventListener('error', () => {
    //     const error = JSON.parse(xhr.responseText);
    //     reject(error);
    //   });
      
     await axios.post(url, file).then(function (response) {
      console.log(response);
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

    // if (response.data) {
    //   localStorage.setItem('user', JSON.stringify(response.data))
    // }
    
    }
  );
}



  const uploadCallback = (file) => {
    console.log(file)
   console.log(URL.createObjectURL(file))
   
    // return new Promise(
    //   (resolve, reject) => {
    //     this.uploadImage(file, (err, url) => {
    //       if (err) {
    //         reject(err.toString());
    //       } else {
    //         console.log(url);
    //         resolve({ data: { link: url } });
    //       }
    //     });
    //   }
    // ).catch(err => {
    //   console.log(err,'err')
    //   // TODO: Handle error display in the form here
    //   return err;
    // });
  }
  return (
<>
    <Editor
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      placeholder='hello'
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        image: {
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          urlEnabled: true,
          uploadEnabled: true,
          alignmentEnabled: true,
          uploadCallback: uploadImageCallBack,
          previewImage: false,
          inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
          alt: { present: false, mandatory: false },
          defaultSize: {
            height: 'auto',
            width: 'auto',
          },
        },
      }}
    />
      <img src="blob:http://localhost:3000/65c2ccb8-d946-45ac-b1bb-5815997ccd24" width={100} height={100} />
      
      </>
  );
}

export default EditorImage;
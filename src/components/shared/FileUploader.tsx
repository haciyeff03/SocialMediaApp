import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
const FileUploader = () => {

  const [fileUrl,setFileUrl]=useState('')
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  return (
 <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-1x  cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer'/>
      {
        fileUrl ?
          (
            <div>test1</div>
          ) :
          (
            <div className='file_uploader-box'>
              <img src="/assets/icons/file-upload.svg" 
              alt="file-upload" 
              width={86}
              height={77}/>
              
            </div>
          )
      }
    </div>  )
}

export default FileUploader
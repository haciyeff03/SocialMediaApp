import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from '../ui/button'
const FileUploader = ({fieldChange,mediaUrl} :any) => {
  
  cosnt [file,setFile]=useState([]);
  const [fileUrl,setFileUrl]=useState('')
  const onDrop = useCallback(acceptedFiles => {

setFile(acceptedFiles)
fieldChange
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop,
  accept: {
    'image/*' : ['.png', '.jpeg', '.jpg', '.svg']
  }})


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
              <h3 className='base-medium text-light-2 mb-2 mt-4'>Drag photo here</h3>
              <p className='text-light-3 small mb-6'>SVG, PNG, JPG</p>
              <Button className='shad-button_dark_4'>
                Select from computer
              </Button>
            </div>
          )
      }
    </div>  )
}

export default FileUploader
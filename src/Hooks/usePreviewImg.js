import React from 'react'
import { useState } from 'react'
import useShowtoast from './useShowtoast';

const usePreviewImg = () => {
 const[selectedFile,setSelectedFile]=useState(null);
 const showToast=useShowtoast();
 const maxfilesizeinbytes=2 * 1024 * 1024; // 2MB
    
 const handleImagechange=(e)=>{
    const file=e.target.files[0];
    if(file&& file.type.startsWith("image/")){
        if(file.size>maxfilesizeinbytes){
            showToast("Error","file size must be less than 2mb","error")
            setSelectedFile(null);
            return;
        }
        const reader=new FileReader();
        reader.onloadend=()=>{
            setSelectedFile(reader.result);
        }
    
			reader.readAsDataURL(file);
		} else {
			showToast("Error", "Please select an image file", "error");
			setSelectedFile(null);
		}
	};

	return { selectedFile, handleImagechange, setSelectedFile };
};

export default usePreviewImg

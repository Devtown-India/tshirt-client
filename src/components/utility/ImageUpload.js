import { Input, FormLabel} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from 'react-hot-toast'


const ImageUpload = ({setImage}) => {
  const [file,setFile] = useState(null);
  const [isError,setIsError] = useState(false);

    const handleUpload = async () => {
        try {
            const formData = new FormData()
            formData.append("image", file)
            formData.append("fileName", file.name)
            const res = await axios.post(`https://api.imgur.com/3/image`, formData, {
                headers: {
                    'Authorization': `Client-ID 0f6ef37cd429a1a`,
                    'content-type': 'multipart/form-data',
                }
            })
            const{data:{link,deleteHash}} = res.data
            setImage({link,deleteHash})
        } catch (error) {
            toast.error("failed to upload image")
            console.log(error)
        }
    }

    useEffect(()=>{
        if(file){
            handleUpload()
        }
    },[file])

    return (
        <>
            <Input
                type='file'
                onChange={(e)=>setFile(e.target.files[0])}
            />
        </>
    );
}

export default ImageUpload;
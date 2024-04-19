import { v2 as cloudinary } from 'cloudinary'
import { fs } from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadFileOnCloud = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    //uploading file on cloudinary
    const uploadedresult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    })
    return uploadedresult
  } catch (error) {
    fs.unlinkSync(localFilePath) //removing the locally saved temporary file if upload got failed
    return null
  }
}

export { uploadFileOnCloud }

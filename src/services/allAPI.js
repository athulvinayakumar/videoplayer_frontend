import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"

// upload video


export const uploadVideo = async(reqBody)=>{
   return  await commonAPI('POST',`${serverURL}/video`,reqBody)
}

// get all uploaded videos
export const getAllVieos = async()=>{
   // return value to view.jsx component
 return await commonAPI('GET',`${serverURL}/video`,"")
}

// to delete a video
export const deleteVideo = async (id) => {
   return await commonAPI('DELETE', `${serverURL}/video/${id}`, {});
}

// add to history
export const addToHistory = async(videoDetails) => {
   return await commonAPI('POST', `${serverURL}/history`, videoDetails);
}

// Api to get history
export const gethistory = async ()=>{
   return await commonAPI("GET",`${serverURL}/history`,"")
}

// Api to delete history
export const deleteVideohistory = async (id)=>{
   return await commonAPI("DELETE",`${serverURL}/history/${id}`,{})
}

// Api to add category

export const addCategory = async (body)=>{
   return await commonAPI("POST",`${serverURL}/category`,body)
}


// api to get all categories from jsonserver
export const getallcategories = async ()=>{
   return await commonAPI("GET",`${serverURL}/category`,"")
}

// Api to delte category
export const deleteallcategory = async (id)=>{
   return await commonAPI("DELETE",`${serverURL}/category/${id}`,{})
}


// api call to get a particular video from http://localhost:5000/video
export const getavideo = async (id)=>{
   return await commonAPI("GET",`${serverURL}/video/${id}`,"")
}

// /api to update category
export const updateCategory = async (id,body)=>{
   return await commonAPI("PUT",`${serverURL}/category/${id}`,body)
}
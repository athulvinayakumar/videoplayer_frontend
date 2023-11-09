import axios from "axios"


export const commonAPI = async (httpMethod, url, reqBody)=>{
    const reqconfig = {
        method:httpMethod,
        url: url,
        data: reqBody,
        Headers:{
            "Content-Type" : "application/json"
        }
    }
    return await axios(reqconfig).then((result)=>{
        return result
    }
    ).catch((err)=>{
        return err
    })
}
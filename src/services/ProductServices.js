import HttpService from "./HttpService";

export const AddProductServices = async(item,token) => {
  const http = new HttpService();
  let addProductURL = "products";
  return await http
    .postData(item,addProductURL,token)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProductsServices=(token,page)=>{
    const http = new HttpService()
    let getProductsURL = `products?page=${page}&sort=id&order=desc&limit=8`
    return http.getData(getProductsURL,token).then((data)=>{
        return data
    }).catch((err)=>{
        console.log(err)
    })
}

export const getSingleProductServices=(id,token)=>{
    const http = new HttpService()
    let getSingleProductUrl = `products/${id}`
    return http.getData(getSingleProductUrl,token).then((data)=>{
        return data
    }).catch(err=>{
        console.log(err)
    })
}


export const updateProductServices =async(pid,token,fields)=>{
    let id = pid;
    const http = new HttpService()
    let updateProductUrl = `products/${id}`
    return await http.postData(fields,updateProductUrl,token).then((data)=>{
        return data
    }).catch(err=>{
        console.log(err)
    })
}

export const deleteProductServices =async(id,token)=>{
    const http = new HttpService()
    let deleteProductUrl = `products/${id}`
    return await http.deleteData(deleteProductUrl,token).then((data)=>{
        console.log(data)
        return data
    }).catch((err)=>{
        console.log(err)
    })
}
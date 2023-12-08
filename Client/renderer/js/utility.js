function $(id){
    return document.getElementById(id);
}
async function getData(url = "", data = {}){
    let response=await fetch(url,{method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    redirect: "follow",
    referrerPolicy: "no-referrer"});

    let res={status:response.status,data:null};
    let da= await response.text();
    try{
        res.data=JSON.parse(da);
    }catch(err){
        res.data=da;
    }
    return res; 

}
async function postData(url = "", data = {}) {
     const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    let res={status:response.status,data:null};
    let da= await response.text();
    try{
        res.data=JSON.parse(da);
    }catch(err){
        res.data=da;
    }
    return res; // parses JSON response into native JavaScript objects
}
async function postFormData(url = "", data) {
    for (var pair of data.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    const response = await fetch(url, {
       method: "POST", // *GET, POST, PUT, DELETE, etc.
       mode: "cors", // no-cors, *cors, same-origin
       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
       credentials: "include", // include, *same-origin, omit
      /* headers: {
       "Content-Type": "multipart/form-data"
       // 'Content-Type': 'application/x-www-form-urlencoded',
       },*/
       redirect: "follow", // manual, *follow, error
       referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
       body:data// body data type must match "Content-Type" header
   });
   let res={status:response.status,data:null};
   let da= await response.text();
   try{
       res.data=JSON.parse(da);
   }catch(err){
       res.data=da;
   }
   return res; // parses JSON response into native JavaScript objects
}
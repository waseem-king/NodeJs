function getUserData(userId){
    return new Promise((resolve, reject)=>{
        console.log("Fetching User...")
        setTimeout(()=>{
            if(userId===1122){
                resolve({id:1122, name:"Waseem", city:"Haveli Lakha", 
                walk:()=> "Yess waseem walks with quite speed"
                })
            }else{
                reject(new Error("User not found"))
            }
        },1000)
    })
}
function getUserPost(userId){
    return new Promise((resolve, reject)=>{
        console.log("Fetching User Posts...")
        setTimeout(()=>{
            if(userId===1122){
                resolve({id:1122, post:"Pakistan is the biggest brand in the world"})
            }else{
                reject(new Error("User has not posted yet!"))
            }
        },2000)
    })
}
function getPostComments(postId){
    return new Promise((resolve, reject)=>{
        console.log("Fetching Post Comments...")
        if(postId===1111){
            resolve([
                {name:"Amjad",comnt:"Nice"},
                 {name:"Saqib",comnt:"Awsome"},
                 {name:"Sania",comnt:"I love Pakistan"},
                ])
        }else{
            reject(new Error("No comment on this post"))
        }
    },3000)
}
getUserData(1122)
    .then((data)=> {
        console.log(`I have got data of ${data.name}, and user also ${data.walk()}`)
        getUserPost(1122)
        .then((post)=>{
            console.log(`I have got post of id ${post.id}, and the post is ${post.post}`)
            getPostComments(1111)
                .then((c)=>{
                    c.forEach((i)=> console.log(`This commnet ${i.comnt}, is commented by  ${i.name}`))
                })
                .catch((error)=>console.error(error.message))
        })
        .catch((error)=>console.error(error.message))
    })
    .catch((error)=>(console.log(`${error}`)))

// we can use async/await to make async behave like synchronous 
async function userData(){
    try{
         const data = await getUserData(1122)
         
         const post = await getUserPost(1122)
         
         const comments = await getPostComments(1111)
         
         console.log(`I have got data of ${data.name}, and user also ${data.walk()}`)
         console.log(`I have got post of id ${post.id}, and the post is ${post.post}`)
         comments.forEach((i)=> console.log(`This commnet ${i.comnt}, is commented by  ${i.name}`))
    }
    catch(error){
        console.error(error.message)
    }
   
}

userData()


// i have concluded that async/await is more cleaner and readable than .than, also it is useful when we need data or the code to execude line by line
















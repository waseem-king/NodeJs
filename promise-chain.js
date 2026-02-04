// this function will return a promise and it will fetch user data
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

// this function will return a promise and it will fetch user posts
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

// this function will return a promise and it will fetch comments of the user
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

// heer i have called the promise with multiple callbacks runs inside the outer block executed
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
    .finally(()=>console.log("I have concluded that finally runs after the executation of .then or .catch blocb")


// .then this block returns the fulfill state of promise 
// .catch this block returns the error if occur in the code
// .finally this block runs every time even the promise is resolved into success or failure
















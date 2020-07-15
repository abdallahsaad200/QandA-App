// The following is a sample implementation of a backend service using Progress Kinvey (https://www.progress.com/kinvey).
// Feel free to swap in your own service / APIs / etc here for your own apps.

//import * as Kinvey from "kinvey-nativescript-sdk";

/*Kinvey.init({
    appKey: "kid_SyY8LYO8M",
    appSecret: "09282985d7c540f7b076a9c7fd884c77"
});*/
import axios from "axios";

global.accestoken = null;
global.UserData = null;
global.Questions =null;
global.access = null;
global.selectedQ = null;
export default class BackendService {
   
    isLoggedIn() {
        return false;
        //return !!Kinvey.User.getActiveUser();
    }

    async login(user) {
        

          return  axios({ method: "POST", 
                "url": "https://thebaselabs.com/directus/public/abdallah/auth/authenticate", // your api url
                data: {
                    email: user.email,
                    password: user.password
                  }
                }).then(result => {
                    var userDetails = null;

                    if(result.data.data.token)
                    {

                        userDetails = result.data.data;
                        global.UserData = result.data.data;
                        global.accestoken = result.data.data.token;
                        // console.log(global.accestoken);
                    }
                    if(userDetails != null)
                    {
                        return true;
                    }
                    else{
                        return false;
                    }
                }, error => {
                    console.error(error);
                });
        
        //return Kinvey.User.login(user.email, user.password);
    }
     getaccess() {
        return  axios({ method: "POST", 
              "url": "https://thebaselabs.com/directus/public/abdallah/auth/authenticate", // your api url
              data: {
                  email: "caabdelatty@std.axcelacademy.co.uk",
                  password: "HXaLM4HkAE" 
                }
              }).then(result => {
                  var userDetails = null;

                  if(result.data.data.token)
                  {

                      userDetails = result.data.data;
                    //   console.log(result.data.data.token);
                      
                      global.access= result.data.data.token;
                  }
                  if(userDetails != null)
                  {
                      return true;
                  }
                  else{
                      return false;
                  }
              }, error => {
                  console.error(error);
              });
      
      //return Kinvey.User.login(user.email, user.password);
  }

    async regis(user) {
        

      console.log(global.access);
            return  axios({ method: "POST", 
              "url": "https://thebaselabs.com/directus/public/abdallah/users", // your api url
              headers: { Authorization: `Bearer ${global.access}`},
              data:{
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    password: user.password,
                    role: 3,
                    status: "active"
               }
              }).then(result=>{
                  return result.data.data;
                  // console.log("Questions ---- ",global.Questions);
              },error => {
                  console.error(error);
              });
       
      
      
      //return Kinvey.User.login(user.email, user.password);
  }
    async getResults() {
          return  axios({ method: "GET", 
                "url": "https://thebaselabs.com/directus/public/abdallah/items/questions?fields=id,title,content,owner.first_name,owner.last_name,owner.id,created_on", // your api url
                headers: { Authorization: `Bearer ${global.accestoken}`}
                }).then(result=>{
                    return result.data.data;
                    // console.log("Questions ---- ",global.Questions);
                },error => {
                    console.error(error);
                });
        
        //return Kinvey.User.login(user.email, user.password);
    }
    async postQusetion(Question) {
        return  axios({ method: "POST", 
              "url": "https://thebaselabs.com/directus/public/abdallah/items/questions", // your api url
              headers: { Authorization: `Bearer ${global.accestoken}`},
              data:{
                  status: "published",
                  title: Question.title,
                  content: Question.content
               }
              }).then(result=>{
                  return result.data.data;
                  // console.log("Questions ---- ",global.Questions);
              },error => {
                  console.error(error);
              });
      
      //return Kinvey.User.login(user.email, user.password);
  }
  async getQdetails()
  {
      // console.log("----&&&&-- in Single Question");
      return  axios({ method: "GET", 
              "url": 'https://thebaselabs.com/directus/public/abdallah/items/questions/'
              +global.selectedQ+'?fields=id,title,content,created_on,owner.id,owner.first_name,owner.last_name', // your api url
              headers: { Authorization: `Bearer ${global.accestoken}`}
              }).then(result => {
                  // console.log(result.data.data);
                  return result.data.data;
              }, error => {
                  console.error(error);
              });
  }
  async getQanswers()
  {
      console.log("----&&&&-- in Single Question answers");
      return  axios({ method: "GET", 
              "url": 'https://thebaselabs.com/directus/public/abdallah/items/answers?filter[quesid]='
              +global.selectedQ, // your api url
              headers: { Authorization: `Bearer ${global.accestoken}`}
              }).then(result => {
                  console.log("Answers -- "+result.data.data);
                  return result.data.data;
              }, error => {
                  console.error(error);
              });
  }

  async getAnswer()
    {
        return  axios({ method: "GET", 
                "url": "https://thebaselabs.com/directus/public/abdallah/items/answers?filter[quesid]="
                +global.selectedQ+"&fields=id,answercont,owner.first_name,owner.last_name,created_on", // your api url
                headers: { Authorization: "Bearer "+ global.accestoken }
                }).then(result => {
                    // console.log(result.data.data);
                    return result.data.data;
                }, error => {
                    console.log("https://thebaselabs.com/directus/public/abdallah/items/answers?filter[quesid]="
                    +global.selectedQ+"&fields=id,answercont,owner.first_name,owner.last_name,created_on");
                    console.error(error);
                });
    }

  async postAnswer(answer) {
    return  axios({ method: "POST", 
          "url": "https://thebaselabs.com/directus/public/abdallah/items/answers", // your api url
          headers: { Authorization: `Bearer ${global.accestoken}`},
          data:{
              status: "published",
              answercont: answer,
              quesid: global.selectedQ
           }
          }).then(result=>{
              return result.data.data;
              // console.log("Questions ---- ",global.Questions);
          },error => {
              console.error(error);
          });
  
  //return Kinvey.User.login(user.email, user.password);
}
    logout() {
        //return Kinvey.User.logout();
        global.accestoken = null;
    }

    register(user) {
        //return Kinvey.User.signup({ username: user.email, password: user.password });
    }
}
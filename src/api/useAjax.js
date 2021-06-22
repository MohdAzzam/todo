/**
 * name: instance.js
 * desc: the axios instance should be decalred here.
 */

 import axios from 'axios';


 /**
  * declare the instance.
  */
 const instance = axios.create({
     baseURL: "https://api-js401.herokuapp.com/api/v1/todo",
     params: {},
 });
 
 /**
  * export instance as default.
  */
 export default instance;
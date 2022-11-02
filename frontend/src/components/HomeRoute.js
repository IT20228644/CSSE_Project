import axios from "axios";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

function HomeRoute(props) {
    const getData= async()=>{
        try {
            const response = await axios.post('http://localhost:5000/api/user/get-user-info-by-id',
            {},{
    
                headers:{
                    Authorization:'Bearer ' +localStorage.getItem('token')
                }
    
            }
            )
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    
    useEffect(()=>{
      localStorage.getItem("token")
        getData()
    },[])
}

export default HomeRoute;
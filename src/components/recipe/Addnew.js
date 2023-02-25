import React, { useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import "./recipe.css"

function Addnew() {
    const history = useNavigate();
    const [valid, setValid] = useState({
        token:null,
        email:null
    })
    const [data, setData] = useState({
        username:null,
        recipename:null,
        ingredients:null,
        instructions:null,
        image:null,
    })
    const handleHome = ()=>{
        history("/home");
    }

    useEffect(()=>{
        const token = sessionStorage.getItem("token");
        const useremail = sessionStorage.getItem("useremail");
        setValid({...valid,token:token,email:useremail})
        if(token == "undefined" || token == null){
            history("/login");
        }
    },[])
    const handleAdd = async()=>{
        if(data.username && data.recipename && data.ingredients && data.instructions && data.image){
            await fetch("https://recipe-appnodejs.onrender.com/addrecipe",{
                method:"POST",
                headers:{
                    "content-type":"application/json",
                    "Authorization":valid.token
                },
                body:JSON.stringify({
                    email:valid.email,
                    username:data.username,
                    recipename:data.recipename,
                    ingredients:data.ingredients,
                    instructions:data.instructions,
                    image:data.image,
                })
            })
            .then((res)=>res.json())
            .then((resdata)=>{
                console.log(data);
                console.log(resdata);
                if(resdata.status == "successfull"){
                    alert("successfull");
                    history("/home")
                } else{
                    alert("Something went wrong try angin and fill all data")
                }
            })
        } else {
            alert("fill all details");
        }
    }

  return (
    <div>
        <div className='logoHead'>
            <h2 tabIndex={"1"} className='logo' onClick={handleHome}>Recipe App</h2>
        </div>
        <h2 className='h2'>Add new Recipe</h2>
        <div className='addnew'>
            <label htmlFor='username'>Author</label>
            <input className='impt' type={"text"} placeholder="Enter Author name" onChange={(e)=>setData({...data,username:e.target.value})}/>
            <label htmlFor='recipe'>Recipe Name</label>
            <input className='impt' type={"text"} placeholder="Enter recipe name" onChange={(e)=>setData({...data,recipename:e.target.value})}/>
            <label htmlFor='ingredients'>Ingredients</label>
            <input className='impt' type={"text"} placeholder="Enter ingredients name" onChange={(e)=>setData({...data,ingredients:e.target.value})}/>
            <label htmlFor='indtructions'>Instructions</label>
            <input className='impt' type={"text"} placeholder="Enter instructions" onChange={(e)=>setData({...data,instructions:e.target.value})}/>
            <label htmlFor='username'>Image URL</label>
            <input className='impt' type={"text"} placeholder="Enter image URL" onChange={(e)=>setData({...data,image:e.target.value})}/>
            <button onClick={handleAdd}>Add new Recipe</button>
        </div>
    </div>
  )
}

export default Addnew
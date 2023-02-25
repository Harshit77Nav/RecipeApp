import React, { useEffect, useRef, useState } from 'react'
import {useNavigate, Link} from "react-router-dom"
import "./recipe.css"

function Recipe() {
    const inputelem = useRef();
    const history =useNavigate();
    const [data, setData] = useState();
    const [valid, setValid] = useState({
        token:null,
        email:null
    })
    const [recipeid, setRecipeid] = useState();
    const [search, setSearch] = useState();
    const [srdata, setSrdata] = useState();

    const [show, setShow] = useState(false);
    const [details, setDetails] = useState(false);
    const [ingred, setIngred] = useState(false);
    const [instruc, setInstruc] = useState(false);

    useEffect(()=>{
        const token = sessionStorage.getItem("token");
        const useremail = sessionStorage.getItem("useremail");
        setValid({...valid,token:token,email:useremail})
        if(token == "undefined" || token == null){
            history("/login");
        }
    },[])

    useEffect(()=>{
        getdata()
    },[valid])
    const getdata = async ()=>{
        if(valid.email !== null){
            await fetch("http://localhost:5000/recipes/"+valid.email,{
                method:"GET",
                headers:{
                    "Authorization":valid.token
                }
            })
            .then((res)=>res.json())
            .then((resdata)=>{
                if(resdata.status == "successfull"){
                    setData(resdata)
                    setShow(true);
                    console.log(resdata);
                }
            })
        }
    }

    const handleshow = async(id)=>{
        setShow(false)
        setDetails(true)
        setRecipeid(id);
    }

    const handlelogout = async()=>{
        sessionStorage.clear();
        history("/login")
    }
    const handleHome = ()=>{
        history("/home")
        getdata();
        setDetails(false);
        setIngred(false);
        setInstruc(false);
    }
    const handlesearch = async ()=>{
        if(search !== ""){
            await fetch("http://localhost:5000/search/"+search,{
                method:"GET",
                headers:{
                    "Authorization":valid.token
                }
            })
            .then((res)=>res.json())
            .then((resdata)=>{
                if(resdata.status == "successfull"){
                    setSrdata(resdata);
                    setShow(false);
                    inputelem.current.value = ""
                }
            })
        }
    }
    const handleSrdata=()=>{
        const id = srdata.recipe._id
        setShow(false)
        setDetails(true)
        setRecipeid(id);
        setSrdata();
    }

    const hanldeRoute = ()=>{
        history("/addnew");
    }

  return (
    <div>
    <div>
        <div className='logoHead'>
            <h2 tabIndex={"1"} className='logo' onClick={handleHome}>Recipe App</h2>
            <button className='logout' onClick={handlelogout}><b>Logout</b></button>
        </div>
        <div className='searchbox'>
        <input ref={inputelem} type={"text"} placeholder="Search recipes" onChange={(e)=>setSearch(e.target.value)}/>
        <button onClick={handlesearch}>Search</button>
        </div>
            <div>
                {srdata && <div tabIndex={"1"} onClick={handleSrdata} >
                        <img className='recImg' src={srdata.recipe.image} alt=""/>
                        <h4>{srdata.recipe.recipename}</h4>
                        <p>By:{srdata.recipe.username}</p>
                    </div>}
            </div>
        <div className='searchbox'>
            <button onClick={hanldeRoute}>Add new</button>
        </div>
        <h3>All recipes</h3>
        <div className='gridview'>
            {show && data.recipes.map((items,{id=items._id})=>{
                return(
                    <div onClick={()=>handleshow(id)} key={id}>
                        <img className='recImg' src={items.image} alt=""/>
                        <h4>{items.recipename}</h4>
                        <p>By:{items.username}</p>
                    </div>
                )
            })}
        </div>
        <div>
            {details && data.recipes.map((items,{id=items._id})=>{
                return(
                    <div key={id}>
                {recipeid==id?<div className='filter' key={id}>
                    <img className='recImg' src={items.image} alt=""/>
                    <div>
                    <button onClick={()=>{setInstruc(false);setIngred(true)}}>Show Ingredients</button>
                    <button onClick={()=>{setIngred(false);setInstruc(true)}}>Show Instructions</button>
                   <div>
                    {ingred && <div className='displaydetails'><b>Ingredients:</b><br/>{items.ingredients}</div>}
                    {instruc && <div className='displaydetails'><b>Instructions:</b><br/>{items.instructions}</div>}
                    </div>
                    </div>
                </div>:""}
                </div>
                )
            })}
        </div>
    </div>
    </div>
  )
}

export default Recipe
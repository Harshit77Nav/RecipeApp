import React, { useState } from 'react'
import {Link , useNavigate} from "react-router-dom"
import "./register.css";

function Register() {
    const history = useNavigate();
    const [data, setData] = useState({
        email:null,
        password:null
    })
    const [confirm, setConfirm] = useState();
    const [checkbox, setCheckbox] = useState(false);
    const handleSubmit = async ()=>{
        if(data.email && data.password && confirm){
            if(data.password == confirm){
                if(checkbox == true){
                    await fetch("http://localhost:5000/signup",{
                        method:"POST",
                        headers:{
                            "content-type":"application/json",
                        },
                        body:JSON.stringify({
                            email:data.email,
                            password:data.password
                        })
                    })
                    .then((res)=>res.json())
                    .then((resdata)=>{
                        if(resdata.status == "User already exist"){
                            alert("User already exist try different email");
                        } else if(resdata.status == "successfull"){
                            alert("successfull");
                            history("/login")
                        } else if(resdata.status == "failed"){
                            alert(`${resdata.message}`)
                        }
                        
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                } else{
                    alert("Check the terms and condition box");
                }
    
            } else{
                alert("password does'nt matched")
            }
        } else {
            alert("enter all details")
        }

    }

  return (
    <div className='container'>
        <div className='contBack'>
            <h2>Sign Up</h2>
            <div className='inputbox'>
                <label htmlFor='email'>Email address</label>
                <input id='email' type={"email"} placeholder="Enter email" onChange={(e)=>setData({...data,email:e.target.value})}/>
            </div>
            <div className='inputbox'>
                <label htmlFor='password'>Password</label>
                <input id='password' type={"password"} placeholder="Enter password" onChange={(e)=>setData({...data,password:e.target.value})}/>
            </div>
            <div className='inputbox'>
                <label htmlFor='confirmpass'>Confirm Password</label>
                <input id='confirmpass' type={"password"} placeholder="Confirm password" onChange={(e)=>setConfirm(e.target.value)}/>
            </div>
            <div>
            <input id='tnc' type={"checkbox"} onClick={()=>setCheckbox(!checkbox)}/>
            <label htmlFor='tnc'>I agree with terms and conditions</label>
            </div>
            <div className='btndiv'>
            <button className='btnbtn' onClick={handleSubmit}>Register</button>
            <Link to={"/login"}><p>Login page</p></Link>
            </div>
        </div>
    </div>
  )
}

export default Register
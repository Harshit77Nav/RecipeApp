import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"

function Login() {
    const history = useNavigate();
    const [data, setData] = useState({
        email:null,
        password:null
    })
    const [checkbox, setCheckbox] = useState(false);

    const handleSubmit = async ()=>{
        if(data.email && data.password){
            await fetch("http://localhost:5000/login",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    email:data.email,
                    password:data.password
                })
            })
            .then((res)=>res.json())
            .then((resdata)=>{
                if(resdata.status == "successfull"){
                    sessionStorage.setItem("token",resdata.token);
                    sessionStorage.setItem("useremail", resdata.user);
                    history("/home");
                } else if(resdata.status == "failed"){
                    alert(`${resdata.message}`)
                } else{
                    alert("something went wrong");
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        } else {
            alert("Enter all details")
        }
    }

  return (
    <div className='container'>
        <div className='contBack'>
            <h2>Login</h2>
            <div className='inputbox'>
                <label htmlFor='email'>Email address</label>
                <input id='email' type={"email"} placeholder="Enter email" onChange={(e)=>setData({...data,email:e.target.value})}/>
            </div>
            <div className='inputbox'>
                <label htmlFor='password'>Password</label>
                <input id='password' type={"password"} placeholder="Enter password" onChange={(e)=>setData({...data,password:e.target.value})}/>
            </div>
            <div>
            <input id='tnc' type={"checkbox"} onClick={()=>setCheckbox(!checkbox)}/>
            <label htmlFor='tnc'>Remember me</label>
            </div>
            <div className='btndiv'>
            <button className='btnbtn' onClick={handleSubmit}>Login</button>
            <Link to={"/"}><p>Register Page</p></Link>
            </div>
        </div>
    </div>
  )
}

export default Login
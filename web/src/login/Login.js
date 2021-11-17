import React, {useState} from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] =  useState("");
    const [password, setPassword] =  useState("");

    const login = (event) => {
        event.preventDefault()
    }



    return (
        <div style={{backgroundColor:'#f3f2f1', minHeight:'100vh', display:'flex', flexDirection:'column',justifyContent:'center'}}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Indeed_logo.svg/2560px-Indeed_logo.svg.png"
            style={{width:'120px', height:'30px',marginBottom:'25px', marginLeft:'650px'}}
            alt="indeed"
        ></img>
    <div style={{display:'flex', flexDirection:'column',width:'470px',  border:'1px black',marginLeft:'480px'}}>
        <div style={{display:'flex', justifyContent:'center',flexDirection:'column',width:'432px',backgroundColor:'white',padding:'20px'}}>
            <h2 style={{fontFamily:'Noto Sans,Helvetica Neue,Helvetica,Arial,Liberation Sans,Roboto,Noto,sans-serif',fontSize:'1.25rem',fontWeight:'700',lineHeight:'1.5', color:'#2d2d2d'}}>Sign In</h2>
            <div style={{width:'435px'}}>
            <p style={{fontFamily:'Noto Sans,Helvetica Neue,Helvetica,Arial,Liberation Sans,Roboto,Noto,sans-serif',fontSize:'0.875rem',fontWeight:'400',lineHeight:'1.43', color:'#2d2d2d',letterSpacing:'0'}}>By signing in to your account, you agree to Indeed's Terms of
                 Service and consent to our Cookie Policy and Privacy Policy.</p>
            </div>
            <form style={{display:'flex', flexDirection:'column'}} onSubmit={login}>
            <label style={{fontFamily:'Noto Sans,Helvetica Neue,Helvetica,Arial,Liberation Sans,Roboto,Noto,sans-serif',fontSize:'1rem',fontWeight:'700',lineHeight:'1.5', color:'#2d2d2d',letterSpacing:'0'}}>Email Address</label>
            <input className='LRinput' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
            <label style={{fontFamily:'Noto Sans,Helvetica Neue,Helvetica,Arial,Liberation Sans,Roboto,Noto,sans-serif',fontSize:'1rem',fontWeight:'700',lineHeight:'1.5', color:'#2d2d2d',letterSpacing:'0'}}>Password</label>
            <input className='LRinput' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
            <button className='LRbutton' type="submit">Sign In</button>
            </form>
            <div style={{display:'flex', flexDirection:'row', width:'450px'}}>
                <hr className="LRlin"></hr>
                <span className="LRor">or</span>
                <hr className="LRlin"></hr>
            </div>
            <div style={{display:'flex', flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                <Link to='/register' style={{textDecoration:'none'}}><p className='LRlink'>New to Indeed?</p></Link>
                <Link to='/register' style={{textDecoration:'none'}}><p className='LRlink'>Create an account</p></Link>
            </div>
        </div>
    </div>
    </div>
    )
}


export default Login;
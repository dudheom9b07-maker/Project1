import React from "react";
import { useState } from "react";

function landing({onNavigate}){
    return(
    <div style ={ {padding: "20px"}}>
        <h1>Welcome to our application</h1>
        <nav style={{display:"flex",gap:"15px",marginBottom:"20px"}}>
        <button onClick={() =>onNavigate("home")}>Home</button>
        <button onClick={() =>onNavigate("about")}>About</button>
        <button onClick={() =>onNavigate("contact")}>Contact</button>
        <button onClick={() =>onNavigate("login")}>Login</button>
        <button onClick={() =>onNavigate("register")}>Register</button>
        </nav>
        <p>welcome to the landing page of the website</p> 
    
    </div>
    )
}
export default landing;
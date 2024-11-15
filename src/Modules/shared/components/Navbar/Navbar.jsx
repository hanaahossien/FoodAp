import React from 'react'
import avatar from "../../../../assets/avatar.png"

export default function Navbar({loginData}) {
  return (
    <div className="p-3 bg-white d-flex justify-content-between w-100">
<div>

</div>
      <div>  <img src={avatar} alt="user name" className="mx-2" /> {loginData.userName}</div>
    </div>
  );}

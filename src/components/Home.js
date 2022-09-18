import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className='text-center w-3/5 m-auto p-10 rounded-xl mt-36' style={{background:'#c9ffe5'}}>
      <p className='text-6xl mb-20'>Optimize your Bill</p>
      <Link to={"/show"}><button className='px-5 py-2   mt-5 rounded-lg' style={{background:'teal'}}><p className='' style={{color:'white'}}>Click here to get Started!!!</p></button></Link>
    </div>
  )
}

export default Home
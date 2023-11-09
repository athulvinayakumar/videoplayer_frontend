import React, { useState } from 'react'
import Category from '../components/Category';
import Add from '../components/Add';
import { Link } from 'react-router-dom';
import View from '../components/View';

function Home() {
  const [uploadstatus,setuplodstatus] = useState({})

  return (
   
    <>
      <div className='container mt-5 mb-5 d-flex justify-content-between align-items-center'>
        <div className="add-videos">
          <Add setuplodstatus={setuplodstatus}/>
        </div>
        <Link to={'/watch'} style={{fontFamily:'Lorem', textDecoration:'none',color:'white',fontSize:'30px'}}>Watch History</Link>
        
      </div>
      <div className="container-fluid w-100 mt-5 mb-5 d-flex justify-content-between">
        <div className="all-videos col-lg-9">
          <h4 className='mb-5'>All Videos</h4>
          <View uploadstatus={uploadstatus} />
        </div>
        <div className="category col-lg-3">
          <Category/>
        </div>

      </div>
     
    </>

  )
}

export default Home
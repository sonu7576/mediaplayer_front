import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function Landingpage() {

  // function definition
  // redirect from one page to another page we can use hook. ie usenavigate()

  const navigate=useNavigate()

  const handlenavigate=()=>{

    navigate('/home')

  }






  return (
    <>
      <Row>

        <Col></Col>

        <Col lg={6}>

          <h1>WELCOME VIDEO.COM</h1>
          <p style={{textAlign:'justify'}}>Where user can use their favorite videos . user can upload any youtube video by copy and paste their url in to Videoo.com will allow to add and remove their uploaded videos and also arrange them in different categories by drag and drop it is free try it now!!</p>

          <button onClick={handlenavigate} className='btn btn-success'>Click Here To Know more</button>


        </Col>

        <Col lg={5}>
          <img src="https://cdnl.iconscout.com/lottie/premium/thumb/video-player-4967507-4682275.gif" alt="no image" className='image-fluid w-100 rounded'/>
        </Col>


      </Row>


    </>
  )
}

export default Landingpage
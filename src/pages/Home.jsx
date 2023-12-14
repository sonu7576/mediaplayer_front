import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Add from './Add'
import View from './View'
import Category from './Category'
import { useState } from 'react'
import { Link } from 'react-router-dom'



function Home() {

  const [serverres,setserverres]=useState({})


  const handleres=(res)=>{
    setserverres(res)

  }




  return (
    <>

    <h1 className='text-info ms-5 mb-5'>All Video Cards</h1>

    <Link to={"/watchhistory"} style={{textDecoration:"none",fontSize:"25px",color:"blue"}} >WatchHistory</Link>

    <div className='container-fluid'></div>
    <Row>


      <Col lg={1}>
        <Add handleres={handleres}/>
      </Col>


      <Col lg={7}>
        <View serverres={serverres}/>
      </Col>

      <Col lg={4}>
        <Category/>
      </Col>


    </Row>



    </>
  )
}

export default Home
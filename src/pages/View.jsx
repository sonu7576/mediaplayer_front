import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Videocard from './Videocard'
import { getVideo } from '../service/allapi'



function View(serverres) {



  // to store api response

  const [allVideos, setAllvideos] = useState([])

  const [deleteStatus,setdeletestatus]=useState(false)


  // create a function

  const getallvideos = async () => {
    const response = await getVideo()
    //  console.log(response.data);
    setAllvideos(response.data)
  }
  console.log(allVideos);


  useEffect(() => {

    getallvideos()


  }, [serverres,deleteStatus])

  // to get delete response

  const handledeleStatus=(res)=>{
    setdeletestatus(res)

  }


  return (
    <>
      <div className='border p-3 m-4 rounded'>


        <Row>


          {



            allVideos.map(video => (

              <Col className='p-3 mb-3' sm={12} md={6}>



                <Videocard card={video} handledeleStatus={handledeleStatus} />


              
              </Col>

            ))



          }




        </Row>










      </div>

    </>
  )
}

export default View
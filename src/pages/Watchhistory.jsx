import React from 'react'
import { getHistory } from '../service/allapi'
import { useEffect } from 'react'
import { useState } from 'react'

function Watchhistory() {

  const [history, sethistory] = useState([])


  useEffect(() => {

    getWatchHistory()



  }, [])




  const getWatchHistory = async () => {
    const { data } = await getHistory()
    sethistory(data)

  }


  console.log(history);





  return (
    <>

      <h5>WATCH HISTORY</h5>



      <table className='table-shadow m-3 rounded border' >


        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>URL</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>

          {
            history?.map((item, index) => (

              <tr>
                <td>{index+1}</td>
                <td>{item?.categoryName}</td>
                <td>{item?.url}</td>
                <td>{item?.date}</td>
              </tr>

            ))
          }



        </tbody>



      </table>




    </>
  )
}

export default Watchhistory
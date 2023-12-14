import React from 'react'
import { PlusCircle } from 'react-feather'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FloatingLabel, Form } from 'react-bootstrap';
import { addVideo } from '../service/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Add({handleres}) {
  const [uploaddata, setuploaddata] = useState({
    id: "",
    caption: "",
    thumbnail: "",
    url: ""


  })

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // define set input

  const setInput = (e) => {

    const { name, value } = e.target

    setuploaddata({ ...uploaddata, [name]: value })
    // setuploaddata(e.target.value)

  }

  console.log(uploaddata);

  // extract embodedurl from original youtube url 

  const extracturl = (e) => {

    let youtubeurl = e.target.value

    if (youtubeurl.includes("v=")) {

      let index = youtubeurl.indexOf("v=")


      console.log(index);

      let videourl = youtubeurl.substring(index + 2, index + 13)

      console.log(videourl);


      let videodata = uploaddata
      videodata.url = `https://www.youtube.com/embed/${videourl}`

      setuploaddata(videodata)

    }

    console.log(uploaddata);


  }

  const handleadd = async () => {
    const { id, caption, thumbnail, url } = uploaddata
    if (!id || !caption || !thumbnail || !url) {

      toast.error("please fill the form", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

    } else {

      const response = await addVideo(uploaddata)


      if (response.status >= 200 && response.status <= 300) {

        // console.log(response.data);
        handleres(response.data)
        
        setShow(false);
        toast.success("successfully uploaded", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })




      }
      else {

        toast.warning("provide a unique id...", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })



      }


    }
  }

  return (
    <>
      <div className='btn' onClick={handleShow}>
        <PlusCircle color='green' size={90} />
      </div>

      {/* model */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>upload video details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* id */}
            <FloatingLabel className='mb-3' controlId="floatingid" label="id">
              <Form.Control type="text" name='id' onChange={setInput} placeholder="Uploading video id" />
            </FloatingLabel>

            {/* caption */}
            <FloatingLabel className='mb-3' controlId="floatingcaption" label="Uploading video caption">
              <Form.Control type="text" name='caption' onChange={setInput} placeholder="Video caption" />
            </FloatingLabel>

            {/* video cover image url */}
            <FloatingLabel className='mb-3' controlId="floatingimage" label="Video cover image url">
              <Form.Control type="text" name='thumbnail' onChange={setInput} placeholder="Video cover image url" />
            </FloatingLabel>

            {/* uploading video link */}
            <FloatingLabel className='mb-3' controlId="floatinglink" label="Uploading video link">
              <Form.Control type="text" name='url' onChange={extracturl} placeholder="video link" />
            </FloatingLabel>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleadd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default Add
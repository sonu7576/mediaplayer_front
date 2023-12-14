import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, deleteCategory, getAllCategory, getVideos, updateCategory} from '../service/allapi';
import { Trash2 } from 'react-feather';
import Videocard from'./Videocard';





function Category() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categoryItem, setcategoryItem] = useState({
    id: "", name: "", allVideos: []
  })



  const [allCategory, setAllCategory] = useState([])

  useEffect(() => {
    getCategoryList()
  }, [])


  // define function

  const addCategoryForm = (e) => {
    const { name, value } = e.target
    setcategoryItem({ ...categoryItem, [name]: value })
  }

  console.log(categoryItem);


  const handleAddCategory = async (e) => {
    e.preventDefault()
    const { id, name } = categoryItem
    if (!id || !name) {
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

    }
    else {
      const res = await addCategory(categoryItem)

      console.log(res);

      if (res.status >= 200 && res.status < 300) {

        setShow(false);

        toast.success("new category uploaded sccessfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })

        getCategoryList()




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

  const getCategoryList = async () => {
    // api call for category
    const res = await getAllCategory()

    console.log(res.data);

    setAllCategory(res.data)
  }
  console.log(allCategory);

  const handleDeleteCategory = async (e, id) => {
    e.preventDefault()
    console.log(id);

    await deleteCategory(id)
    getCategoryList()
  }

  // function define

  const dragOver=(e)=>{
    e.preventDefault()

    console.log("draging over the category board");
  }

  const dropped=async(e,categoryId)=>{

    console.log("category id ",categoryId);

    let sourceCardid=e.dataTransfer.getData("cardId")

    console.log("source card id :",sourceCardid);

    // logic to impliment adding card in the given category

  const {data}= await getVideos(sourceCardid)

  console.log("source video data",data);

  // droped category list

  let selectedCategory=allCategory.find(item=>item.id==categoryId)

  console.log("target category details",selectedCategory);

  // to push drop data in the array

  selectedCategory.allVideos.push(data)
  // update drop data in allvideos array


   updateCategory(categoryId,selectedCategory)

  getCategoryList()



  }



  return (
    <>


      <div className='d-grid'>
        <div onClick={handleShow} className='btn btn-dark m-2'>
          Add Category
        </div>

      </div>

      {

        allCategory.map(item => (

          <div droppable onDragOver={e=>dragOver(e)}onDrop={e=>dropped(e,item.id)}>


            <div className='d-flex justify-content-between border rounded mt-3 p-2'>
              <h4>{item?.name}</h4>
              <span><Trash2 onClick={e => handleDeleteCategory(e, item?.id)} color='red' /></span>

              <Row>

                {

                  item?.allVideos.map((card)=>(

                    <Col className='p-3 mb-2 sm={12}'>
                      <Videocard card={card} insideCategory={true}/>
                    </Col>

                  )
                  )



                }





              </Row>







            </div>


          </div>


        ))



      }




      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            {/* id */}
            <FloatingLabel className='mb-3' controlId="floatingid" label="id">
              <Form.Control name='id' type="text" onChange={addCategoryForm} placeholder="category id" />
            </FloatingLabel>

            {/* caption */}
            <FloatingLabel className='mb-3' controlId="floatingid" label="category">
              <Form.Control name='name' onChange={addCategoryForm} type="text" placeholder="category" />
            </FloatingLabel>



          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddCategory} variant="primary">Add</Button>
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

export default Category
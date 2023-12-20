import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addCategory, deleteallcategory, getallcategories, getavideo, updateCategory } from '../services/allAPI';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col } from 'react-bootstrap';
import ViewCard from './ViewCard';


function Category() {

    const [categoryname, setcategoryname] = useState('')
    const [category1, setcategory1] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // function to add caterogy
    const add1 = async () => {
        // console.log(categoryname);

        if (categoryname) {
            let body = {
                categoryname,
                allvideos: []
            }
            // api call
            const response = await addCategory(body)
            if (response.status >= 200 && response.status < 300)
                toast.success('category added sucessfully')
            // state value made null
            setcategoryname('')
            // close model 
            setShow(false)
            // to get the remaing cat
            allcategories()
        } else {
            toast.danger('Something went wrong')
        }

    }

    // function to get all categories
    const allcategories = async () => {
        const { data } = await getallcategories();
        setcategory1(data);
    };

    // function to delte categories
    const deletecategory = async (id) => {
        await deleteallcategory(id);
        // to get the remaing cat
        allcategories()
    }

    //  function to prevent reload so that data that we send wont last

    const dragOver = (e) => {
        e.preventDefault()
    }

    const videoDrop = async (e, categoryid) => {
        console.log(`dropped on the category id : ${categoryid}`);
        const a = e.dataTransfer.getData("videoId")
        console.log(a);
        const { data } = await getavideo(a)
        console.log(data);
        //  identify
        const selectedCategory = category1.find(item => item.id === categoryid)
        selectedCategory.allvideos.push(data);
        console.log("Updated Target category details:", selectedCategory);
        await updateCategory(categoryid, selectedCategory);
        allcategories()
    }


    useEffect(() => {
        allcategories();
    }, []);
    return (
        <>
            <div className='d-grid ms-3 '>
                <Button onClick={handleShow} variant="warning" >Add new Category</Button>
            </div>
            <div className=" ms-2 mt-2 border border-secondary rounded">
                {category1?.length > 0 ? (
                    category1.map((category) => (
                        <div className="ms-5 m-5 p-3 border border-secondary rounded">
                            <div className="d-flex justify-content-between align-items-center" droppable onDragOver={(e) => dragOver(e)} onDrop={(e) => videoDrop(e, category?.id)}>
                                <h6>{category.categoryname}</h6>
                                <button onClick={() => deletecategory(category?.id)} className="btn btn-danger">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                            <Row>
                                {category?.allvideos.map((card) => (
                                    <Col className="p-3 mb-1" sm={12}>
                                        <ViewCard display={card} />
                                    </Col>
                                ))}
                            </Row>

                        </div>
                    ))

                ) : (
                    <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'gray', marginTop: '1rem' }}>No category added</p>
                )}
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title ><i class="fa-solid fa-pencil me-2 text-warning"></i>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='border boder-secondary p-3 rounded' >

                        <Form.Group className='mb-3' controlId="validationCustom02">
                            <Form.Control type="text" placeholder='Enter Category Name' onChange={(e) => setcategoryname(e.target.value)} />
                        </Form.Group>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="warning" onClick={add1}>Add</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} transition={Bounce} />

        </>
    )
}

export default Category
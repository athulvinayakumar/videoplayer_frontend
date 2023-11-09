import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { uploadVideo } from '../services/allAPI';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setuplodstatus}) {
    const [show, setShow] = useState(false);

    const [video, setVideo] = useState({
        id: "",
        caption: "",
        url: "",
        ulink: ""
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const dataHandle = (e) => {
    //     const { name, value } = e.target;
    //     setVideo((prevVideo) => ({
    //         ...prevVideo,
    //         [name]: value,
    //     }));
    // }

    // for link slicing and giving embeded link
    const embedVideosLink = (e) => {
        const { value } = e.target;
        console.log(value.slice(-11));
        const link = `https://www.youtube.com/embed/${value.slice(-11)}`; // slice from back
        setVideo({ ...video, ulink: link });
    }
    console.log(video);
    const handleAdd = async () => {
        const { id, caption, url, ulink } = video;
        if (!id || !caption || !url || !ulink) {
            toast.warning("Please fill the form completely");
        } else {

            const response = await uploadVideo(video);
            console.log(response);
            if (response.status >= 200 && response.status <300) {
                toast.success('Uploaded successfully');
                setuplodstatus(response.data)
                handleClose();
            } else {
                console.log(response);
                toast.error('Something went wrong');
            }
        }
    }



    return (
        <>
            <div className='d-flex align-items-center'>
                <h5 style={{ fontFamily: 'Lorem' }}>Upload new Video</h5>
                <button onClick={handleShow} className='btn'><i class="fa-solid fa-cloud-arrow-up fs-5"></i></button>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><i class="fa-solid fa-film me-2 text-warning"></i>Upload Videos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='border boder-secondary p-3 rounded' >
                        <Form.Group className='mb-3' controlId="validationCustom02">
                            <Form.Control type="text"  onChange={(e) => setVideo({ ...video, id: e.target.value })} placeholder='Enter video Id' />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="validationCustom02">
                            <Form.Control type="text"  onChange={(e) => setVideo({ ...video, caption: e.target.value })} placeholder='Enter video Caption' />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="validationCustom02">
                            <Form.Control type="text" onChange={(e) => setVideo({ ...video, url: e.target.value })} placeholder='Enter video Image URL' />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="validationCustom02">
                            <Form.Control type="text" onChange={embedVideosLink} placeholder='Enter Youtube link id' />
                        </Form.Group>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="warning" onClick={handleAdd}>Add</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} transition={Bounce}/>
        </>
    
    )
}

export default Add
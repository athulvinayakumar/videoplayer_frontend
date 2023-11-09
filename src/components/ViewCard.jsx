import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { addToHistory, deleteVideo } from '../services/allAPI';

function ViewCard({ display, setDeleteVideo }) { // Updated prop name from setdvideo to setDeleteVideo
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async () => {
        setShow(true);
        const { caption, ulink } = display;

        let time = new Date();
        console.log(time);

        let timestamp = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: '2-digit',
            second: "2-digit"
        }).format(time);
        console.log(timestamp);

        let videoDetails = {
            caption,
            ulink,
            timestamp
        };
console.log(videoDetails);
        await addToHistory(videoDetails);
    }

    const removeVideo = async (id) => {
           const response = await deleteVideo(id);
            setDeleteVideo(true); 
       
    }

    // function to drag the videocard
    const cardDrag =(e,id)=>{
        console.log(`The id of videocard is ${id}`);
        e.dataTransfer.setData("videoId",id)
    }

    return (
        <>
            <Card style={{ width: '100%', height: '350px' }} className='mb-3'draggable onDragStart={(e)=>cardDrag(e,display.id)}>
                <Card.Img onClick={handleShow} style={{ height: '280px' }} variant="top" src={display.url} />
                <Card.Body className='d-flex justify-content-between align-item-center'>
                    <Card.Title><h6>{display.caption}</h6></Card.Title>
                    <Card.Text>

                    </Card.Text>
                    <Button onClick={() => removeVideo(display.id)} variant="danger"><i class="fa-solid fa-trash-can"></i></Button>
                </Card.Body>
            </Card>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{display.caption}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <iframe width="100%" height="530" src={`${display.ulink}?autoplay=1`}
                     title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </Modal.Body>

            </Modal>

        </>
    );
}

export default ViewCard

import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ViewCard from './ViewCard';
import { getAllVieos } from '../services/allAPI';

function View({ uploadstatus }) {
    const [all, setAll] = useState([]);
    const [deleteVideo, setDeleteVideo] = useState(false);

    const getAllUploadedVideo = async () => {
    
            const response = await getAllVieos(); // Fixed the function name
            const { data } = response;
            setAll(data);
       
    }

    useEffect(() => {
        getAllUploadedVideo();
    }, [uploadstatus, deleteVideo]);

    return (
        <>
            <Row>
                {all.length > 0 ? (
                    all.map((item) => (
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <ViewCard display={item} setDeleteVideo={setDeleteVideo} />
                        </Col>
                    ))
                ) : (
                    <p>Nothing to display</p>
                )}
            </Row>
        </>
    )
}

export default View;

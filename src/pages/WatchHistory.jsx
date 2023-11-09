import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteVideohistory, gethistory } from '../services/allAPI';

function WatchHistory() {
  const [history, setHistory] = useState([]);

  const allHistory = async () => {
    const { data } = await gethistory();
    setHistory(data);
  };


  const removehistory = async (id) => {
     await deleteVideohistory(id)
    //  to get remaining history
     allHistory()
  }

  useEffect(() => {
    allHistory();
  }, []);

  return (
    <>
      <div className='container mt-5 d-flex justify-content-between'>
        <h3>Watch History</h3>
        <Link to='/home' className='d-flex align-items-center' style={{ textDecoration: 'none', color: 'white', fontSize: '20px' }}>
          <i className="fa-solid fa-left-long text-white me-2"></i> Back to home
        </Link>
      </div>
      <table className='table mt-5 mb-5 container'>
        <thead>
          <tr>
            <th>#</th>
            <th>Caption</th>
            <th>URL</th>
            <th>Time Stamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.caption}</td>
                <td><a href={item.ulink}>{item.ulink}</a></td>
                <td>{item.timestamp}</td>
                <td><button onClick={() => removehistory(item.id)} className="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button></td>
              </tr>
            ))
          ) :
            <tr>
              <td colSpan="4">No watch history</td>
            </tr>
          }
        </tbody>
      </table>
    </>
  );
}

export default WatchHistory;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = (props) => {
    const navigator = useNavigate();

    return (
        <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
                <h4 className="card-title">{props.title}</h4>
                <h5 className="card-subtitle">{new Date(props.creation_date).toLocaleString()}</h5>
                <p className="card-text">{props.content}</p>
                <div className="mt-auto d-flex flex-row">
                    <div>
                        <button onClick={() => props.onSelect(props.noteId, navigator)} className="btn btn-primary">Update</button>
                    </div>
                    <div className="spacer"></div>
                    <div>
                        <button onClick={() => props.onDelete(props.noteId, navigator)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
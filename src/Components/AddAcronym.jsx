import React from 'react'
import { useState, useEffect } from 'react';
import apiInstance from '../axios';
import { Link, useNavigate } from 'react-router-dom';
export default function AddAcronym() {
    const [shortForm, setShortForm] = useState('');
    const [fullForm, setFullForm] = useState('');
    const nav = useNavigate();
    const handleadd = async () => {
        const data = { shortform: shortForm, fullform: fullForm }
        try {
            await apiInstance.post(`create-acronym`, data);
            nav('/list')
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="card mt-5 p-4 shadow-lg">
            <h2 className="text-center mb-4">Acronym Decoder</h2>
            <div className="d-flex justify-content-center mb-4">
                <Link to={"/list"} className="text-white text-decoration-none">
                    <button className="btn btn-primary">
                        <i className='far fa-eye'></i> View List
                    </button>
                </Link>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="shortForm" className="form-label">
                    Query
                </label>
                <input
                    type="text"
                    id="shortForm"
                    className="form-control"
                    value={shortForm}
                    onChange={(e) => setShortForm(e.target.value)}
                    placeholder="Enter the acronym or short form"
                />
            </div>

            <div className="form-group">
                <label htmlFor="fullForm">Result of query</label>
                <textarea
                    id="fullForm"
                    value={fullForm}
                    className='form-control'
                    onChange={(e) => setFullForm(e.target.value)}
                    placeholder={"Press Calculate to get the result"}
                    rows="4"
                />
            </div>

            <button onClick={handleadd}><i className='fas fa-plus'></i> Add</button>
        </div>
    );
}

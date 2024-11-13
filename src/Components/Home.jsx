import React from 'react'
import { useState, useEffect } from 'react';
import apiInstance from '../axios';
import { Link } from 'react-router-dom';
export default function Home() {
    const [shortForm, setShortForm] = useState('');
    const [fullForm, setFullForm] = useState('');
    const [acronyms, setacronyms] = useState([]);
    const handleCalculate = () => {
        const words = shortForm.split(' ');
        let res = "";
        for (let it of words) {
            let index = -1;
            for (let i = 0; i < acronyms.length; i++) {
                if (acronyms[i].shortform === it) {
                    index = i;
                }
            }
            if (index !== -1)
                res += acronyms[index].fullform + " ";
        }
        res = res.trimEnd()
        setFullForm(res);
    };
    const fetchAcronyms = async () => {
        const res = await apiInstance.get(`list-acronym`);
        setacronyms(res.data);
    }
    useEffect(() => {
        fetchAcronyms();
    }, [])
    return (
        <div className="card mt-5 p-4 shadow-lg">
            <h2 className="text-center mb-4">Acronym Decoder</h2>

            <div className="d-flex justify-content-center mb-4">
                <Link to={"/list"} className="text-white text-decoration-none">
                    <button className="btn btn-primary">
                        <i className='fas fa-eye'></i> View List
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
                <label htmlFor="fullForm">Result</label>
                <input
                    type="text"
                    id="fullForm"
                    disabled
                    value={fullForm}
                    onChange={(e) => setFullForm(e.target.value)}
                    placeholder={"Press Calculate to get the result"}
                />
            </div>
            <button onClick={handleCalculate}>Calculate</button>
        </div>
    );
}

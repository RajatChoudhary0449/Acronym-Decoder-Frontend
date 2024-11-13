import React from 'react'
import { useState, useEffect } from 'react';
import apiInstance from '../axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
export default function EditAcronym() {
    const [acronyms, setacronyms] = useState({});
    const [shortForm, setShortForm] = useState("");
    const [fullForm, setFullForm] = useState("");
    const param = useParams();
    const nav = useNavigate();
    const [slug, setslug] = useState(param.slug);
    const fetchAcronym = async () => {
        const res = await apiInstance.get(`fetch-acronym/${slug}/`);
        setacronyms(res.data);
        setShortForm(res.data?.shortform);
        setFullForm(res.data?.fullform);
    }
    const handleUpdate = async () => {
        const data = { shortform: shortForm, fullform: fullForm };
        let res;
        try {
            res = await apiInstance.put(`update-acronym/${slug}/`, data);
            nav("/list");
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchAcronym();
    }, [])
    return (
        <div className="card mt-5 p-4 shadow-lg">
            <h2 className="text-center mb-4">Acronym Decoder</h2>

            <div className="d-flex justify-content-center mb-4">
                <Link to={"/list"} className="text-white text-decoration-none">
                    <button className="btn btn-primary">
                        View List
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
                    value={fullForm}
                    onChange={(e) => setFullForm(e.target.value)}
                    placeholder={"Press Calculate to get the result"}
                />
            </div>
            <button onClick={handleUpdate} >Update</button>
        </div>
    );
}

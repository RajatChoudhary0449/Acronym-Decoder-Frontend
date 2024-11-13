import React, { useEffect, useState } from 'react'
import apiInstance from '../axios';
import { Link } from 'react-router-dom';
export default function List() {
    const [query, setquery] = useState([]);
    const fetchAcronyms = async () => {
        const res = await apiInstance.get(`list-acronym`);
        res.data.sort();
        setquery(res.data);
    }
    const handleDelete = async (slug) => {
        if (window.confirm("Are you sure you want to delete the acronym")) {
            await apiInstance.delete(`delete-acronym/${slug}/`);
            fetchAcronyms();
        }
    }
    useEffect(() => {
        fetchAcronyms();
    }, [])
    return (
        <div className="container mt-5">
            <div className="mb-4 d-flex justify-content-end align-items-center">

                <Link to="/" className="text-decoration-none mr-3">
                    <button className="btn btn-secondary btn-md">
                        <i className='fas fa-arrow-left'></i> Go Back
                    </button>
                </Link>

                <Link to="/add-query/" className="text-decoration-none ms-2">
                    <button className="btn btn-md btn-primary">
                        <i className="fas fa-plus"></i> Add New
                    </button>
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th style={{ width: '3%' }}>S.No.</th>
                            <th style={{ width: '28%' }}>Query</th>
                            <th style={{ width: '62%' }}>Result</th>
                            <th style={{ width: '7%' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {query.length ? (query.map((q, index) => (
                            <tr key={index} className="table-row">
                                <td>{index + 1}</td>
                                <td>{q.shortform}</td>
                                <td>{q.fullform}</td>
                                <td className="d-flex justify-content-start">
                                    {/* Edit Button */}
                                    <Link to={`/edit-query/${q.slug}`} className="text-decoration-none m-2">
                                        <button
                                            className="btn btn-sm btn-warning "
                                            title="Edit"
                                            aria-label="Edit"
                                        >
                                            <i className="fa fa-pencil-alt"></i>
                                        </button>
                                    </Link>

                                    {/* Delete Button */}
                                    <button
                                        className="btn btn-sm btn-danger m-2"
                                        title="Delete"
                                        onClick={() => handleDelete(q.slug)}
                                        aria-label="Delete"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))) : <tr><td>No </td><td>items to show</td></tr>}
                    </tbody>
                </table>

            </div>
        </div>


    )
}

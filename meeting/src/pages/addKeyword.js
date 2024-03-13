import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../components/AdminAction';

export default function AddKeyword() {
    const [formData, setFormData] = useState({
        keyword: '',
    });
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [tableData, setTableData] = useState([]);
    
    // State to store the selected option
    const [selectedOption, setSelectedOption] = useState('');
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const url = `http://localhost:8000/getroles`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        setTableData(data.roles);
    };
    console.log("kokok");
    console.log(tableData);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         console.log(formData);
    //         setLoading(true);
    //         setError(false);
    //         const res = await fetch('/server/assignKeyword', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 ...formData,
    //                 roleroleID: selectedOption,
    //             }),
    //         });
    //         const data = await res.json();
    //         setLoading(false);
    //         if (data.success === false) {
    //             setError(data.message);
    //         }
    //         window.location.reload(false);
    //     } catch (error) {
    //         setError(error.message);
    //         setLoading(false);
    //     }
    // };
    // console.log(formData);
    return (
        <div>
            <AdminAction />
            <div class="container col-lg-6 col-sm-8 card text-center mt-3 p-5">
                <div class="card-header">
                    <h1 className="text-3xl font-semibold text-center">Add New Keyword</h1>
                </div>
                <div class="card-body ">
                    <form>
                    {/* <form onSubmit={handleSubmit}> */}
                    <div>
                                <select id="dropdown" onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
                                    <option value="">Select Role</option>
                                    {tableData.map((item) => (
                                        <option key={item.id} value={item.id}>{item.role_name}</option>
                                    ))}
                                </select>
                                {/* {<p>{selectedOption}</p>} */}
                            </div>
                        <div class="input-group">
                            
                            <input type="text" class="form-control" id="keyword" name="keyword" onChange={handleChange} aria-label="..." value={formData.keyword} />
                            <button type="submit" class="btn btn-danger input-group-btn">
                                {loading ? 'Adding...' : 'Add Keyword'}
                            </button>
                        </div>
                        <div>
                            {error && <p className="text-danger">{error}</p>}
                        </div>
                    </form>
                </div>
            </div>




        </div>
    )
}
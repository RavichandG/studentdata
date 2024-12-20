import React from 'react'
import { useState,useEffect,useRef } from 'react';
import { useNavigate } from 'react-router';
import StudentAdmissionForm from './StudentAdmissionForm';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { filterUsers } from '../redux/StudentData';
import "./Table.css"

const StudentsTable = () => {
   /* const users = useSelector(state=>state.userDataSlice.users)

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();


        setFilteredStudents(users)

        window.addEventListener('resize', checkMobile);


        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSearch = () => {
        const results = STUDENT_DATA.filter(student => 
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.phoneNumber.includes(searchTerm) ||
            student.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStudents(results);
    };


    const renderTableRows = () => {
        return filteredStudents.map(student => (
            isMobile ? (
                <div key={student.id} className="mobile-card">
                    <div className="mobile-card-header">
                        <h3>{student.name}</h3>
                    </div>
                    <div className="mobile-card-content">
                        <p><strong>Id:</strong>{student.id}</p>
                        <p><strong>Mother's Name:</strong> {student.motherName}</p>
                        <p><strong>Father's Name:</strong> {student.fatherName}</p>
                        <p><strong>Phone:</strong> {student.phoneNumber}</p>
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Category:</strong> {student.category}</p>
                        <p><strong>Admission Type:</strong> {student.admissionType}</p>
                        <p><strong>Fee:</strong> {student.fee}</p>
                        <p><strong>Staff Member:</strong> {student.admissionBy}</p>
                    </div>
                </div>
            ) : (
                <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.motherName}</td>
                    <td>{student.fatherName}</td>
                    <td>{student.phoneNumber}</td>
                    <td>{student.email}</td>
                    <td>{student.category}</td>
                    <td>{student.admissionType}</td>
                    <td>{student.fee}</td>
                    <td>{student.admissionBy}</td>
                </tr>
            )
        ));
    };

    return (
        <div className="student-search-container">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap');

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                :root {
                    --primary-color: #3498db;
                    --secondary-color: #2ecc71;
                    --background-color: #f4f6f7;
                    --text-color: #2c3e50;
                    --card-background: white;
                }

                body {
                    background-color: var(--background-color);
                }

                .student-search-container {
                    font-family: 'Inter', sans-serif;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                    background-color: var(--background-color);
                }

                .search-wrapper {
                    background: var(--card-background);
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    width: 100%;
                    max-width: 1200px;
                    padding: 20px;
                    margin-bottom: 20px;
                }

                .search-input-group {
                    display: flex;
                    gap: 10px;
                }

                .search-input {
                    flex-grow: 1;
                    padding: 12px 15px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    font-size: 16px;
                    transition: all 0.3s ease;
                }

                .search-input:focus {
                    border-color: var(--primary-color);
                    outline: none;
                    box-shadow: 0 0 5px rgba(52, 152, 219, 0.2);
                }

                .search-button {
                    padding: 12px 25px;
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }

                .search-button:hover {
                    background-color: #2980b9;
                    transform: translateY(-2px);
                }

                .students-table {
                    width: 100%;
                    max-width: 1200px;
                    background: var(--card-background);
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    overflow: hidden;
                }

                .students-table table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .students-table th {
                    background-color: var(--primary-color);
                    color: white;
                    padding: 15px;
                    text-align: left;
                }

                .students-table td {
                    padding: 15px;
                    border-bottom: 1px solid #f1f1f1;
                }

                .students-table tr:hover {
                    background-color: #f9f9f9;
                }

                .no-results {
                    text-align: center;
                    color: var(--text-color);
                    margin-top: 20px;
                    font-size: 18px;
                }

                
                @media screen and (max-width: 768px) {
                    .search-input-group {
                        flex-direction: column;
                    }

                    .search-input, .search-button {
                        width: 100%;
                    }

                    .students-table table {
                        display: none;
                    }

                    .mobile-card {
                        background: var(--card-background);
                        border-radius: 12px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        margin-bottom: 15px;
                        overflow: hidden;
                    }

                    .mobile-card-header {
                        background-color: var(--primary-color);
                        color: white;
                        padding: 15px;
                        font-size: 18px;
                    }

                    .mobile-card-content {
                        padding: 15px;
                    }

                    .mobile-card-content p {
                        margin-bottom: 10px;
                    }
                }

              
                @media screen and (min-width: 769px) {
                    .mobile-card {
                        display: none;
                    }
                }
            `}</style>
            <StudentAdmissionForm></StudentAdmissionForm>
            <div className="search-wrapper">
                <div className="search-input-group">
                    <input 
                        className="search-input"
                        type="text"
                        placeholder="Search by Id"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button 
                        className="search-button"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            {filteredStudents.length > 0 ? (
                <div className="students-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Mother's Name</th>
                                <th>Father's Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Category</th>
                                <th>Admission Type</th>
                                <th>Fee</th>
                                <th>Staff Member</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableRows()}
                        </tbody>
                    </table>
                    {isMobile && renderTableRows()}
                </div>
            ) : (
                <div className="no-results">
                    No students found matching your search
                </div>
            )}
        </div>
    );*/

    const dispatch = useDispatch();
  const filteredUsers = useSelector(state => state.userDataSlice.users);
  const [searchTerm, setSearchTerm] = useState('');



  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    dispatch(filterUsers(term));
  };

  return (
    <div style={{marginBottom:"10rem"}}>
         <StudentAdmissionForm></StudentAdmissionForm>
      <div className="search-container" >
        <input
          type="text"
          placeholder="Search by ID or Name"
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Admission Type</th>
            <th>Admission By</th>
            <th>Fee</th>
            <th>Mother's Name</th>
            <th>Father's Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((student,index) => (
            <tr key={index}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.admissionType}</td>
              <td>{student.admissionBy}</td>
              <td>{student.fee}</td>
              <td>{student.motherName}</td>
              <td>{student.fatherName}</td>
              <td>{student.email}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default StudentsTable
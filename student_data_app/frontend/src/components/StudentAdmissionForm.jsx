import React, { useEffect, useState } from 'react';
import './StudentAdmissionForm.css';
import { useDispatch } from 'react-redux';
import { addUsers,removeUser } from '../redux/StudentData';

const StudentAdmissionForm = () => {

  useEffect(()=>{
 (async()=>{
  const response = await fetch("http://localhost:8080/student/get",{
    method:"GET",
    credentials:"include"
  })

  if(response.ok){
    const data = await response.json()
    data.forEach((user)=>{
      dispatch(addUsers(user))
    })
   
  }
 })()
  },[])

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    admissionType: '',
    admissionBy: '',
    fee: '',
    motherName: '',
    fatherName: '',
    email: '',
    phoneNumber: '',
    category: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    console.log('Form Submitted:', formData);

    const response = await fetch("http://localhost:8080/student",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
      credentials:"include"
    })

    if(response.ok){
      console.log("Adding to state")
       dispatch(addUsers(formData))
    }

    alert('Form Submitted! Check console for details.');
    setFormData({

      name: '',
      admissionType: '',
      admissionBy: '',
      fee: '',
      motherName: '',
      fatherName: '',
      email: '',
      phoneNumber: '',
      category: ''
    })
  };

  return (
    <div className="admission-form-container">
      <form className="admission-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Student Admission Form</h1>
        
        <div className="form-grid">
          {/* Student ID */}
   

          {/* Student Name */}
          <div className="form-group">
            <label htmlFor="name">Student Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Full Name"
              required
              className="form-input"
            />
          </div>

          {/* Admission Type - Radio Buttons */}
          <div className="form-group full-width">
            <label>Admission Type</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="admissionType"
                  value="management"
                  checked={formData.admissionType === 'management'}
                  onChange={handleInputChange}
                />
                Management
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="admissionType"
                  value="non-management"
                  checked={formData.admissionType === 'non-management'}
                  onChange={handleInputChange}
                />
                Non-Management
              </label>
            </div>
          </div>

          {/* Admission By */}
          <div className="form-group">
            <label htmlFor="admissionBy">Admission By</label>
            <input
              type="text"
              id="admissionBy"
              name="admissionBy"
              value={formData.admissionBy}
              onChange={handleInputChange}
              placeholder="Enter Admission Authority"
              className="form-input"
            />
          </div>

          {/* Fee */}
          <div className="form-group">
            <label htmlFor="fee">Fee</label>
            <input
              type="number"
              id="fee"
              name="fee"
              value={formData.fee}
              onChange={handleInputChange}
              placeholder="Enter Fee Amount"
              required
              className="form-input"
            />
          </div>

          {/* Mother's Name */}
          <div className="form-group">
            <label htmlFor="motherName">Mother's Name</label>
            <input
              type="text"
              id="motherName"
              name="motherName"
              value={formData.motherName}
              onChange={handleInputChange}
              placeholder="Enter Mother's Name"
              className="form-input"
            />
          </div>

          {/* Father's Name */}
          <div className="form-group">
            <label htmlFor="fatherName">Father's Name</label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              placeholder="Enter Father's Name"
              className="form-input"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email Address"
              required
              className="form-input"
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
              required
              className="form-input"
            />
          </div>

          {/* Category Dropdown */}
          <div className="form-group full-width">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-input"
              required
            >
              <option value="">Select Category</option>
              <option value="OC">OC</option>
              <option value="OBC">OBC</option>
              <option value="BC">BC</option>
              <option value="ST/SC">ST/SC</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button">Submit Admission Form</button>
      </form>
    </div>
  );
};

export default StudentAdmissionForm
import { useState } from 'react'
import { useEffect,useRef } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {unAuthUser,authUser} from "../redux/UserAuthentication"
import {toaster} from "../components/ui/toaster.jsx"

function Loginpage() {
  
  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState('login');
  const [loginPassword, setLoginPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const loginInputRef = useRef(null);
  const changePasswordInputRef = useRef(null);

 const navigate = useNavigate()


 useEffect(()=>{
   (async()=>{
    const response = await fetch("http://localhost:8080/check",{
      method:"GET",
      credentials:"include"
    })

    if(response.ok){
      dispatch(authUser())
      navigate("/details/student")
    }
   })()
 },[])

   useEffect(()=>{
    if (activeTab === 'login' && loginInputRef.current) {
      loginInputRef.current.focus();
    } else if (activeTab === 'change-password' && changePasswordInputRef.current) {
      changePasswordInputRef.current.focus();
    }
  }, [activeTab]);

  const handleLogin = async() => {

    if (loginPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
 
    console.log('Login attempted with password:', loginPassword);
    
       const message = {
        password:loginPassword
       }

    const response = await fetch("http://localhost:8080/login",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(message),
      credentials:"include"
    })

    if(response.ok){
      dispatch(authUser())
      navigate("/details/student")
    }else{
      toaster.error({
        title: "Password Incorrect",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    }

    
    setError('');
  };

  const handleChangePassword = async() => {

    if (currentPassword.length < 6 || newPassword.length < 6) {
      setError('Passwords must be at least 6 characters');
      return;
    }
    if (currentPassword === newPassword) {
      setError('New password must be different');
      return;
    }

    console.log('Changing password');

    console.log(currentPassword)
    console.log(newPassword)

   const response = await fetch("http://localhost:8080/change/password",{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      newPassword:newPassword,
      oldPassword:currentPassword
    })
   })

   if(response.ok){
        toaster.success({
          title: "Password updated :)",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
   }else{
    toaster.error({
      title: "Incorrect Password",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
   }

    setError('');
    setCurrentPassword('');
    setNewPassword('');


  };

  return (
    <div className="login-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

        :root {
          --primary-color: #6a11cb;
          --secondary-color: #2575fc;
          --background-color: #f4f4f4;
          --text-color: #333;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-container {
          font-family: 'Poppins', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          padding: 20px;
        }

        .form-wrapper {
          background: white;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
        }

        .tab-container {
          display: flex;
          background: #f0f0f0;
          width:100%
        }

        .tab {
          flex: 1;
          padding: 15px;
          text-align: center;
          font-weight: 600;
          color: var(--text-color);
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab.active {
          color: white;
        }

        .tab.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
          animation: tabUnderline 0.4s ease;
          color:black;
        }

        @keyframes tabUnderline {
          from { width: 0; }
          to { width: 100%; }
        }

        .form-section {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          position: relative;
        }

        input {
          width: 100%;
          padding: 15px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
        }

        input:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 10px rgba(106, 17, 203, 0.2);
        }

        .error-message {
          color: #ff4444;
          font-size: 14px;
          text-align: center;
          margin-top: 10px;
          animation: shakeError 0.4s;
        }

        @keyframes shakeError {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        button {
          width: 100%;
          padding: 15px;
          background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          transform: perspective(500px) rotateX(0deg);
        }

        button:hover {
          transform: perspective(500px) rotateX(-5deg);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        button:active {
          transform: perspective(500px) rotateX(5deg) scale(0.95);
        }
      `}</style>
      
      <div className="form-wrapper">
        <div className="tab-container">
          <div 
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('login');
              setError('');
            }}
            style={{color:"black"}} >
            Login
          </div>
          <div 
            className={`tab ${activeTab === 'change-password' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('change-password');
              setError('');
            }}
          style={{color:"black"}} >
            Change Password
          </div>
        </div>

        {activeTab === 'login' && (
          <div className="form-section">
            <div className="input-group">
              <input 
                ref={loginInputRef}
                type="password" 
                placeholder="Enter Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button onClick={handleLogin}>Login</button>
            {error && <div className="error-message">{error}</div>}
          </div>
        )}

        {activeTab === 'change-password' && (
          <div className="form-section">
            <div className="input-group">
              <input 
                ref={changePasswordInputRef}
                type="password" 
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button onClick={handleChangePassword}>Change Password</button>
            {error && <div className="error-message">{error}</div>}
          </div>
        )}
      </div>
    </div>
  );

}

export default Loginpage

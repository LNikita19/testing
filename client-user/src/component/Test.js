// import React, { useState } from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';

// const MyForm = () => {
//     const [captchaValue, setCaptchaValue] = useState(null);

//     const handleCaptchaChange = (value) => {
//         setCaptchaValue(value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!captchaValue) {
//             alert('Please complete the CAPTCHA');
//         } else {
//             // You can now send the form data with the CAPTCHA response to your backend
//             console.log('Form submitted', captchaValue);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Name:</label>
//                 <input type="text" name="name" required />
//             </div>
//             <div>
//                 <label>Email:</label>
//                 <input type="email" name="email" required />
//             </div>
//             <div>
//                 <ReCAPTCHA
//                     sitekey="6LfoJdcqAAAAAIgUrvMU_S-RI9WcqPEdxfZosExt"
//                     onChange={handleCaptchaChange}
//                 />
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default MyForm;

// import React, { useState, useEffect } from "react";
// // import style from "./admin.module.css";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Login({ setToken }) {

//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [captcha, setCaptcha] = useState('');
//     const [inputValue, setInputValue] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     // Fetch CAPTCHA on component mount
//     useEffect(() => {
//         fetchCaptcha();
//         if (window.localStorage.getItem('token')) {
//             navigate('/');
//         }
//     }, []);

//     // Function to fetch CAPTCHA from the backend
//     const fetchCaptcha = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/captcha', { withCredentials: true });
//             setCaptcha(response.data.captcha);
//         } catch (error) {
//             console.error('Error fetching CAPTCHA', error);
//         }
//     };

//     const handleUsernameChange = (event) => {
//         setUsername(event.target.value);
//     };

//     const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//     };

//     const handleCaptchaChange = (event) => {
//         setInputValue(event.target.value);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         console.log("Inside handleSubmit");

//         try {
//             // First, verify the CAPTCHA
//             const captchaResponse = await axios.post(
//                 'http://localhost:5000/api/verify-captcha',
//                 { userCaptcha: inputValue },
//                 { withCredentials: true }
//             );

//             if (!captchaResponse.data.success) {
//                 setError("Incorrect CAPTCHA. Please try again.");
//                 fetchCaptcha(); // Refresh CAPTCHA
//                 return;
//             }

//             // Proceed with login only if CAPTCHA is verified
//             const loginResponse = await axios.post("https://wabasi.sany.in:8991/v2/login", {
//                 username: username,
//                 password: password
//             });

//             if (loginResponse.status === 200) {
//                 const token = loginResponse.data.token;
//                 setToken(token);
//                 navigate('/');
//             } else if (loginResponse.status === 401) {
//                 alert("Invalid username or password");
//             }
//         } catch (err) {
//             console.log(err);
//             alert("Invalid username or password");
//         }
//     };

//     return (
//         <>
//             <div className>
//                 <div className="container mt-3 border shadow p-3 mb-5 bg-white rounded w-50">




//                     {/* CAPTCHA Section */}
//                     <div style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
//                         <div
//                             style={{
//                                 display: 'inline-block',
//                                 fontSize: '20px',
//                                 fontWeight: 'bold',
//                                 background: '#f3f3f3',
//                                 padding: '10px',
//                                 letterSpacing: '3px',
//                                 borderRadius: '5px'
//                             }}
//                         >
//                             {captcha}
//                         </div>
//                         <button type="button" onClick={fetchCaptcha} style={{ marginLeft: '10px' }}>
//                             Refresh
//                         </button>
//                     </div>

//                     <div>
//                         <input
//                             type="text"
//                             value={inputValue}
//                             onChange={handleCaptchaChange}
//                             placeholder="Enter CAPTCHA"
//                             required
//                         />
//                     </div>
//                     {error && <p style={{ color: 'red' }}>{error}</p>}




//                     <br />
//                 </div>
//             </div>

//         </>
//     );
// }

// export default Login;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Login({ setToken }) {

//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [captcha, setCaptcha] = useState('');
//     const [inputValue, setInputValue] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchCaptcha();
//         if (window.localStorage.getItem('token')) {
//             navigate('/');
//         }
//     }, []);

//     const fetchCaptcha = async () => {
//         try {
//             const response = await axios.get('http://localhost:3000/captcha', { withCredentials: true });
//             setCaptcha(response.data.captcha);
//         } catch (error) {
//             console.error('Error fetching CAPTCHA', error);
//         }
//     };

//     const handleUsernameChange = (event) => {
//         setUsername(event.target.value);
//     };

//     const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//     };

//     const handleCaptchaChange = (event) => {
//         setInputValue(event.target.value);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         console.log("Inside handleSubmit");

//         try {
//             const loginResponse = await axios.post("http://localhost:3000/login", {
//                 username: username,
//                 password: password,
//                 userCaptcha: inputValue
//             }, { withCredentials: true });

//             if (loginResponse.status === 200) {
//                 const token = loginResponse.data.token;
//                 setToken(token);
//                 navigate('/');
//             } else if (loginResponse.status === 401) {
//                 alert("Invalid username, password, or CAPTCHA");
//             }
//         } catch (err) {
//             console.log(err);
//             alert("Invalid username, password, or CAPTCHA");
//         }
//     };

//     return (
//         <>
//             <div className="container mt-3 border shadow p-3 mb-5 bg-white rounded w-50">
//                 {/* CAPTCHA Section */}
//                 <div style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
//                     <div
//                         style={{
//                             display: 'inline-block',
//                             fontSize: '20px',
//                             fontWeight: 'bold',
//                             background: '#f3f3f3',
//                             padding: '10px',
//                             letterSpacing: '3px',
//                             borderRadius: '5px'
//                         }}
//                     >
//                         {captcha}
//                     </div>
//                     <button type="button" onClick={fetchCaptcha} style={{ marginLeft: '10px' }}>
//                         Refresh
//                     </button>
//                 </div>

//                 <div>
//                     <input
//                         type="text"
//                         value={inputValue}
//                         onChange={handleCaptchaChange}
//                         placeholder="Enter CAPTCHA"
//                         required
//                     />
//                 </div>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}

//                 <input
//                     type="text"
//                     value={username}
//                     onChange={handleUsernameChange}
//                     placeholder="Username"
//                     required
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                     placeholder="Password"
//                     required
//                 />

//                 <button type="submit" onClick={handleSubmit}>Login</button>
//             </div>
//         </>
//     );
// }

// export default Login;








// 6LfE2-8qAAAAAG2hw73I6L9g3-TdMvJt4cyAd4gy


import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const MyForm = () => {
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!captchaValue) {
            alert('Please complete the CAPTCHA');
        } else {
            // You can now send the form data with the CAPTCHA response to your backend
            console.log('Form submitted', captchaValue);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" required />
            </div>
            <div>
                <ReCAPTCHA
                    sitekey="6LfE2-8qAAAAAG2hw73I6L9g3-TdMvJt4cyAd4gy"
                    onChange={handleCaptchaChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default MyForm;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading.......</h1>
      </main>
    );
  }

  // return (
  //     <main>
  //         <div className="form-container">
  //             <h1>Register</h1>

  //             <form onSubmit={handleSubmit}>

  //                 <div className="input-group">
  //                     <label htmlFor="username">Username</label>
  //                     <input
  //                         onChange={(e) => { setUsername(e.target.value) }}
  //                         type="text" id="username" name='username' placeholder='Enter username' />
  //                 </div>
  //                 <div className="input-group">
  //                     <label htmlFor="email">Email</label>
  //                     <input
  //                         onChange={(e) => { setEmail(e.target.value) }}
  //                         type="email" id="email" name='email' placeholder='Enter email address' />
  //                 </div>
  //                 <div className="input-group">
  //                     <label htmlFor="password">Password</label>
  //                     <input
  //                         onChange={(e) => { setPassword(e.target.value) }}
  //                         type="password" id="password" name='password' placeholder='Enter password' />
  //                 </div>

  //                 <button className='button primary-button' >Register</button>

  //             </form>

  //             <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
  //         </div>
  //     </main>
  // )
  //   return (
  //     <main className="auth-page">
  //       <section className="auth-wrapper">
  //         <div className="auth-info">
  //           <h1>
  //             Start Your <br />
  //             AI Interview
  //             <span> Journey</span>
  //           </h1>

  //           <p>Create your account and prepare interviews smarter.</p>

  //           <div className="info-card">
  //             <h3>🚀 Career Ready</h3>

  //             <p>AI powered preparation assistant.</p>
  //           </div>
  //         </div>

  //         <div className="form-container">
  //           <h1>Create Account 🚀</h1>

  //           <p className="subtitle">Join HireLens AI today</p>

  //           <form onSubmit={handleSubmit}>
  //             <div className="input-group">
  //               <label>Username</label>

  //               <input
  //                 onChange={(e) => setUsername(e.target.value)}
  //                 placeholder="Enter username"
  //               />
  //             </div>

  //             <div className="input-group">
  //               <label>Email</label>

  //               <input
  //                 onChange={(e) => setEmail(e.target.value)}
  //                 placeholder="Enter email"
  //               />
  //             </div>

  //             <div className="input-group">
  //               <label>Password</label>

  //               <input
  //                 type="password"
  //                 onChange={(e) => setPassword(e.target.value)}
  //                 placeholder="Enter password"
  //               />
  //             </div>

  //             <button className="button primary-button">Register</button>
  //           </form>

  //           <p>
  //             Already have account?
  //             <Link to="/login"> Login</Link>
  //           </p>
  //         </div>
  //       </section>
  //     </main>
  //   );

  return (
    <main className="auth-page">
      <section className="auth-wrapper">
        {/* Left AI Section */}

        <div className="auth-info">
          <h1>
            Start Your <br />
            AI Interview
            <span> Journey</span>
          </h1>

          <p>Create your account and get AI powered interview preparation.</p>

          <div className="info-card">
            <h3>🚀 HireLens AI</h3>

            <p>Resume analysis • Interview questions • Skill insights</p>
          </div>
        </div>

        {/* Register Form */}

        <div className="form-container">
          <h1>Create Account 🚀</h1>

          <p className="subtitle">Join HireLens AI today</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>

              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>

              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>

              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
              />
            </div>

            <button className="button primary-button">Register</button>
          </form>

          <p className="switch-text">
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;

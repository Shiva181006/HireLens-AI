import { useState } from "react";
import { useNavigate, Link } from "react-router";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = async (e) => {
  //     e.preventDefault()
  //     await handleLogin({email,password})
  //     navigate('/')
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await handleLogin({
      email,
      password,
    });

    if (success) {
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Loading.......</h1>
      </main>
    );
  }

  return (
    // <main>
    //     <div className="form-container">
    //         <h1>Login</h1>
    //         <form onSubmit={handleSubmit}>
    //             <div className="input-group">
    //                 <label htmlFor="email">Email</label>
    //                 <input
    //                     onChange={(e) => { setEmail(e.target.value) }}
    //                     type="email" id="email" name='email' placeholder='Enter email address' />
    //             </div>
    //             <div className="input-group">
    //                 <label htmlFor="password">Password</label>
    //                 <input
    //                     onChange={(e) => { setPassword(e.target.value) }}
    //                     type="password" id="password" name='password' placeholder='Enter password' />
    //             </div>
    //             <button className='button primary-button' >Login</button>
    //         </form>
    //         <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
    //     </div>
    // </main>

    <main className="auth-page">
      <section className="auth-wrapper">
        <div className="auth-info">
          <h1>
            AI-Powered <br />
            Interview
            <span> Preparation</span>
          </h1>

          <p>
            Analyze your resume, discover skill gaps and prepare smarter with
            HireLens AI.
          </p>

          <div className="info-card">
            <h3>✨ Smart AI Analysis</h3>

            <p>Get personalized feedback for your dream job.</p>
          </div>
        </div>

        <div className="form-container">
          <h1>Welcome Back 👋</h1>

          <p className="subtitle">Login to continue your journey</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>

              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email address"
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
              />
            </div>

            <button className="button primary-button">Login</button>
          </form>

          <p>
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;

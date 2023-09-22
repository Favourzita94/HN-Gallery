import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      if (email === 'user@example.com' && password === '1Password') {
        navigate('/gallery');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div className="signin-container">
      <div className="avatar">
       <div className="welcome-message">
      <h1>FAVOURZEE'S GALLERY</h1> 
        <p>Welcome to our vibrant and ever-growing gallery of creativity and visual inspiration. We're thrilled to have you here, 
        where artistry knows no bounds and imagination takes center stage.
        Our gallery is a celebration of human creativity, a showcase of the extraordinary.</p> 
        </div>

        <img
          src="https://res.cloudinary.com/djxykfplf/image/upload/v1665605202/logo_sdcref.png"
          alt="Avatar"
        />
      </div>
      <div className="signin-box">
        <div className="signin-image">
          <img src="https://res.cloudinary.com/djxykfplf/image/upload/v1665605202/logo_sdcref.png" alt="Sign In" />
        </div>
        <div className="signin-form">
          <h2>SIGN IN TO ACCESS MY GALLERY</h2>
          <form onSubmit={handleSignin}>
          <label htmlFor="email" className='email'>Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <label htmlFor="password" className='password'>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign in</button>
          </form>          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signin;
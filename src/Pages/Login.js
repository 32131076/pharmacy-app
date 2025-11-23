import React, { useState } from 'react';
import '../style/Pages.css'; 

const LoginPage = () => {
  // State to manage which panel is active: true for Sign Up, false for Sign In
  const [isSignUpActive, setSignUpActive] = useState(false);

  // Form state for sign in
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  // Form state for sign up
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    // Add your real authentication logic here
    if (!signInEmail || !signInPassword) {
      alert('Please enter both email and password.');
      return;
    }
    alert('Signing In...');
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Add your user creation logic here
    if (!signUpName || !signUpEmail || !signUpPassword) {
      alert('Please fill in all fields.');
      return;
    }
    alert('Signing Up...');
  };

  // --- Reusable Form Components ---

  const SignInForm = () => (
    <form className="auth-form-container" onSubmit={handleSignInSubmit}>
      <h1>Sign In</h1>
      <p className="auth-subtitle">Use your pharmacy credentials</p>
      <input
        type="email"
        placeholder="Username or Email"
        value={signInEmail}
        onChange={e => setSignInEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={signInPassword}
        onChange={e => setSignInPassword(e.target.value)}
        required
      />
      <a href="#">Forgot Password?</a>
      <button type="submit" className="primary-button">
        SIGN IN
      </button>
    </form>
  );

  const SignUpForm = () => (
    <form className="auth-form-container" onSubmit={handleSignUpSubmit}>
      <h1>Create Account</h1>
      <p className="auth-subtitle">Register for the Pharmacy System</p>
      <input
        type="text"
        placeholder="Full Name"
        value={signUpName}
        onChange={e => setSignUpName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email Address"
        value={signUpEmail}
        onChange={e => setSignUpEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Set Password"
        value={signUpPassword}
        onChange={e => setSignUpPassword(e.target.value)}
        required
      />
      <button type="submit" className="primary-button">
        SIGN UP
      </button>
    </form>
  );

  // --- Main Component Render ---

  return (
    <div className="auth-page-wrapper">
      <div 
        className={`auth-container${isSignUpActive ? ' right-panel-active' : ''}`} 
        id="auth-container"
      >
        {/* Sign Up Form (On the right when active) */}
        <div className="form-wrapper sign-up-wrapper">
          <SignUpForm />
        </div>
        
        {/* Sign In Form (On the left when active) */}
        <div className="form-wrapper sign-in-wrapper">
          {!isSignUpActive && <SignInForm />}
        </div>

        {/* The Sliding Overlay Panel */}
        <div className="overlay-container">
          <div className="overlay">
            
            {/* Overlay Left Side: Shown when Sign Up is active (asking to SIGN IN) */}
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Already have an account? Log in here.</p>
              <button className="ghost-button" onClick={() => setSignUpActive(false)}>
                SIGN IN
              </button>
            </div>
            
            {/* Overlay Right Side: Shown when Sign In is active (asking to SIGN UP) */}
            <div className="overlay-panel overlay-right">
              <h1>Hello, Pharmacist!</h1>
              <p>New to the system? Register your account now.</p>
              <button className="ghost-button" onClick={() => setSignUpActive(true)}>
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
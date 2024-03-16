# AutoCare-Hub
<h1>Authentication API Documentation</h1>
<h4>Base URL</h4>
<h6><b>https://auto-care-hub-pi.vercel.app</b></h6>

<h4><b>Sign Up</b></h4>
<h5><b>Route</b>: /api/auth/signup</h5>
<h5>Request Type: POST</h5>
<h5>Request Body:</h5>
<h6>firstName (string): User's first name</h6>
<h6>lastName (string): User's last name</h6>
<h6>username (string): User's username</h6>
<h6>password (string): User's password</h6>
<h6>confirmPassword (string): Confirm user's password</h6>
<h6>phone (string): User's phone number</h6>


<h4><b>Sign In</b></h4>
<h6>Route: /api/auth/signin</h6>
<h5>Request Type: POST</h5>
<h5>Request Body:</h5>
<h6>username (string): User's username</h6>
<h6>password (string): User's password</h6>


<h4><b>Logout</b></h4>
<h6>Route: /api/auth/logout</h6>
<h6>Request Type: GET</h6>

<h4><b>Reset Password</b></h4>
<h5>Route: /api/auth/reset-password</h5>
<h5>Request Type: POST</h5>
<h5>Request Body:</h5>
<h6>username (string): User's username</h6>
<h6>newPassword (string): User's new password</h6>
<h6>confirmNewPassword (string): Confirm user's new password</h6>

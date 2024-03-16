# AutoCare-Hub
<h1>Authentication API Documentation</h1>
<h4>Base URL</h4>
<h6><b>https://auto-care-hub-pi.vercel.app</b></h6>

<h6><b>Sign Up</b></h6>
Route: /api/auth/signup
Request Type: POST
Request Body:
firstName (string): User's first name
lastName (string): User's last name
username (string): User's username
password (string): User's password
confirmPassword (string): Confirm user's password
phone (string): User's phone number


<h6><b>Sign In</b></h6>

Route: /api/auth/signin
Request Type: POST
Request Body:
username (string): User's username
password (string): User's password


<h6><b>Logout</b></h6>
Route: /api/auth/logout
Request Type: GET

<h6><b>Reset Password</b></h6>
Route: /api/auth/reset-password
Request Type: POST
Request Body:
username (string): User's username
newPassword (string): User's new password
confirmNewPassword (string): Confirm user's new password

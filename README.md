# AutoCare-Hub
Authentication API Documentation
Base URL
https://auto-care-hub-pi.vercel.app

Sign Up
Route: /api/auth/signup
Request Type: POST
Request Body:
firstName (string): User's first name
lastName (string): User's last name
username (string): User's username
password (string): User's password
confirmPassword (string): Confirm user's password
phone (string): User's phone number

Sign In
Route: /api/auth/signin
Request Type: POST
Request Body:
username (string): User's username
password (string): User's password

Logout
Route: /api/auth/logout
Request Type: GET

Reset Password
Route: /api/auth/reset-password
Request Type: POST
Request Body:
username (string): User's username
newPassword (string): User's new password
confirmNewPassword (string): Confirm user's new password

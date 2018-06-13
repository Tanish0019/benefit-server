/**
* @api {post} auth/signup Signup User
* @apiName PostSignup
* @apiGroup Auth
*
* @apiParam {String} email User's unique email.
* @apiParam {String} username User's unique username.
* @apiParam {String} password User's password.
* @apiParam {String} name User's name.
*
*
* @apiSuccess {Boolean} success Response status.
* @apiSuccess {String} token JWT token.
* @apiSuccess {String} message Response message.
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "success": true,
*       "message": "User has been created!",
*		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMTJmNDAyM2NlNGIzNGIyZjkwNjljZSIsIm5hbWUiOiJhZG1pbiIsInVzZXJuYW1lIjoiMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUyODM3MzUzOSwiZXhwIjoxNTI4OTc4MzM5fQ.ARrJbUZIcRnbKtqf4z3Qc4xlKoCbkwj49WJL3MDcSY4"
*     }
*/

/**
* @api {post} /auth/login/google Google Login
* @apiName PostGoogleLogin
* @apiGroup Auth
*
* @apiParam {String} email User's unique email.
* @apiParam {String} name User's name.
* @apiParam {String} googleToken Unique google token.
*
* @apiSuccess {Boolean} success Response status.
* @apiSuccess {String} token JWT token.
* @apiSuccess {String} message Response message.
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "success": true,
*       "message": "Successful login!",
*		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMTJmNDAyM2NlNGIzNGIyZjkwNjljZSIsIm5hbWUiOiJhZG1pbiIsInVzZXJuYW1lIjoiMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUyODM3MzUzOSwiZXhwIjoxNTI4OTc4MzM5fQ.ARrJbUZIcRnbKtqf4z3Qc4xlKoCbkwj49WJL3MDcSY4"
*     }
*/

/**
* @api {post} /auth/login/facebook Facebook Login
* @apiName PostFacebookLogin
* @apiGroup Auth
*
* @apiParam {String} email User's unique email.
* @apiParam {String} name User's name.
* @apiParam {String} facebookToken Unique facebook token.
*
* @apiSuccess {Boolean} success Response status.
* @apiSuccess {String} token JWT token.
* @apiSuccess {String} message Response message.
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "success": true,
*       "message": "Successful login!",
*		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMTJmNDAyM2NlNGIzNGIyZjkwNjljZSIsIm5hbWUiOiJhZG1pbiIsInVzZXJuYW1lIjoiMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUyODM3MzUzOSwiZXhwIjoxNTI4OTc4MzM5fQ.ARrJbUZIcRnbKtqf4z3Qc4xlKoCbkwj49WJL3MDcSY4"
*     }
*
*/

/**
* @api {post} /auth/login Login User
* @apiName PostLogin
* @apiGroup Auth
*
* @apiParam {String} email Users unique email.
* @apiParam {String} username Users unique username.
* @apiParam {String} password Users password.
*
* @apiSuccess {Boolean} success Response status.
* @apiSuccess {String} token JWT token.
* @apiSuccess {String} message Response message.
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "success": true,
*       "message": "Successful login!",
*		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMTJmNDAyM2NlNGIzNGIyZjkwNjljZSIsIm5hbWUiOiJhZG1pbiIsInVzZXJuYW1lIjoiMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUyODM3MzUzOSwiZXhwIjoxNTI4OTc4MzM5fQ.ARrJbUZIcRnbKtqf4z3Qc4xlKoCbkwj49WJL3MDcSY4"
*     }
*/

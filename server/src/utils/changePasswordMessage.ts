const changePasswordMessage = (resetUrl: string) =>`

<section style="width: 100%; height:100vh; background: #ECECEC;">
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div style="max-width: 450px; margin:0 auto; background: #fff; color:#000; padding:10px 20px 0px 20px; border-radius: 5px;">
    <h1 style="font-size: 32px; font-weight: bold;">Password Reset Request</h1>
    <hr/>
    <p style="font-size: 17px;">
        You are receiving this because you (or someone else) have requested the reset of the password for your account, 
       <br style="margin:0 0 10px 0"/>
       <br>

        If you did not request this, please ignore this email and your password will remain unchanged.

        <a style="color: #fff; font-size: 18px; text-decoration: none; " href=${resetUrl} clicktracking=off>
            <button style="width: 100%; padding:10px 0; color: #fff; font-size: 18px; background:#A8A4FF; margin-top: 15px;">
                Click to Reset Password 
            </button>
        </a>

        <p style="text-align: center; padding-top: 17px; padding-bottom:15px; font-size: 12px;">All Rights Reserved;</p>
</div>
</section>
`
export default changePasswordMessage;
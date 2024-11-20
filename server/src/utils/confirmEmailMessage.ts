const confirmEmailMessage = (url: string) => `
<table align="center" bgcolor="#ECF2F8" cellpadding="0" cellspacing="0" width="600">
<tbody>
<tr>
<td align="center" bgcolor="#ECF2F8" width="600">
<div>&nbsp;&nbsp;</div>
<div>&nbsp;&nbsp;</div>
<div>&nbsp;&nbsp;</div>
</td>
</tr>
    <tr>
        <td align="center" bgcolor="#ECF2F8" width="600">
            <table align="center" bgcolor="#FFFFFF" cellpadding="0" cellspacing="0"
                style="box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);" width="500">
                <tbody>
                    <tr>
                        <td align="center" bgcolor="#FFFFFF" width="500">
                            <div>&nbsp;</div>

                            <div>&nbsp;</div>

                            <table align="center" bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" width="460">
                                <tbody>
                                    <tr>
                                        <td align="center" bgcolor="#FFFFFF" width="460">
                                            <div
                                                style="font-size: 24px; line-height: 1.2; letter-spacing: 0px; font-family: 'Roboto', sans-serif; font-weight: 500; color: #0c0928;">
                                                Confirm Your Email Address</div>

                                            <div>&nbsp;</div>

                                            <div>&nbsp;</div>

                                            <div
                                                style="font-size: 16px; line-height:1.4; letter-spacing: 0px; font-family: 'Roboto', sans-serif; color: #082446;">
                                                Welcome to Interactive Note!</div>

                                            <div>&nbsp;</div>

                                            <div
                                                style="font-size: 16px; line-height:1.4; letter-spacing: 0px; font-family: 'Roboto', sans-serif; color: #082446;">
                                                To finish signing up, please confirm your email address. This
                                                ensures we have the right email incase we need to contact you.
                                            </div>

                                            <div>&nbsp;</div>
                                            <div>&nbsp;</div>

                                            <div>
                                                <a href="${url}">
                                                    <button
                                                        style="background: #A8A4FF; color: #ffffff; padding:10px 20px; border-radius: 5px; cursor: pointer; font-size: 17px;">Confirm
                                                        email address</button>
                                                </a>
                                            </div>
                                            <div>&nbsp;</div>
                                            <div
                                                style="font-size: 16px; line-height:1.4;  letter-spacing: 0px; font-family: 'Roboto', sans-serif; color: #031429;">
                                                Or Scan the QR code below to continue</div>
                                            <div>&nbsp;</div>
                                            <div style="width: 200px;">
                                                <img style="width: 100px;"
                                                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${url}"
                                                    alt="qr-data" />
                                            </div> 
                                            </td>
                                    </tr>
                                    <tr>
                                        <td align="center" bgcolor="#FFFFFF" width="460">
                                            <div>&nbsp;</div>
                                            <div
                                                style="font-size: 12px; line-height:1.4; font-style: italic; letter-spacing: 0px; font-family: 'Roboto', sans-serif; color: #031429;">
                                                Copyright @2024</div>
                                            <div
                                                style="font-size: 12px; line-height:1.4; font-style: italic; letter-spacing: 0px; font-family: 'Roboto', sans-serif; color: #031021;">
                                                All rights reserved
                                            </div>
                                    
                                        </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>&nbsp;</div>
                            <div>&nbsp;</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
        </td>
    </tr>
</tbody>
</table>
`

export default confirmEmailMessage;
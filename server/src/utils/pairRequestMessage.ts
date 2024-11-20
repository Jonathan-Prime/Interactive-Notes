const pairRequestMessage = (pairUrl: string, currentUser: any, userToPair: any) => `
<style type="text/css">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>
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
                                                Pair Request</div>

                                            <div>&nbsp;</div>

                                            <div>&nbsp;</div>
                                            
                                            <div
                                                style="font-size: 16px; line-height:1.4; letter-spacing: 0px; font-family: 'Roboto', sans-serif; color: #082446;">
                                                Hi ${userToPair.username}, ${currentUser.username} has invited you to be their pair on their Interactive Note account. 
                                                To accept the invitation and enable pair mode please visit the following URL:\n\n${pairUrl}\n\nBest regards,\nPairUp

                                            </div>

                                            <div>&nbsp;</div>
                                            <div>&nbsp;</div>

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
                                                All rights
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

export default pairRequestMessage;
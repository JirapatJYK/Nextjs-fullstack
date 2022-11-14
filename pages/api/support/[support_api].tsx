import { NextApiRequest, NextApiResponse } from "next";
var jwt = require('jsonwebtoken');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: 'w3ttew@gmail.com',//process.env.SUPPORT_MAIL,
    pass: 'smahmwrkenolanaz'//process.env.SUPPORT_MAIL_PASSWORD
  }
});

var result= {
    status: '',
    token: ''
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { support_api } = await req.query;
    console.log(req.body.email)
    support_api == 'reset-password'
      ? result = await resetPassword(req.body.email)
      : ''
      res.status(200).json(result);
}

async function resetPassword(email: string){
  const token = await jwt.sign({email}, 'shhhhh');
  console.log(token);
  var mailOptions = {
    from: 'w3ttew@gmail.com',//process.env.SUPPORT_MAIL,
    to: email,
    subject: 'Reset Password',
    html: `<center>
    <table width="100%" style="background-color:#f1f1f1;min-width:600px" bgcolor="#f1f1f1">
    <tbody><tr>
      <td align="center" valign="top" width="100%" style="min-width:600px">
        <center>
          
         
        
          <table width="100%" style="min-width:500px" border="0" cellpadding="0" cellspacing="0" bgcolor="#f1f1f1">
            <tbody>
              <tr>
                <td align="center">
                  <table width="100%" style="min-width:500px" border="0" cellpadding="0" cellspacing="0">
                    <tbody><tr height="50">
                      <td width="100%" height="50" style="line-height:1px;font-size:1px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="center">
                        <table border="0" cellpadding="0" cellspacing="0" style="min-width:500px">
                          <tbody><tr>
                            <td valign="middle" align="center">
                              <div style="max-height:40px">
                                <div>
                                  <a href="https://accts.epicgames.com/T/v6100000183d2587bf790ff61434b5c58d0/086bb07902f34d1d0000021ef3a0bcc2/086bb079-02f3-4d1d-9f56-cc59b3bdeb6a?__dU__=v0G4RBKTXg2GsSUKeCIT0ZsixpTu2oNAqvl6X7t4UbJT0=&amp;__F__=v0fUYvjHMDjRPMSh3tviDHXIoXcPxvDgUUCCPvXMWoX_0JoZLAZABQF2Skw9vkwo_mga2JAbIShxp9CWnI6HiATIqGqMAM5P5DvA4NbIL3oT5CJ60BcBYDrzIAR5fJi2NnXDdoDiDAWJReuX0T42aqeHwU4gxhkcXa8vp1xEZ2hY0_d99PnA_V6gpuFiwBffm8f9gkAqVRr1gakLM-WjT6-28_oIzktSoIY-6GqqmqSTjYqe-vFny14nwpK8i7VWo_ypfkOKu-O7yZ2ckks0xWWb9gHxbGqikq" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://accts.epicgames.com/T/v6100000183d2587bf790ff61434b5c58d0/086bb07902f34d1d0000021ef3a0bcc2/086bb079-02f3-4d1d-9f56-cc59b3bdeb6a?__dU__%3Dv0G4RBKTXg2GsSUKeCIT0ZsixpTu2oNAqvl6X7t4UbJT0%3D%26__F__%3Dv0fUYvjHMDjRPMSh3tviDHXIoXcPxvDgUUCCPvXMWoX_0JoZLAZABQF2Skw9vkwo_mga2JAbIShxp9CWnI6HiATIqGqMAM5P5DvA4NbIL3oT5CJ60BcBYDrzIAR5fJi2NnXDdoDiDAWJReuX0T42aqeHwU4gxhkcXa8vp1xEZ2hY0_d99PnA_V6gpuFiwBffm8f9gkAqVRr1gakLM-WjT6-28_oIzktSoIY-6GqqmqSTjYqe-vFny14nwpK8i7VWo_ypfkOKu-O7yZ2ckks0xWWb9gHxbGqikq&amp;source=gmail&amp;ust=1666405398078000&amp;usg=AOvVaw0-ktMiA49Pn2cgq-HLBB2o"><img align="none" alt="Epic Games" border="0" hspace="0" src="https://ci3.googleusercontent.com/proxy/eP4FFa-mqn0IZZSJgV9B1kEGaN-q4Na_OUBLG7ag4iLWQRamiZ84Ua3VRnZdBgTmlV2LrY1XFivTF2lwG3KQcUMZovbZ3UDUedWetGmgORBvm3A5X9uWklzvU4PVjc3iu-5Y5qoJA4t9xgRKuPeHOt9c9l6GaK8xgHlTDapJdbX8djsngrugJ1ZILklNZ0vkkg=s0-d-e1-ft#http://images.harmony.epsilon.com/ContentHandler/images/61a7fbcf-9940-4c13-ad82-1cc8d60d33bf/RTM_Images/EML_EPICGAMES_LOGO.png" style="max-width:70px;height:auto;display:block;margin:0px" title="Epic Games" vspace="0" width="55px" class="CToWUd" data-bit="iit">
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody></table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <table>
                    <tbody>
                      <tr>
                        <td align="center" style="font-family:arial,helvetica,sans-serif;font-size:26px;color:#313131;line-height:32px">&nbsp;</td>
                      </tr>
                      <tr>
                        <td align="center">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table width="100%" style="min-width:500px" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                      <tr>
                        <td align="center">
                          <table width="500" border="0" cellpadding="0" cellspacing="0" style="min-width:500px">
                            <tbody>
                              <tr>
                                <td width="100%" height="50" style="line-height:1px;font-size:1px">
                                  <div style="font-family:sans-serif;color:#202020;text-align:center;font-size:26px;line-height:32px;line-height:100%;letter-spacing:2px">
  
                                    รหัสลงชื่อเข้าใช้<wbr>โดยการตรวจสอบสิทธิ์สองปัจจัย:
  
  
                                    
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" height="50" style="line-height:1px;font-size:1px">
                                  <div style="font-family:sans-serif;color:#202020;text-align:center;font-size:26px;line-height:32px;line-height:100%;letter-spacing:2px">
                                    744370
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table width="100%" style="min-width:500px" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr height="40">
                                <td align="center">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
                    
                    
          <table width="500" border="0" cellpadding="0" cellspacing="0" style="background-color:#fff;margin:0 auto">
            <tbody>
              <tr height="50">
                <td width="50">&nbsp;</td>
                <td height="50" style="line-height:1px;font-size:1px">&nbsp;</td>
                <td width="50">&nbsp;</td>
              </tr>
              <tr>
                <td width="50">&nbsp;</td>
                <td align="left" style="font-family:arial,helvetica,sans-serif;font-size:14px;color:#202020;line-height:19px;line-height:134%;letter-spacing:.5px">
  
  
                  สวัสดี Jirapat
                          
                  <br><br>
  
                </td>
                <td width="50">&nbsp;</td>
              </tr>
              <tr>
                <td width="50">&nbsp;</td>
                <td align="left" style="font-family:arial,helvetica,sans-serif;font-size:14px;color:#202020;line-height:19px;line-height:134%;letter-spacing:.5px">
  
  
                  คุณได้พยายามเข้าสู่ระบบจากอุ<wbr>ปกรณ์ เบราว์เซอร์ หรือสถานที่ใหม่ โปรดใช้รหัสด้านบนเพื่อที่<wbr>จะดำเนินการเข้าสู่ระบบให้เสร็<wbr>จสิ้น ี้ <a style="text-decoration:none" href="https://fullstack-nextjs-jirapatjyk.vercel.app/support/resetPassword/${token}" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://accts.epicgames.com/T/v6100000183d2587bf790ff61434b5c58d0/086bb07902f34d1d0000021ef3a0bcc3/086bb079-02f3-4d1d-9f56-cc59b3bdeb6a?__dU__%3Dv0G4RBKTXg2GsSUKeCIT0ZsixpTu2oNAqvl6X7t4UbJT0%3D%26__F__%3Dv0fUYvjHMDjRPMSh3tviDHXIoXcPxvDgUUCCPvXMWoX_0JoZLAZABQF2Skw9vkwo_mga2JAbIShxr_H-GX5Z2QsiIiyMEH_j6EZGzlrGSObhje8jD-4vBgXowHtiVfk08VjW_YtLPa2I1xqDEeveGMRhsTkMVgMs83x0Rhp0Z6IJtaegfJkYMXdR1H-7hu4xKPBq_kSuRTjJLCDfxl__GT_iutnoDyw5yys0LnJ1Esaz_ts7-el0O-jiSD-QnOARX9eWPqYSfpnMI_N6MjlZJex9-nTvJlTlJJGpCzPlo0-vsVAYrVQ7ztocRUc0N7s9nuJO6fDa41XJIxRw3VZLM_Ip4t_sjpMUeg8jRtHXlXSLQ9joF2EsVhwlr0yfekhNFVDudM9x9bEzM_nUoBF9rt49a1TUHsK5rk&amp;source=gmail&amp;ust=1666405398078000&amp;usg=AOvVaw1F06Jl5RqAs92xDYU_5-Hq">เรียนรู้เพิ่มเติม</a>
                      
                  <br><br>
  
                </td>
                <td width="50">&nbsp;</td>
              </tr>                  
            </tbody>
          </table>
                        
          <table width="500" border="0" cellpadding="0" cellspacing="0" style="min-width:400px;background-color:#fff">
            <tbody>
              <tr>
                <td width="50">&nbsp;</td>
                <td align="left" style="font-family:arial,helvetica,sans-serif;font-size:14px;color:#202020;line-height:19px;line-height:134%">
                  <div style="font-family:arial,helvetica,sans-serif;font-size:14px;color:#202020;line-height:19px;letter-spacing:.5px">
  
  
  
  
  
                    หากคุณไม่ได้เป็นคนดำเนินการ โปรด <a style="text-decoration:none" href="https://accts.epicgames.com/T/v6100000183d2587bf790ff61434b5c58d0/086bb07902f34d1d0000021ef3a0bcc4/086bb079-02f3-4d1d-9f56-cc59b3bdeb6a?__dU__=v0G4RBKTXg2GsSUKeCIT0ZsixpTu2oNAqvl6X7t4UbJT0=&amp;__F__=v0fUYvjHMDjRPMSh3tviDHXIoXcPxvDgUUCCPvXMWoX_0JoZLAZABQF2Skw9vkwo_mga2JAbIShxp4lAcTgLkjUnEBw295limnfX7tblyU4hUEx43kdnkFX4qGqMAM5P5DvA4NbIL3oT5CJ60BcBYDrzIAR5fJi2NnXDdoDiDAWJReuX0T42aqeHwU4gxhkcXa8vp1xEZ2hY0_d99PnA_V6gpuFiwBffm8f9gkAqVRr1gakLM-WjT6-28_oIzktSoI08F2Y_-rNuuFCx7Y5J_jExgeYhj0j2SpYOCxFAbtAxSZ2ckks0xWWb9gHxbGqikq" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://accts.epicgames.com/T/v6100000183d2587bf790ff61434b5c58d0/086bb07902f34d1d0000021ef3a0bcc4/086bb079-02f3-4d1d-9f56-cc59b3bdeb6a?__dU__%3Dv0G4RBKTXg2GsSUKeCIT0ZsixpTu2oNAqvl6X7t4UbJT0%3D%26__F__%3Dv0fUYvjHMDjRPMSh3tviDHXIoXcPxvDgUUCCPvXMWoX_0JoZLAZABQF2Skw9vkwo_mga2JAbIShxp4lAcTgLkjUnEBw295limnfX7tblyU4hUEx43kdnkFX4qGqMAM5P5DvA4NbIL3oT5CJ60BcBYDrzIAR5fJi2NnXDdoDiDAWJReuX0T42aqeHwU4gxhkcXa8vp1xEZ2hY0_d99PnA_V6gpuFiwBffm8f9gkAqVRr1gakLM-WjT6-28_oIzktSoI08F2Y_-rNuuFCx7Y5J_jExgeYhj0j2SpYOCxFAbtAxSZ2ckks0xWWb9gHxbGqikq&amp;source=gmail&amp;ust=1666405398078000&amp;usg=AOvVaw0X1zQcmy7CHF-sJpw9anmB">เปลี่ยนรหัสผ่านของคุณ</a>
                            
                    <br><br>
  
  
  
                    ขอบคุณ<br>ทีมงาน Epic Games
  
  
                  </div>
                </td>
                <td width="50">&nbsp;</td>
              </tr>
              <tr height="50">
                <td width="50">&nbsp;</td>
                <td height="50" style="line-height:1px;font-size:1px">&nbsp;</td>
                <td width="50">&nbsp;</td>
              </tr>
            </tbody>
          </table>
                    
          <table width="100%" style="min-width:500px" border="0" cellpadding="0" cellspacing="0">
                      <tbody><tr>
                        <td align="center">
                          <table width="500" border="0" cellpadding="0" cellspacing="0" style="min-width:500px">
                                <tbody><tr height="50">
                                    <td width="100%" height="20" style="line-height:1px;font-size:1px">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center">
  
  
              <div style="font-family:arial,helvetica,sans-serif;font-weight:bold;font-size:10px;color:#202020;text-align:center;line-height:12px">
              หากต้องการความช่วยเหลือ  <a style="text-decoration:none;color:#037aee" href="https://accts.epicgames.com/T/v6100000183d2587bf790ff61434b5c58d0/086bb07902f34d1d0000021ef3a0bcc5/086bb079-02f3-4d1d-9f56-cc59b3bdeb6a?__dU__=v0G4RBKTXg2GsSUKeCIT0ZsixpTu2oNAqvl6X7t4UbJT0=&amp;__F__=v0fUYvjHMDjRPMSh3tviDHXIoXcPxvDgUUCCPvXMWoX_30tcPSLyBQEVxcxZVIrRNjLGlO7ag0Cq_K8h1Z6eadrYqGqMAM5P5DvA4NbIL3oT5CJ60BcBYDrzIAR5fJi2NnXDdoDiDAWJReuX0T42aqeHwU4gxhkcXa8vp1xEZ2hY0_d99PnA_V6gpuFiwBffm8f9gkAqVRr1gakLM-WjT6-28_oIzktSoIWCrVKw-4vnRhk0xZVTTDSuabqytZpW0nGLGtktEqG9KZ2ckks0xWWb9gHxbGqikq" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://accts.epicgames.com/T/v6100000183d2587bf790ff61434b5c58d0/086bb07902f34d1d0000021ef3a0bcc5/086bb079-02f3-4d1d-9f56-cc59b3bdeb6a?__dU__%3Dv0G4RBKTXg2GsSUKeCIT0ZsixpTu2oNAqvl6X7t4UbJT0%3D%26__F__%3Dv0fUYvjHMDjRPMSh3tviDHXIoXcPxvDgUUCCPvXMWoX_30tcPSLyBQEVxcxZVIrRNjLGlO7ag0Cq_K8h1Z6eadrYqGqMAM5P5DvA4NbIL3oT5CJ60BcBYDrzIAR5fJi2NnXDdoDiDAWJReuX0T42aqeHwU4gxhkcXa8vp1xEZ2hY0_d99PnA_V6gpuFiwBffm8f9gkAqVRr1gakLM-WjT6-28_oIzktSoIWCrVKw-4vnRhk0xZVTTDSuabqytZpW0nGLGtktEqG9KZ2ckks0xWWb9gHxbGqikq&amp;source=gmail&amp;ust=1666405398078000&amp;usg=AOvVaw1W_WAo2Hgj_vwtPA7afTsA">help.epicgames.com</a><br></div>
  
  
  
                                    </td>
                                </tr>
                                <tr height="30">
                                    <td width="100%" height="20" style="line-height:1px;font-size:1px">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center">
                                      <div style="font-family:arial,helvetica,sans-serif;font-size:10px;color:#202020;text-align:center;line-height:12px">
  
              <p>  
              © 2022, Epic Games, Inc. สงวนลิขสิทธิ์ Epic, Epic Games, โลโก้ Epic Games, Unreal, Unreal Engine, โลโก้ Unreal Engine, Epic Games Store และโลโก้ Epic Games Store เป็นเครื่องหมายการค้าหรือเครื่<wbr>องหมายการค้าที่จดทะเบียนของ Epic Games, Inc. ในสหรัฐอเมริกาและที่อื่นๆ เครื่องหมายการค้าอื่นๆ ทั้งหมดเป็นกรรมสิทธิ์ของเจ้<wbr>าของเครื่องหมายการค้านั้นๆ
  
              </p>
  
                                      </div>
                                    </td>
                                </tr>
                                <tr height="30">
                                    <td width="100%" height="30" style="line-height:1px;font-size:1px">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td align="center">
                                    <div style="font-family:arial,helvetica,sans-serif;font-size:10px;color:#202020;text-align:center;line-height:12px">
                                    
  
              <a href="https://accts.epicgames.com/T/v6100000183d2587bf790ff61434b5c58d0/086bb07902f34d1d0000021ef3a0bcc6/086bb079-02f3-4d1d-9f56-cc59b3bdeb6a?__dU__=v0G4RBKTXg2GsSUKeCIT0ZsixpTu2oNAqvl6X7t4UbJT0=&amp;__F__=v0fUYvjHMDjRPMSh3tviDHXIoXcPxvDgUUCCPvXMWoX_0JoZLAZABQF2Skw9vkwo_mga2JAbIShxrObDbhrBqZOdHhrNBq3lw34VOqP6HvwUyuvJpzvFoxMqpPYuafiXKmYBtfyCxvBp-nJeDcRAG-2vADz43H0TbHYtXeHFz4HraCg2rwbQnTrbyc9WCF3_51k3SA8cMd7iLMEMVl_Tj5jrsw1sXbaaIn4pQqAVE4Glo5IQlExjnWjwJ5S15Hzmjjrca3j60tNC4BBMumw7XZcOvmF_MczqY05eOCohp_r2oaMiJk-Et9vw==" style="color:#037aee" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://accts.epicgames.com/T/v6100000183d2587bf790ff61434b5c58d0/086bb07902f34d1d0000021ef3a0bcc6/086bb079-02f3-4d1d-9f56-cc59b3bdeb6a?__dU__%3Dv0G4RBKTXg2GsSUKeCIT0ZsixpTu2oNAqvl6X7t4UbJT0%3D%26__F__%3Dv0fUYvjHMDjRPMSh3tviDHXIoXcPxvDgUUCCPvXMWoX_0JoZLAZABQF2Skw9vkwo_mga2JAbIShxrObDbhrBqZOdHhrNBq3lw34VOqP6HvwUyuvJpzvFoxMqpPYuafiXKmYBtfyCxvBp-nJeDcRAG-2vADz43H0TbHYtXeHFz4HraCg2rwbQnTrbyc9WCF3_51k3SA8cMd7iLMEMVl_Tj5jrsw1sXbaaIn4pQqAVE4Glo5IQlExjnWjwJ5S15Hzmjjrca3j60tNC4BBMumw7XZcOvmF_MczqY05eOCohp_r2oaMiJk-Et9vw%3D%3D&amp;source=gmail&amp;ust=1666405398078000&amp;usg=AOvVaw20KEZx7oiwllsfyVIniZnN">เงื่อนไขการให้บริการ</a>
  
  
  
              | 
                                    
  
              <a href="https://accts.epicgames.com/T/v6100000183d2587bf790ff61434b5c58d0/086bb07902f34d1d0000021ef3a0bcc7/086bb079-02f3-4d1d-9f56-cc59b3bdeb6a?__dU__=v0G4RBKTXg2GsSUKeCIT0ZsixpTu2oNAqvl6X7t4UbJT0=&amp;__F__=v0fUYvjHMDjRPMSh3tviDHXIoXcPxvDgUUCCPvXMWoX_0JoZLAZABQF2Skw9vkwo_mga2JAbIShxrObDbhrBqZOXsku_GIswQDnxtEJE3LdSIYVUUWgTuk8U7AGPcn7d9FMZpDAEKB2jSi8DMJV9pUyuvMxd9s8CVIf-jAJN4WLJfaDpHieD0BMF7R7b90sPQpPoVHFAMpSUjGKq-RMonZa2UHwt4wMNUWHBcieHFYC_QyA3L2s6U27mrGlJWmeyAHbojdYVy8937jAwbkdTCBla0-VrOh_pjYtlPrsHmU1FEH7ERITGh_a4EmdyFrPEBr" style="color:#037aee" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://accts.epicgames.com/T/v6100000183d2587bf790ff61434b5c58d0/086bb07902f34d1d0000021ef3a0bcc7/086bb079-02f3-4d1d-9f56-cc59b3bdeb6a?__dU__%3Dv0G4RBKTXg2GsSUKeCIT0ZsixpTu2oNAqvl6X7t4UbJT0%3D%26__F__%3Dv0fUYvjHMDjRPMSh3tviDHXIoXcPxvDgUUCCPvXMWoX_0JoZLAZABQF2Skw9vkwo_mga2JAbIShxrObDbhrBqZOXsku_GIswQDnxtEJE3LdSIYVUUWgTuk8U7AGPcn7d9FMZpDAEKB2jSi8DMJV9pUyuvMxd9s8CVIf-jAJN4WLJfaDpHieD0BMF7R7b90sPQpPoVHFAMpSUjGKq-RMonZa2UHwt4wMNUWHBcieHFYC_QyA3L2s6U27mrGlJWmeyAHbojdYVy8937jAwbkdTCBla0-VrOh_pjYtlPrsHmU1FEH7ERITGh_a4EmdyFrPEBr&amp;source=gmail&amp;ust=1666405398078000&amp;usg=AOvVaw3lAcWsS8FjDTBbu5THp_Lo">นโยบายความเป็นส่วนตั </a>
  
  
  
                                    </div>
                                  </td>
                                </tr>
                                <tr height="20">
                                  <td width="100%" height="20" style="line-height:1px;font-size:1px">&nbsp;</td>
                                </tr><tr>
                                </tr><tr height="20">
                                  <td width="100%" height="20" align="center" style="font-family:arial,helvetica,sans-serif;font-size:10px;color:#858585;text-align:center;line-height:12px">Box 254, 2474 Walnut Street, Cary, North Carolina, 27518</td>
                                </tr><tr>
                              </tr></tbody></table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                    
                    
  
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>`
  };
    transporter.sendMail(mailOptions, function(error: any, info: any){
      if (error) {
        console.log(error);
        result.status = "Can't Send"
      } else {
        console.log('Email sent: ' + info.response);
        result.status = "send"
        result.token = jwt.sign( email , 'shhhhh')
      }
    });
    return result
}
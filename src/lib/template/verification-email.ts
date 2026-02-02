interface VerificationEmailProps {
  verificationUrl: string;
  userName?: string;
}

export const verificationEmailTemplate = ({
  verificationUrl,
  userName
}: VerificationEmailProps) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification - Medi Store</title>
</head>
<body style="margin:0; padding:0; background-color:#f0f9ff; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
          
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); padding:40px 30px; text-align:center;">
              <div style="background:#ffffff; width:60px; height:60px; border-radius:12px; margin:0 auto 16px; display:flex; align-items:center; justify-content:center;">
                <span style="font-size:32px;">💊</span>
              </div>
              <h1 style="color:#ffffff; margin:0; font-size:28px; font-weight:600; letter-spacing:-0.5px;">Medi Store</h1>
              <p style="color:#e0f2fe; margin:8px 0 0; font-size:14px;">Your trusted healthcare partner</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 30px;">
              <h2 style="margin:0 0 16px; color:#0f172a; font-size:24px; font-weight:600;">Verify Your Email Address</h2>
              <p style="color:#475569; line-height:1.6; margin:0 0 12px; font-size:15px;">
                Welcome to <strong style="color:#0ea5e9;">Medi Store</strong>! We're excited to have you on board.
              </p>
              <p style="color:#475569; line-height:1.6; margin:0 0 28px; font-size:15px;">
                To get started and access all our healthcare products and services, please verify your email address by clicking the button below.
              </p>
              
              <!-- CTA Button -->
              <div style="text-align:center; margin:32px 0;">
                <a href="${verificationUrl}"
                   style="
                     background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
                     color:#ffffff;
                     padding:16px 40px;
                     text-decoration:none;
                     border-radius:10px;
                     font-weight:600;
                     font-size:16px;
                     display:inline-block;
                     box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
                   ">
                  Verify My Email
                </a>
              </div>
              
              <!-- Divider -->
              <div style="border-top:1px solid #e2e8f0; margin:32px 0;"></div>
              
              <!-- Alternative link -->
              <p style="font-size:13px; color:#64748b; margin:0 0 8px;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <div style="background:#f8fafc; padding:14px; border-radius:8px; border:1px solid #e2e8f0;">
                <p style="font-size:13px; word-break:break-all; margin:0;">
                  <a href="${verificationUrl}" style="color:#0ea5e9; text-decoration:none;">
                    ${verificationUrl}
                  </a>
                </p>
              </div>
              
              <!-- Security notice -->
              <div style="background:#fef3c7; border-left:4px solid #f59e0b; padding:16px; margin:24px 0 0; border-radius:6px;">
                <p style="font-size:13px; color:#92400e; margin:0; line-height:1.5;">
                  <strong>🔒 Security Notice:</strong> This verification link will expire in 24 hours. If you didn't create an account with Medi Store, please ignore this email.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Features section -->
          <tr>
            <td style="background:#f8fafc; padding:30px 40px;">
              <p style="color:#475569; font-size:14px; margin:0 0 16px; font-weight:600;">What you can do with Medi Store:</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="33%" style="padding:8px; text-align:center;">
                    <div style="font-size:24px; margin-bottom:8px;">🏥</div>
                    <p style="color:#64748b; font-size:12px; margin:0; line-height:1.4;">Quality Medicines</p>
                  </td>
                  <td width="33%" style="padding:8px; text-align:center;">
                    <div style="font-size:24px; margin-bottom:8px;">🚚</div>
                    <p style="color:#64748b; font-size:12px; margin:0; line-height:1.4;">Fast Delivery</p>
                  </td>
                  <td width="33%" style="padding:8px; text-align:center;">
                    <div style="font-size:24px; margin-bottom:8px;">💳</div>
                    <p style="color:#64748b; font-size:12px; margin:0; line-height:1.4;">Secure Payment</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background:#0f172a; padding:24px 40px; text-align:center;">
              <p style="color:#94a3b8; font-size:13px; margin:0 0 12px; line-height:1.5;">
                Need help? Contact us at <a href="mailto:support@medistore.com" style="color:#0ea5e9; text-decoration:none;">support@medistore.com</a>
              </p>
              <p style="color:#64748b; font-size:12px; margin:0;">
                © ${new Date().getFullYear()} Medi Store. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
</body>
</html>
`;
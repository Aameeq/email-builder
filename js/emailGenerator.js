/**
 * Email HTML Generator
 * Generates robust, cross-client compatible HTML emails (Outlook, Gmail, Apple Mail, Yahoo)
 * with individual clickable link segments for every element.
 */

function generateEmailHTML(data, options = {}) {
  const baseUrl = options.baseUrl || '';

  // Helper to normalize image URLs
  const getImgUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    // If user provided a base URL or we're on the hosted site
    if (baseUrl) {
      const cleanBase = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
      const cleanPath = url.startsWith('/') ? url.slice(1) : url;
      return cleanBase + cleanPath;
    }
    return url;
  };

  // Build bullet points for Key Features
  const featuresHtml = data.features.items.map(item => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 10px;">
      <tr>
        <td valign="top" style="width: 14px; padding-right: 6px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 18px; color: ${data.features.textColor}; font-weight: bold;">
          &bull;
        </td>
        <td valign="top" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 18px; color: ${data.features.textColor};">
          <strong style="color: ${data.features.textColor}; display: inline;">${item.title}</strong><br/>
          <span style="color: ${data.features.textColor}; font-size: 12px; line-height: 16px; opacity: 0.95;">${item.description}</span>
        </td>
      </tr>
    </table>
  `).join('');

  // Build social icons
  const socialIconsList = [];
  if (data.social.facebook && data.social.facebook.active) {
    socialIconsList.push(`
      <td align="center" style="padding: 0 10px;">
        <a href="${data.social.facebook.link || '#'}" target="_blank" style="text-decoration: none; display: inline-block;">
          <img src="${getImgUrl(data.social.facebook.iconUrl)}" alt="${data.social.facebook.alt || 'Facebook'}" width="38" height="38" style="display: block; width: 38px; height: 38px; border: 0; outline: none; border-radius: 9px;" />
        </a>
      </td>
    `);
  }
  if (data.social.instagram.active) {
    socialIconsList.push(`
      <td align="center" style="padding: 0 10px;">
        <a href="${data.social.instagram.link || '#'}" target="_blank" style="text-decoration: none; display: inline-block;">
          <img src="${getImgUrl(data.social.instagram.iconUrl)}" alt="${data.social.instagram.alt || 'Instagram'}" width="38" height="38" style="display: block; width: 38px; height: 38px; border: 0; outline: none; border-radius: 9px;" />
        </a>
      </td>
    `);
  }
  if (data.social.linkedin.active) {
    socialIconsList.push(`
      <td align="center" style="padding: 0 10px;">
        <a href="${data.social.linkedin.link || '#'}" target="_blank" style="text-decoration: none; display: inline-block;">
          <img src="${getImgUrl(data.social.linkedin.iconUrl)}" alt="${data.social.linkedin.alt || 'LinkedIn'}" width="38" height="38" style="display: block; width: 38px; height: 38px; border: 0; outline: none; border-radius: 9px;" />
        </a>
      </td>
    `);
  }
  if (data.social.youtube.active) {
    socialIconsList.push(`
      <td align="center" style="padding: 0 10px;">
        <a href="${data.social.youtube.link || '#'}" target="_blank" style="text-decoration: none; display: inline-block;">
          <img src="${getImgUrl(data.social.youtube.iconUrl)}" alt="${data.social.youtube.alt || 'YouTube'}" width="46" height="38" style="display: block; width: 46px; height: 38px; border: 0; outline: none; border-radius: 9px;" />
        </a>
      </td>
    `);
  }

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${data.header.title} - INSIZE</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, p, a, span { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
  <style type="text/css">
    /* Client-specific Resets */
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      background-color: #eef2f5;
    }
    table, td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
    /* Mobile Responsive Rules */
    @media only screen and (max-width: 620px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
      }
      .mobile-padding {
        padding-left: 16px !important;
        padding-right: 16px !important;
      }
      .header-title {
        font-size: 20px !important;
      }
      .footer-stack {
        display: block !important;
        width: 100% !important;
        text-align: center !important;
        padding: 4px 0 !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #eef2f5; font-family: Arial, Helvetica, sans-serif;">
  <center style="width: 100%; background-color: #eef2f5;">
    <!--[if (gte mso 9)|(IE)]>
    <table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td>
    <![endif]-->

    <!-- Main Email Container -->
    <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e1e6eb; box-shadow: 0 4px 18px rgba(0,0,0,0.06);">
      
      <!-- 1. HEADER SECTION (Logo + Title) -->
      <tr>
        <td bgcolor="${data.header.bgColor}" style="background-color: ${data.header.bgColor}; padding: 14px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <!-- Logo Container with Link -->
              <td align="left" valign="middle" style="width: 120px;">
                <a href="${data.header.logo.link || '#'}" target="_blank" style="text-decoration: none; display: inline-block;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 3px; padding: 3px 6px;">
                    <tr>
                      <td>
                        <img src="${getImgUrl(data.header.logo.url)}" alt="${data.header.logo.alt}" width="100" style="display: block; width: 100px; height: auto; border: 0;" />
                      </td>
                    </tr>
                  </table>
                </a>
              </td>
              <!-- Header Title -->
              <td align="center" valign="middle" class="header-title" style="padding-right: 30px; font-family: 'Arial Black', Arial, Helvetica, sans-serif; font-size: 25px; font-weight: 900; letter-spacing: 0.5px; color: ${data.header.titleColor}; text-transform: uppercase;">
                ${data.header.title}
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- 2. INTRO BODY SECTION -->
      <tr>
        <td bgcolor="${data.body.bgColor}" class="mobile-padding" style="background-color: ${data.body.bgColor}; padding: 22px 24px 16px 24px; font-family: Arial, Helvetica, sans-serif; color: ${data.body.textColor};">
          <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 20px; font-weight: normal; color: ${data.body.textColor};">
            ${data.body.greeting}
          </p>
          <p style="margin: 0; font-size: 13.5px; line-height: 21px; color: ${data.body.textColor};">
            ${data.body.content}
          </p>
        </td>
      </tr>

      <!-- 3. PRODUCT SHOWCASE IMAGE (With clickable Link) -->
      <tr>
        <td bgcolor="${data.body.bgColor}" class="mobile-padding" align="center" style="background-color: ${data.body.bgColor}; padding: 8px 24px 16px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" style="border: 1px solid #e2e5e8; background-color: #ffffff; border-radius: 2px; overflow: hidden;">
                <a href="${data.product.link || '#'}" target="_blank" style="text-decoration: none; display: block;">
                  <img src="${getImgUrl(data.product.imageUrl)}" alt="${data.product.alt}" width="550" style="display: block; width: 100%; max-width: 550px; height: auto; border: 0; margin: 0 auto;" />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- 4. KEY FEATURES SECTION (Full width Green Callout) -->
      <tr>
        <td bgcolor="${data.features.bgColor}" class="mobile-padding" style="background-color: ${data.features.bgColor}; padding: 18px 24px 20px 24px;">
          <!-- Features Title -->
          <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14.5px; font-weight: bold; color: ${data.features.textColor}; margin-bottom: 12px;">
            <a href="${data.features.link || '#'}" target="_blank" style="color: ${data.features.textColor}; text-decoration: none;">
              ${data.features.title}
            </a>
          </div>
          <!-- Features Bullets -->
          ${featuresHtml}
        </td>
      </tr>

      <!-- 5. SOCIAL MEDIA ICONS SECTION -->
      <tr>
        <td bgcolor="${data.social.bgColor}" style="background-color: ${data.social.bgColor}; padding: 14px 20px 20px 20px;">
          <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0">
            <tr>
              ${socialIconsList.join('')}
            </tr>
          </table>
        </td>
      </tr>

      <!-- 6. FOOTER BAR -->
      <tr>
        <td bgcolor="${data.footer.bgColor}" style="background-color: ${data.footer.bgColor}; padding: 12px 20px; border-top: 1px solid #c8d8d7;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="left" class="footer-stack" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: bold; color: ${data.footer.textColor};">
                <a href="${data.footer.companyLink || '#'}" target="_blank" style="color: ${data.footer.textColor}; text-decoration: none;">
                  ${data.footer.companyText}
                </a>
              </td>
              <td align="right" class="footer-stack" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: bold; color: ${data.footer.textColor};">
                ${data.footer.copyrightText}
              </td>
            </tr>
          </table>
        </td>
      </tr>

    </table>
    <!-- End Main Email Container -->

    <!--[if (gte mso 9)|(IE)]>
        </td>
      </tr>
    </table>
    <![endif]-->
  </center>
</body>
</html>`;
}

window.generateEmailHTML = generateEmailHTML;

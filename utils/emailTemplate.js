const getEmailTemplate = (bookingData) => {
  const {
    firstName,
    lastName,
    parentEmail,
    parentPhone,
    parentAddress,
    numberOfChildren,
    children,
    startDate,
    expiryDate,
    membershipPlan,
    totalAmountPaid,
    bookingId,
    planDescription,
  } = bookingData;

  // Function to calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Format children names with calculated age
  const childrenNames = children
    .map((child) => {
      const age = calculateAge(child.dateOfBirth);
      return `${child.name} (${age} years, ${child.gender})`;
    })
    .join(", ");

  // Format date
  const formattedDate = new Date(startDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Helper to calculate plan expiry
  function getPlanExpiry(plan, startDate) {
    const planName = plan ? plan.toLowerCase() : "";
    let period = "";
    if (
      planName.includes("1 day") ||
      planName.includes("3-day") ||
      planName.includes("3 days") ||
      planName.includes("1 week") ||
      planName.includes("3 sessions") ||
      planName.includes("4 days") ||
      planName.includes("5-day") ||
      planName.includes("5 days")
    ) {
      period = "(within 1 week)";
    } else if (
      planName.includes("8 days") ||
      planName.includes("10-day") ||
      planName.includes("10 days") ||
      planName.includes("12-session") ||
      planName.includes("12 sessions")
    ) {
      period = "(within 2 weeks)";
    } else if (
      planName.includes("16 days") ||
      planName.includes("20-day") ||
      planName.includes("20 days") ||
      planName.includes("21-session") ||
      planName.includes("21 sessions")
    ) {
      period = "(within 1 month)";
    } else if (
      planName.includes("full camp") ||
      planName.includes("full access") ||
      planName.includes("unlimited")
    ) {
      period = "Full camp duration";
    } else {
      period = "Access period based on selected plan.";
    }
    return `<div style='color:#1976d2;font-size:14px;'><strong>Access Period:</strong> ${period}</div>`;
  }

  // Determine email title and logo alt text based on plan
  function getEmailBranding(plan, planDescription) {
    // First check the description for unique keywords
    const description = planDescription ? planDescription.toLowerCase() : "";

    // Football Clinic indicators in description
    if (description.includes("football") || description.includes("training")) {
      return {
        title: "Atomics Football Clinic",
        logoAlt: "Atomics Football Academy Logo",
      };
    }

    // Kids Camp indicators in description
    if (
      description.includes("camp") ||
      description.includes("summer") ||
      description.includes("monday")
    ) {
      return {
        title: "Atomics Sports & Entertainment Winter Camp",
        logoAlt: "Atomics Entertainment Logo",
      };
    }

    // Fallback to checking plan name if description doesn't have clear indicators
    const planName = plan ? plan.toLowerCase() : "";

    // Football Clinic indicators in name
    if (
      planName.includes("football") ||
      planName.includes("clinic") ||
      planName.includes("session")
    ) {
      return {
        title: "Atomics Football Clinic",
        logoAlt: "Atomics Football Academy Logo",
      };
    }

    // Kids Camp indicators in name
    if (planName.includes("camp") || planName.includes("day access")) {
      return {
        title: "Atomics Sports & Entertainment Winter Camp",
        logoAlt: "Atomics Entertainment Logo",
      };
    }

    // Default to Football Clinic branding
    return {
      title: "Atomics Football Clinic",
      logoAlt: "Atomics Football Academy Logo",
    };
  }
  const branding = getEmailBranding(membershipPlan, planDescription);
  // REMINDER: Update the logo URL to your public server when deploying
  const logoUrl = `${"https://wintercamp-client.vercel.app"}/public/email-logo.jpeg`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${branding.title} - Booking Confirmation</title>     
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8f9fa;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa;">
            <tr>
                <td align="center" style="padding: 20px;">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 600px;">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #ed3227 0%, #c41e3a 100%); color: white; padding: 40px 30px; text-align: center;">
                                <div style="font-size: 32px; font-weight: bold; color: white; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">${
                                  branding.title
                                }</div>
                                <div style="font-size: 16px; opacity: 0.9; font-weight: 300;">Booking Confirmation</div>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <!-- Booking ID -->
                                <div style="background: linear-gradient(135deg, #ed3227 0%, #c41e3a 100%); color: white; padding: 15px 25px; border-radius: 30px; display: inline-block; font-weight: bold; font-size: 16px; margin-bottom: 30px; text-align: center; width: calc(100% - 50px);">
                                    Booking ID: ${bookingId}
                                </div>
                                
                                <!-- Booking Details -->
                                <div style="background-color: #f8f9fa; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #e9ecef;">
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="font-weight: 600; color: #495057; font-size: 14px;">Parent Name:</td>
                                                        <td style="color: #212529; text-align: right; font-weight: 500; font-size: 14px;">${firstName} ${lastName}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="font-weight: 600; color: #495057; font-size: 14px;">Email:</td>
                                                        <td style="color: #212529; text-align: right; font-weight: 500; font-size: 14px;">${parentEmail}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="font-weight: 600; color: #495057; font-size: 14px;">Phone:</td>
                                                        <td style="color: #212529; text-align: right; font-weight: 500; font-size: 14px;">${parentPhone}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="font-weight: 600; color: #495057; font-size: 14px;">Address:</td>
                                                        <td style="color: #212529; text-align: right; font-weight: 500; font-size: 14px;">${parentAddress}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="font-weight: 600; color: #495057; font-size: 14px;">Children:</td>
                                                        <td style="color: #212529; text-align: right; font-weight: 500; font-size: 14px;">${childrenNames}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="font-weight: 600; color: #495057; font-size: 14px;">Start Date:</td>
                                                        <td style="color: #212529; text-align: right; font-weight: 500; font-size: 14px;">${formattedDate}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="font-weight: 600; color: #495057; font-size: 14px;">Expiry Date:</td>
                                                        <td style="color: #212529; text-align: right; font-weight: 500; font-size: 14px;">${
                                                          expiryDate
                                                            ? new Date(
                                                                expiryDate
                                                              ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                  weekday:
                                                                    "long",
                                                                  year: "numeric",
                                                                  month: "long",
                                                                  day: "numeric",
                                                                }
                                                              )
                                                            : "N/A"
                                                        }</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="font-weight: 600; color: #495057; font-size: 14px;">Plan:</td>
                                                        <td style="color: #212529; text-align: right; font-weight: 500; font-size: 14px;">${membershipPlan}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="font-weight: 600; color: #495057; font-size: 14px;">Location:</td>
                                                        <td style="color: #212529; text-align: right; font-weight: 500; font-size: 14px;">
                                                          Active Al Maryah Island Sports & Recreation , Abu Dhabi
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 12px 0;">
                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="font-weight: 600; color: #495057; font-size: 14px;">Total Amount:</td>
                                                        <td style="color: #212529; text-align: right; font-weight: 500; font-size: 14px;">AED ${totalAmountPaid}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                
                                <!-- Plan Expiry Note -->
                                <div style="background: #e3f2fd; border-radius: 8px; padding: 18px 24px; margin-bottom: 30px; text-align: left; font-size: 15px; color: #1976d2;">
                                  <strong>Plan:</strong> ${membershipPlan}<br/>
                                  ${getPlanExpiry(membershipPlan, startDate)}
                                </div>
                                
                                <!-- Welcome Section -->
                                <div style="text-align: center; margin: 40px 0; padding: 30px; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px;">
                                    <h3 style="color: #1976d2; margin-bottom: 15px; font-size: 20px;">🎉 Welcome to Atomics Football Winter Camp!</h3>
                                    <p style="color: #424242; line-height: 1.6; font-size: 15px;">
                                        Thank you for choosing our winter camp! We're excited to have your children join us for an amazing 
                                        sports experience filled with fun, learning, and adventure. Our experienced coaches are ready to 
                                        provide the best training and guidance for your young athletes.
                                    </p>
                                </div>
                                
                                <!-- Important Information -->
                                <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); border: 1px solid #f39c12; border-radius: 12px; padding: 25px; margin: 30px 0;">
                                    <h3 style="color: #856404; margin-bottom: 15px; font-size: 18px;">📋 Important Information</h3>
                                    <ul style="margin: 0; padding-left: 20px; color: #856404;">
                                        <li style="margin-bottom: 10px; font-size: 14px;"><strong>Check-in Time:</strong> 8:30 AM to 8:55 AM</li>
                                        <li style="margin-bottom: 10px; font-size: 14px;"><strong>Program Start:</strong> 9:00 AM</li>
                                        <li style="margin-bottom: 10px; font-size: 14px;"><strong>Contact:</strong> 050 333 1468 for any questions or concerns</li>
                                        <li style="margin-bottom: 10px; font-size: 14px;"><strong>Weather:</strong> Activities may be adjusted based on weather conditions for safety</li>
                                        <li style="margin-bottom: 10px; font-size: 14px;"><strong>Consent Form:</strong> Please complete the consent form to finalize your booking</li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #343a40 0%, #212529 100%); color: white; padding: 30px; text-align: center;">
                                <div style="margin-bottom: 20px;">
                                    <p style="margin: 8px 0; font-size: 14px; opacity: 0.9;"><strong style="color: #fff; font-weight: 600;">Atomics Football Winter Camp</strong></p>
                                    <p style="margin: 8px 0; font-size: 14px; opacity: 0.9;">📍 Active Al Maryah Island Sports & Recreation , Abu Dhabi</p>
                                    <p style="margin: 8px 0; font-size: 14px; opacity: 0.9;">📞 050 333 1468</p>
                                    <p style="margin: 8px 0; font-size: 14px; opacity: 0.9;">✉️ info@atomicsfootball.com</p>
                                </div>

                                <div style="margin-top: 20px; font-size: 12px; opacity: 0.7;">
                                    © 2025 Atomic Football Academy. All rights reserved.
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
};

module.exports = getEmailTemplate;

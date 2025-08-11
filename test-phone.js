// Test script to verify phone field is working
const testData = {
  name: "Test User",
  email: "test@example.com",
  phone: "+1234567890",
  company_name: "Test Company",
  industry: "technology",
  message: "Test message with phone number",
  consent: true
};

console.log("Test data being sent:");
console.log(JSON.stringify(testData, null, 2));
console.log("Phone value:", testData.phone);
console.log("Phone type:", typeof testData.phone);

// This simulates what the form sends
fetch("https://raqkxeahwupzhuyfnsew.supabase.co/functions/v1/send-contact-email", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(testData),
})
.then(response => response.json())
.then(data => {
  console.log("Response:", data);
})
.catch(error => {
  console.error("Error:", error);
});

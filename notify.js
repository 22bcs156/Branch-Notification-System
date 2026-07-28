const fs = require("fs");
const nodemailer = require("nodemailer");
const twilio = require("twilio");

const event = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")
);
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const data = {
    repository: process.env.GITHUB_REPOSITORY,
    branch: process.env.GITHUB_REF.replace("refs/heads/", ""),
    actor: process.env.GITHUB_ACTOR,
    commitMessage: event.head_commit.message,
    timestamp: event.head_commit.timestamp
};
const team=["ayyanar210420051@gmail.com",
            "muthumathiyazhagan@gmail.com",
];
async function sendEmail() {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
for (const email of team) {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: `Branch Updated: ${data.branch}`,
        text: `
Repository : ${data.repository}

Branch : ${data.branch}

Developer : ${data.actor}

Commit : ${data.commitMessage}

Time : ${data.timestamp}
`
    });

}

    console.log("Email Sent Successfully");
}
// async function sendSMS() {
//     const message = await client.messages.create({
//         body: `Branch Updated: ${data.branch}\nRepository: ${data.repository}\nDeveloper: ${data.actor}\nCommit: ${data.commitMessage}\nTime: ${data.timestamp}`,
//         from: "", // Replace with your Twilio phone number
//         to: "+917904477883" // Replace with the recipient's phone number
//     });}

sendEmail().catch(console.error);
const fs = require("fs");
const nodemailer = require("nodemailer");

const event = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")
);

const data = {
    repository: process.env.GITHUB_REPOSITORY,
    branch: process.env.GITHUB_REF.replace("refs/heads/", ""),
    actor: process.env.GITHUB_ACTOR,
    commitMessage: event.head_commit.message,
    timestamp: event.head_commit.timestamp
};

async function sendEmail() {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: "ayyanar21042005@gmail.com",
        subject: `Branch Updated: ${data.branch}`,
        text: `
Repository : ${data.repository}

Branch : ${data.branch}

Developer : ${data.actor}

Commit : ${data.commitMessage}

Time : ${data.timestamp}
`
    });

    console.log("Email Sent Successfully");
}

sendEmail().catch(console.error);
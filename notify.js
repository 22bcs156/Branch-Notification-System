const fs = require("fs");

const event = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")
);

const data = {
    repository: process.env.GITHUB_REPOSITORY,
    branch: process.env.GITHUB_REF.replace("refs/heads/", ""),
    actor: process.env.GITHUB_ACTOR,
    workflow: process.env.GITHUB_WORKFLOW,
    commitMessage: event.head_commit.message,
    commitId: event.head_commit.id,
    author: event.head_commit.author.name,
    timestamp: event.head_commit.timestamp
};

console.log(data);
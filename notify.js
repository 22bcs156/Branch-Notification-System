const rf=requers("fs");
const event=JSON.parse(rf.readFileSync(process.env.gethub_event_path,"utf8"));
const data={
    repository:process.env.gethub_repository,
    branch:process.env.gethub_ref.replace("refs/heads/",""),
    actor:process.env.gethub_actor,
    workflow:process.env.gethub_workflow,
    commitMessage: event.head_commit.message,
    commitId: event.head_commit.id,
    author: event.head_commit.author.name,
    timestamp: event.head_commit.timestamp
};
console.log("Branch Notification Data:",data);

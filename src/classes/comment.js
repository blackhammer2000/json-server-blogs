export class Comment {
  constructor(name, email, body) {
    return {
      name: name,
      email: email,
      comment_ID: crypto.randomUUID(),
      time_posted: new Date().toLocaleString(),
      body: body,
      comment_reactions: {
        comment_likes: [],
        comment_replies: [],
      },
    };
  }
}

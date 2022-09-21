export class Comment {
  constructor(name, email, body) {
    return {
      name: name,
      email: email,
      comment: {
        body: body,
        comment_ID: crypto.randomUUID(),
        replies: [],
      },
    };
  }
}

export class Comment {
  constructor(name, email, body) {
    return {
      name: name,
      email: email,
      comment_ID: crypto.randomUUID(),
      comment: {
        body: body,
        replies: [],
      },
    };
  }
}

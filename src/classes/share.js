export class Share {
  constructor(name, email, sharer_ID) {
    return {
      name,
      email,
      sharer_ID,
      share_ID: crypto.randomUUID(),
      shares: {
        facebook: {},
        twitter: {},
        instagram: {},
      },
    };
  }
}

export class Like {
  constructor(name, email) {
    return { name, email, id: crypto.randomUUID() };
  }
}

export class CreateUserCommand {
    constructor(
      public username: string,
      public password: string,
      public email: string,
      public roleId: number
    ) {}
  }
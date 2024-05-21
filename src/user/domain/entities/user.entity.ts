// src/user/domain/entities/user.entity.ts
export class User {
    constructor(
      public id: number,
      public username: string,
      public password: string,
      public email: string,
      public roleId: number
    ) {}
  }
  
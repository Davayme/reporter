import { CreateServerDto } from "../dto/create-server.dto";
import { UpdateServerDto } from "../dto/update-server.dto";

export class CreateServerCommand {
  constructor(public readonly serverDto: CreateServerDto) {}
}

export class UpdateServerCommand {
  constructor(public readonly id: number, public readonly serverDto: UpdateServerDto) {}
}

export class DeleteServerCommand {
  constructor(public readonly id: number) {}
}

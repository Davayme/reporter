import { CreateServerDto } from "../dto/create-server.dto";

export class CreateServerCommand {
  constructor(public readonly serverDto: CreateServerDto) {}
}

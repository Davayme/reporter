import { CreateTemplateDetailDto } from "../dtos/create-template-detail.dto";
import { UpdateTemplateDetailDto } from "../dtos/update-template-detail.dto";

export class CreateTemplateDetailsCommand {
    constructor(
        public readonly createTemplateDetailsDto: CreateTemplateDetailDto[],
        public readonly templateId: number
    ) { }
}

export class UpdateTemplateDetailsCommand {
    constructor(
        public readonly templateDetails: (UpdateTemplateDetailDto & { id_detail: number })[]
    ) { }
}

export class DeleteTemplateDetailCommand {
    constructor(public readonly id_details: number[]) { }
}
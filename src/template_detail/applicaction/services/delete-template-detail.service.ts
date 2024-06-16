import { Inject, Injectable } from "@nestjs/common";
import { TemplateDetailRepository } from "src/template_detail/domain/repositories/template-detail.repository";
import { DeleteTemplateDetailCommand } from "../commands/template-detail.command";

@Injectable()
export class DeleteTemplateDetailService {
    constructor(
    @Inject('TemplateDetailRepository') private readonly templateDetailRepository: TemplateDetailRepository
    ) { }

    async delete(command: DeleteTemplateDetailCommand): Promise<void> {
        await this.templateDetailRepository.updateStatusToInactive(command.id_details);
    }
}
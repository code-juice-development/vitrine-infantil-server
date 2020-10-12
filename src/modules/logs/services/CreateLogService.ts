import { injectable, inject } from 'tsyringe';

import ILogsRepository from '@modules/logs/repositories/ILogsRepository';

import Log from '@modules/logs/infra/typeorm/entities/Log';

interface IRequest {
  name: string;

  type: 'product' | 'error';

  description: string;

  content: string;
}

@injectable()
class CreateLogService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  public async execute({
    name,
    type,
    description,
    content,
  }: IRequest): Promise<Log> {
    const log = await this.logsRepository.create({
      name,
      type,
      description,
      content,
    });

    return log;
  }
}

export default CreateLogService;

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILogsRepository from '@modules/logs/repositories/ILogsRepository';

import Log from '@modules/logs/infra/typeorm/entities/Log';

interface IRequest {
  id: string;
}

@injectable()
class ShowLogService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Log> {
    const log = await this.logsRepository.findById(id);

    if (!log) {
      throw new AppError('Não foi encontrado Log com o ID informado');
    }

    return log;
  }
}

export default ShowLogService;

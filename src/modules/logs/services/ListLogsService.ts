import { injectable, inject } from 'tsyringe';

import ILogsRepository from '@modules/logs/repositories/ILogsRepository';

import Log from '@modules/logs/infra/typeorm/entities/Log';

@injectable()
class ListLogsService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  public async execute(): Promise<Log[]> {
    const logs = await this.logsRepository.findAll();

    return logs;
  }
}

export default ListLogsService;

import { injectable, inject } from 'tsyringe';

import ILogsRepository from '@modules/logs/repositories/ILogsRepository';

@injectable()
class DeleteAllLogsService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  public async execute(): Promise<void> {
    await this.logsRepository.deleteAll();
  }
}

export default DeleteAllLogsService;

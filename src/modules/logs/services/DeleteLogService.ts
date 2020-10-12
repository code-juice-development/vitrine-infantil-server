import { injectable, inject } from 'tsyringe';

import ILogsRepository from '@modules/logs/repositories/ILogsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteLogService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.logsRepository.delete(id);
  }
}

export default DeleteLogService;

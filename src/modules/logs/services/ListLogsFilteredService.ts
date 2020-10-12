import { injectable, inject } from 'tsyringe';

import ILogsRepository from '@modules/logs/repositories/ILogsRepository';

import Log from '@modules/logs/infra/typeorm/entities/Log';

interface IRequest {
  content: string;

  page: number;
}

interface IResponse {
  total: number;

  logs: Log[];
}

@injectable()
class ListLogsFilteredService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  public async execute({ content, page }: IRequest): Promise<IResponse> {
    const {
      total,
      logs,
    } = await this.logsRepository.findByContentWithPagination(content, page);

    return {
      total,
      logs,
    };
  }
}

export default ListLogsFilteredService;

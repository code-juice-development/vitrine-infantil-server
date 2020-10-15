import ICreateLogDTO from '@modules/logs/dtos/ICreateLogDTO';

import Log from '@modules/logs/infra/typeorm/entities/Log';

export interface ILogsWithCount {
  total: number;
  logs: Log[];
}

interface ILogsRepository {
  create(data: ICreateLogDTO): Promise<Log>;

  delete(id: string): Promise<boolean>;

  deleteAll(): Promise<boolean>;

  findById(id: string): Promise<Log | undefined>;

  findByContentWithPagination(
    content: string,
    page: number,
  ): Promise<ILogsWithCount>;

  findAll(): Promise<Log[]>;
}

export default ILogsRepository;

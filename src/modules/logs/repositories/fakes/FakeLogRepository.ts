import { v4 } from 'uuid';

import ICreateLogDTO from '@modules/logs/dtos/ICreateLogDTO';

import ILogsRepository, {
  ILogsWithCount,
} from '@modules/logs/repositories/ILogsRepository';

import Log from '@modules/logs/infra/typeorm/entities/Log';

class FakeLogsRepository implements ILogsRepository {
  private logs: Log[] = [];

  public async create({
    name,
    type,
    description,
    content,
  }: ICreateLogDTO): Promise<Log> {
    const log = new Log();

    Object.assign(log, { id: v4() }, { name, type, description, content });

    this.logs.push(log);

    return log;
  }

  public async delete(id: string): Promise<boolean> {
    this.logs = this.logs.filter((log) => log.id !== id);

    return true;
  }

  public async deleteAll(): Promise<boolean> {
    this.logs = [];

    return true;
  }

  public async findById(id: string): Promise<Log | undefined> {
    const log = this.logs.find((actualLog) => actualLog.id === id);

    return log;
  }

  public async findByContentWithPagination(
    content: string,
    page: number,
  ): Promise<ILogsWithCount> {
    const logs = this.logs.filter(
      (actualLog) => !(content && actualLog.content !== content),
    );

    return {
      total: logs.length,
      logs: logs.slice((page - 1) * 10, 1),
    };
  }

  public async findAll(): Promise<Log[]> {
    return this.logs;
  }
}

export default FakeLogsRepository;

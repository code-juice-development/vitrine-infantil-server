import { Repository, getRepository, Like } from 'typeorm';

import ILogsRepository, {
  ILogsWithCount,
} from '@modules/logs/repositories/ILogsRepository';
import ICreateLogDTO from '@modules/logs/dtos/ICreateLogDTO';

import Log from '@modules/logs/infra/typeorm/entities/Log';

class LogsRepository implements ILogsRepository {
  private ormRepository: Repository<Log>;

  constructor() {
    this.ormRepository = getRepository(Log);
  }

  public async create({
    name,
    type,
    description,
    content,
  }: ICreateLogDTO): Promise<Log> {
    const log = this.ormRepository.create({
      name,
      type,
      description,
      content,
    });

    await this.ormRepository.save(log);

    return log;
  }

  public async delete(id: string): Promise<boolean> {
    const deleteResult = await this.ormRepository.delete(id);

    return deleteResult.affected !== null;
  }

  public async findById(id: string): Promise<Log | undefined> {
    const log = await this.ormRepository.findOne(id);

    return log;
  }

  public async findAll(): Promise<Log[]> {
    const logs = (await this.ormRepository.find()) || [];

    return logs;
  }

  public async findByContentWithPagination(
    content: string,
    page: number,
  ): Promise<ILogsWithCount> {
    const queryBuilder = this.ormRepository.createQueryBuilder();

    if (content) {
      queryBuilder.where({
        content: Like(`%${content}%`),
      });
    }

    const total = await queryBuilder.getCount();

    if (page) {
      queryBuilder.skip((page - 1) * 10).take(10);
    }

    const logs = (await queryBuilder.getMany()) || [];

    return { total, logs };
  }
}

export default LogsRepository;

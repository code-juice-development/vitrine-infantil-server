import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteLogService from '@modules/logs/services/DeleteLogService';
import ListLogsFilteredService from '@modules/logs/services/ListLogsFilteredService';
import ShowLogService from '@modules/logs/services/ShowLogService';

class LogsController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteLogService = container.resolve(DeleteLogService);

    await deleteLogService.execute({ id });

    return response.status(204).send();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { content, page } = request.query;

    const listLogsFilteredService = container.resolve(ListLogsFilteredService);

    const { total, logs } = await listLogsFilteredService.execute({
      content: String(content ?? ''),
      page: Number(page ?? 0),
    });

    response.header('Access-Control-Expose-Headers', 'X-Total-Count');
    response.header('X-Total-Count', String(total));

    return response.json(logs);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showLogService = container.resolve(ShowLogService);

    const log = showLogService.execute({ id });

    return response.json(log);
  }
}

export default LogsController;

import FakeLogsRepository from '@modules/logs/repositories/fakes/FakeLogRepository';

import DeleteLogService from '@modules/logs/services/DeleteLogService';

let fakeLogsRepository: FakeLogsRepository;
let deleteLogService: DeleteLogService;

describe('Delete Log Service', () => {
  beforeEach(() => {
    fakeLogsRepository = new FakeLogsRepository();
    deleteLogService = new DeleteLogService(fakeLogsRepository);
  });

  it('should be able to delete a Log', async () => {
    const log = await fakeLogsRepository.create({
      name: 'Erro ao processar a requisição',
      type: 'error',
      description: 'Erro ao processar o pool da requisição',
      content: JSON.stringify({
        id: 's4s56s46d5a',
        name: 'Pool Error',
      }),
    });

    const { id } = log;

    await deleteLogService.execute({ id });

    const findLog = await fakeLogsRepository.findById(id);

    expect(findLog).toEqual(undefined);
  });
});

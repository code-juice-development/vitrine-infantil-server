import FakeLogsRepository from '@modules/logs/repositories/fakes/FakeLogRepository';

import ShowLogService from '@modules/logs/services/ShowLogService';

let fakeLogsRepository: FakeLogsRepository;
let showLogService: ShowLogService;

describe('Show Log Service', () => {
  beforeEach(() => {
    fakeLogsRepository = new FakeLogsRepository();
    showLogService = new ShowLogService(fakeLogsRepository);
  });

  it('should be able to show a Log', async () => {
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

    const findLog = await showLogService.execute({ id });

    expect(findLog).toEqual(log);
  });
});

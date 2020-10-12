import FakeLogsRepository from '@modules/logs/repositories/fakes/FakeLogRepository';

import ListLogsFilteredService from '@modules/logs/services/ListLogsFilteredService';

let fakeLogsRepository: FakeLogsRepository;
let listLogsService: ListLogsFilteredService;

describe('List Log Service', () => {
  beforeEach(() => {
    fakeLogsRepository = new FakeLogsRepository();
    listLogsService = new ListLogsFilteredService(fakeLogsRepository);
  });

  it('should be able to list all Logs filtered', async () => {
    const logError = await fakeLogsRepository.create({
      name: 'Erro ao processar a requisição',
      type: 'error',
      description: 'Erro ao processar o pool da requisição',
      content: JSON.stringify({
        id: 's4s56s46d5a',
        name: 'Erro de Pool',
      }),
    });

    const logProductError = await fakeLogsRepository.create({
      name: 'Erro ao importar o Produto',
      type: 'product',
      description: 'Erro ao processar a importação do produto',
      content: JSON.stringify({
        id: 's4s56s46d5a',
        name: 'Loja Com Amor',
      }),
    });

    const { logs: logsError } = await listLogsService.execute({
      page: 1,
      content: JSON.stringify({
        id: 's4s56s46d5a',
        name: 'Erro de Pool',
      }),
    });

    expect(logsError).toContain(logError);

    const { logs: logsProductError } = await listLogsService.execute({
      page: 1,
      content: JSON.stringify({
        id: 's4s56s46d5a',
        name: 'Loja Com Amor',
      }),
    });

    expect(logsProductError).toContain(logProductError);
  });
});

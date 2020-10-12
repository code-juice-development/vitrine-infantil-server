import FakeLogsRepository from '@modules/logs/repositories/fakes/FakeLogRepository';

import ListLogsService from '@modules/logs/services/ListLogsService';

let fakeLogsRepository: FakeLogsRepository;
let listLogsService: ListLogsService;

describe('List Log Service', () => {
  beforeEach(() => {
    fakeLogsRepository = new FakeLogsRepository();
    listLogsService = new ListLogsService(fakeLogsRepository);
  });

  it('should be able to list all Logs', async () => {
    const logError = await fakeLogsRepository.create({
      name: 'Erro ao processar a requisição',
      type: 'error',
      description: 'Erro ao processar o pool da requisição',
      content: JSON.stringify({
        id: 's4s56s46d5a',
        name: 'Pool Error',
      }),
    });

    const logProductError = await fakeLogsRepository.create({
      name: 'Erro ao importar o Produto',
      type: 'product',
      description: 'Erro ao processar a importação do produto',
      content: JSON.stringify({
        id: 's4s56s46d5a',
        name: 'Produto?',
      }),
    });

    const logs = await listLogsService.execute();

    expect(logs).toContain(logError);
    expect(logs).toContain(logProductError);
  });
});

import FakeLogsRepository from '@modules/logs/repositories/fakes/FakeLogRepository';

import CreateLogService from '@modules/logs/services/CreateLogService';

let fakeLogsRepository: FakeLogsRepository;
let createLogService: CreateLogService;

describe('Create Log Service', () => {
  beforeEach(() => {
    fakeLogsRepository = new FakeLogsRepository();
    createLogService = new CreateLogService(fakeLogsRepository);
  });

  it('should be able to create a new Error Log', async () => {
    const log = await createLogService.execute({
      name: 'Erro ao processar a requisição',
      type: 'error',
      description: 'Erro ao processar o pool da requisição',
      content: JSON.stringify({
        id: 's4s56s46d5a',
        name: 'Pool Error',
      }),
    });

    expect(log).toHaveProperty('id');
  });

  it('should be able to create a new Product Error Log', async () => {
    const log = await createLogService.execute({
      name: 'Erro ao processar a importação do Produto',
      type: 'error',
      description: 'Nenhum categoria relacionada encontrada ao produto',
      content: JSON.stringify({
        id: 's4s56s46d5a',
        name: 'Macacaquinho',
      }),
    });

    expect(log).toHaveProperty('id');
  });
});

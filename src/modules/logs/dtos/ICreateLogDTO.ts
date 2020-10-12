interface ICreateLogDTO {
  name: string;

  type: 'product' | 'error';

  description: string;

  content: string;
}

export default ICreateLogDTO;

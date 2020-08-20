import { DoneCallback, Job } from 'bull';

interface IJob {

  getName(): string;

  handle(job: Job, done: DoneCallback): Promise<void>;

};

export default IJob;

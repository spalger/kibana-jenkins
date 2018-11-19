import { schema } from '@jenkins/validate';
import fetch from 'node-fetch';

type PromOf<T extends Promise<any>> = T extends Promise<infer X> ? X : unknown;
export type JenkinsView = PromOf<ReturnType<JenkinsApi['getView']>>;
export type JenkinsJob = PromOf<ReturnType<JenkinsApi['getJob']>>;

const url = (strings: TemplateStringsArray, ...values: any[]) =>
  strings.reduce(
    (acc, str, i) => acc + str + encodeURIComponent(values[i - 1])
  );

const ViewSchema = schema.object({
  jobs: schema.arrayOf(
    schema.object({
      name: schema.string(),
    })
  ),
});

const JobSchema = schema.object({
  displayName: schema.string(),
  color: schema.string(),
  inQueue: schema.boolean(),
  builds: schema.arrayOf(
    schema.object({
      number: schema.number(),
    })
  ),
});

export class JenkinsApi {
  public async getView(id: string) {
    const response = await fetch(
      url`https://kibana-ci.elastic.co/view/${id}/api/json?tree=jobs[name]`
    );

    if (response.status !== 200) {
      throw new Error(`${response.status} response`);
    }

    const { jobs } = ViewSchema.validate(await response.json());

    return {
      jobs: jobs.map(job => ({
        id: job.name,
      })),
    };
  }

  public async getJob(id: string) {
    const response = await fetch(
      url`https://kibana-ci.elastic.co/job/${id}/api/json?tree=displayName,builds[number],color,inQueue`
    );

    const job = JobSchema.validate(await response.json());

    return {
      id,
      displayName: job.displayName,
      builds: job.builds.map(b => ({ number: b.number })),
      color: job.color,
      inQueue: job.inQueue,
    };
  }
}

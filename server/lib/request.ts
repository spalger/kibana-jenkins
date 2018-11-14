import { Request } from 'hapi';

export function getBasePath(request: Request) {
  return (request as any).getBasePath();
}

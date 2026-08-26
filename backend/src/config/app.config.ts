import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  version: '0.2.1',
}));
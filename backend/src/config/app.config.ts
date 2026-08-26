import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  version: '0.4.0-alpha.1',
}));

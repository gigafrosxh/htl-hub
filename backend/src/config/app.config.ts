import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  version: '0.3.0-alpha.5',
}));
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let jwtService: { verifyAsync: jest.Mock };

  const contextFor = (authorization?: string): ExecutionContext => ({
    switchToHttp: () => ({
      getRequest: () => ({ headers: { authorization } }),
    }),
  } as unknown as ExecutionContext);

  beforeEach(() => {
    jwtService = { verifyAsync: jest.fn().mockResolvedValue({ sub: 7 }) };
    guard = new JwtAuthGuard(jwtService as unknown as JwtService);
  });

  it('allows a valid bearer token', async () => {
    const context = contextFor('Bearer valid-token');

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(jwtService.verifyAsync).toHaveBeenCalledWith('valid-token');
  });

  it('rejects requests without a bearer token', async () => {
    await expect(guard.canActivate(contextFor())).rejects.toBeInstanceOf(UnauthorizedException);
    expect(jwtService.verifyAsync).not.toHaveBeenCalled();
  });

  it('rejects invalid tokens', async () => {
    jwtService.verifyAsync.mockRejectedValue(new Error('invalid token'));

    await expect(guard.canActivate(contextFor('Bearer invalid-token'))).rejects.toBeInstanceOf(UnauthorizedException);
  });
});

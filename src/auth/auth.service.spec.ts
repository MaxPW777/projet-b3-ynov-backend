import { AuthService } from './auth.service';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

describe('AuthService', () => {
  let service: AuthService;
  let cognito: CognitoIdentityServiceProvider;

  beforeEach(async () => {
    cognito = new CognitoIdentityServiceProvider();
    service = new AuthService();
    service['cognito'] = cognito;
    service['clientId'] = 'testClientId';
  });

  it('should register a new user', async () => {
    const body = {
      username: 'testuser',
      password: 'password', // NOSONAR
      email: 'test@example.com',
    };
    const signUpResponse = { UserSub: '12345' };
    jest.spyOn(cognito, 'signUp').mockReturnValue({
      promise: jest.fn().mockResolvedValue(signUpResponse),
    } as any);

    const result = await service.register(body);
    expect(result).toBe(signUpResponse);
  });

  it('should throw error if registration fails', async () => {
    const body = {
      username: 'testuser',
      password: 'password', // NOSONAR
      email: 'test@example.com',
    };
    jest.spyOn(cognito, 'signUp').mockReturnValue({
      promise: jest.fn().mockRejectedValue(new Error('Registration failed')),
    } as any);

    await expect(service.register(body)).rejects.toThrow('Registration failed');
  });

  it('should login a user', async () => {
    const loginResponse = {
      AuthenticationResult: {
        AccessToken: 'access',
        IdToken: 'id',
        RefreshToken: 'refresh',
      },
    };
    jest.spyOn(cognito, 'initiateAuth').mockReturnValue({
      promise: jest.fn().mockResolvedValue(loginResponse),
    } as any);

    const result = await service.login('testuser', 'password');
    expect(result).toBe(loginResponse.AuthenticationResult);
  });

  it('should throw error if login fails', async () => {
    jest.spyOn(cognito, 'initiateAuth').mockReturnValue({
      promise: jest.fn().mockRejectedValue(new Error('Login failed')),
    } as any);

    await expect(service.login('testuser', 'password')).rejects.toThrow(
      'Login failed',
    );
  });

  it('should confirm account', async () => {
    const confirmResponse = { UserConfirmed: true };
    jest.spyOn(cognito, 'confirmSignUp').mockReturnValue({
      promise: jest.fn().mockResolvedValue(confirmResponse),
    } as any);

    const result = await service.confirmAccount('testuser', '123456');
    expect(result).toBe(confirmResponse);
  });

  it('should throw error if account confirmation fails', async () => {
    jest.spyOn(cognito, 'confirmSignUp').mockReturnValue({
      promise: jest.fn().mockRejectedValue(new Error('Confirmation failed')),
    } as any);

    await expect(service.confirmAccount('testuser', '123456')).rejects.toThrow(
      'Confirmation failed',
    );
  });

  it('should refresh token', async () => {
    const refreshResponse = {
      AuthenticationResult: { AccessToken: 'newAccess', IdToken: 'newId' },
    };
    jest.spyOn(cognito, 'initiateAuth').mockReturnValue({
      promise: jest.fn().mockResolvedValue(refreshResponse),
    } as any);

    const result = await service.refreshToken('refreshToken');
    expect(result).toBe(refreshResponse.AuthenticationResult);
  });

  it('should throw error if token refresh fails', async () => {
    jest.spyOn(cognito, 'initiateAuth').mockReturnValue({
      promise: jest.fn().mockRejectedValue(new Error('Token refresh failed')),
    } as any);

    await expect(service.refreshToken('refreshToken')).rejects.toThrow(
      'Token refresh failed',
    );
  });
});

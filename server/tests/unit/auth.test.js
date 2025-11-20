const { generateToken } = require('../../src/utils/auth');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('Auth Utils', () => {
  it('should generate a token', () => {
    const user = { _id: '123' };
    process.env.JWT_SECRET = 'secret';
    jwt.sign.mockReturnValue('token');

    const token = generateToken(user);

    expect(token).toBe('token');
    expect(jwt.sign).toHaveBeenCalledWith({ id: '123' }, 'secret', {
      expiresIn: '30d',
    });
  });
});

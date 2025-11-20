
const { protect } = require('../../src/middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/User');

jest.mock('jsonwebtoken');
jest.mock('../../src/models/User');

describe('Auth Middleware', () => {
  describe('protect', () => {
    it('should call next if token is valid', async () => {
      const req = {
        headers: {
          authorization: 'Bearer validtoken',
        },
      };
      const res = {};
      const next = jest.fn();

      const decoded = { id: 'someUserId' };
      const user = { _id: 'someUserId', name: 'Test User' };

      jwt.verify.mockReturnValue(decoded);
      User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue(user) });

      await protect(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith('validtoken', process.env.JWT_SECRET);
      expect(User.findById).toHaveBeenCalledWith(decoded.id);
      expect(req.user).toEqual(user);
      expect(next).toHaveBeenCalled();
    });

    it('should send 401 if no token is provided', async () => {
      const req = {
        headers: {},
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      const next = jest.fn();

      await protect(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized, no token' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should send 401 if token is invalid', async () => {
      const req = {
        headers: {
          authorization: 'Bearer invalidtoken',
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      const next = jest.fn();

      jwt.verify.mockImplementation(() => {
        throw new Error('Test error');
      });

      await protect(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized, token failed' });
      expect(next).not.toHaveBeenCalled();
    });
  });
});

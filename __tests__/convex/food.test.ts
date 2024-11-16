import { mockAddedFoodsData1 } from '@/__tests__/mocks/_mockFoodData';
import { validateQuantity, upsert } from '@/convex/food';
import { INPUT_MAX_DECIMALS, INPUT_MAX_VALUE } from '@/lib/fatsecret/api';
import { getUserByClerkId } from '@/convex/_utils';
jest.mock('@/convex/_utils', () => ({
  getUserByClerkId: jest.fn(),
}));

const qtyError = `Quantity must not be greater than ${INPUT_MAX_VALUE} and have at most ${INPUT_MAX_DECIMALS} decimal places.`;

describe('validateQuantity', () => {
  it('should allow valid quantities', () => {
    expect(() => validateQuantity(50.12)).not.toThrow();
    expect(() => validateQuantity(50.1234)).not.toThrow();
    expect(() => validateQuantity(0)).not.toThrow();
    expect(() => validateQuantity(INPUT_MAX_VALUE)).not.toThrow();
    expect(() => validateQuantity(INPUT_MAX_VALUE - 0.0001)).not.toThrow();
  });

  it('should throw for quantities greater than the max value', () => {
    expect(() => validateQuantity(INPUT_MAX_VALUE + 0.0001)).toThrow(qtyError);
  });

  it('should throw for quantities with more than 2 decimals', () => {
    expect(() => validateQuantity(50.12345)).toThrow(qtyError);
  });
});

describe('upsert mutation', () => {
  const validFoodData = mockAddedFoodsData1;
  let authMock: any;
  let dbMock: any;
  let ctxMock: any;
  beforeEach(() => {
    authMock = {
      getUserIdentity: jest.fn(),
    };

    dbMock = {
      query: jest.fn(() => ({
        withIndex: jest.fn(() => ({
          unique: jest.fn(),
          filter: jest.fn(() => ({
            first: jest.fn(),
          })),
        })),
        filter: jest.fn().mockReturnThis(),
        first: jest.fn(),
        unique: jest.fn(),
      })),
      patch: jest.fn(),
      insert: jest.fn(),
    };

    ctxMock = {
      auth: authMock,
      db: dbMock,
    };
  });

  it('should throw error if user unauthorized', async () => {
    // Mock query to return no existing food
    dbMock.query().first.mockResolvedValue(null);

    await expect(() =>
      upsert(ctxMock, { food: validFoodData })
    ).rejects.toThrow('User not authenticated');
  });

  it('should throw error if user cannot be found within clerk', async () => {
    // Mock auth to return a user
    authMock.getUserIdentity.mockResolvedValue({
      subject: 'user_123',
    });

    // Mock query to return no existing food
    dbMock.query().first.mockResolvedValue(null);

    await expect(() =>
      upsert(ctxMock, { food: validFoodData })
    ).rejects.toThrow('User not found');
  });

  it('should allow valid food data', async () => {
    // Mock auth to return a user
    authMock.getUserIdentity.mockResolvedValue({
      subject: 'user_123',
    });

    // Mock getUserByClerkId to return a user
    (getUserByClerkId as jest.Mock).mockResolvedValue({
      _id: 'mockUserId123',
    });

    // Mock query to return no existing food
    dbMock.query().first.mockResolvedValue(null);

    await expect(
      upsert(ctxMock, { food: validFoodData })
    ).resolves.not.toThrow();
  });

  it('should reject invalid quantities', async () => {
    // Mock auth to return a user
    authMock.getUserIdentity.mockResolvedValue({
      subject: 'user_123',
    });

    // Mock getUserByClerkId to return a user
    (getUserByClerkId as jest.Mock).mockResolvedValue({
      _id: 'mockUserId123',
    });

    // Mock query to return no existing food
    dbMock.query().first.mockResolvedValue(null);

    const invalidFoodData = {
      ...validFoodData,
      servings: {
        serving: [
          {
            ...validFoodData.servings.serving[0],
            quantity: 101.12345, // Invalid quantity
          },
        ],
      },
    };

    await expect(() =>
      upsert(ctxMock, { food: invalidFoodData })
    ).rejects.toThrow(qtyError);
  });
});

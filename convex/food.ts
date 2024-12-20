import { mutation, query } from './_generated/server';
import {
  FatsecretFood,
  INPUT_MAX_DECIMALS,
  INPUT_MAX_VALUE,
} from '../lib/fatsecret/api';
import { getUserByClerkId } from './_utils';
import { getTodayDate } from '../lib/utils';
import { ConvexError } from 'convex/values';

export interface FatsecretFoodData extends FatsecretFood {
  date: string;
}

// Validation function for serving's quantity
export const validateQuantity = (quantity: number | undefined) => {
  if (quantity !== undefined) {
    const roundedValue = Number(quantity.toFixed(INPUT_MAX_DECIMALS));
    if (quantity > INPUT_MAX_VALUE || roundedValue !== quantity) {
      throw new Error(
        `Quantity must not be greater than ${INPUT_MAX_VALUE} and have at most ${INPUT_MAX_DECIMALS} decimal places.`
      );
    }
  }
};

export const upsert = mutation(
  async (ctx, { food, date }: { food: FatsecretFood; date?: string }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError('User not authenticated');

    // Get the current user from Convex
    const currentUser = await getUserByClerkId(ctx, user.subject);
    if (!currentUser) throw new ConvexError('User not found');

    // Validate each serving's quantity
    for (const serving of food.servings.serving) {
      try {
        validateQuantity(serving.quantity);
      } catch (err) {
        if (err instanceof Error) {
          throw new ConvexError(
            `Invalid quantity in serving - ${serving.serving_id}: ${err.message}`
          );
        } else {
          throw new ConvexError(
            `Invalid quantity in serving - ${serving.serving_id}: Unknown error`
          );
        }
      }
    }

    // Use today's date if not specified
    date ??= getTodayDate();

    // Check if a food item exists
    const existingFood = await ctx.db
      .query('foods')
      .withIndex('by_user_date', (q) =>
        q.eq('user_id', currentUser._id).eq('date', date)
      )
      .filter((q) => q.eq(q.field('food_id'), food.food_id))
      .first();

    if (existingFood) {
      // Update the existing food item
      await ctx.db.patch<'foods'>(existingFood._id, { ...food });
      return { action: 'updated' };
    } else {
      // Insert a new food item
      await ctx.db.insert('foods', {
        ...food,
        user_id: currentUser._id,
        date,
      });
      return { action: 'created' };
    }
  }
);

export const getAll = query(async (ctx, { date }: { date?: string }) => {
  const user = await ctx.auth.getUserIdentity();
  if (!user) throw new ConvexError('User not authenticated');

  // Get the current user from Convex
  const currentUser = await getUserByClerkId(ctx, user.subject);
  if (!currentUser) throw new ConvexError('User not found');

  // Use today's date if not specified
  date ??= getTodayDate();

  // Query using 'by_user_date' index for efficient filtering by user and date
  const foods: FatsecretFoodData[] = await ctx.db
    .query('foods')
    .withIndex('by_user_date', (q) =>
      q.eq('user_id', currentUser._id).eq('date', date)
    )
    .collect();

  return foods;
});

export const getAllForRange = query(
  async (
    ctx,
    { startDate, endDate }: { startDate: string; endDate: string }
  ) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError('User not authenticated');

    // Get the current user from Convex
    const currentUser = await getUserByClerkId(ctx, user.subject);
    if (!currentUser) throw new ConvexError('User not found');

    // Query using 'by_user_date' index, then filter by date range in memory
    const foods: FatsecretFoodData[] = await ctx.db
      .query('foods')
      .withIndex('by_user_date', (q) => q.eq('user_id', currentUser._id))
      .filter((q) =>
        q.and(
          q.gte(q.field('date'), startDate),
          q.lte(q.field('date'), endDate)
        )
      )
      .collect();

    return foods;
  }
);

export const remove = mutation(
  async (ctx, { food, date }: { food: FatsecretFood; date?: string }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError('User not authenticated');

    // Get the current user from Convex
    const currentUser = await getUserByClerkId(ctx, user.subject);
    if (!currentUser) throw new ConvexError('User not found');

    // Use today's date if not specified
    date ??= getTodayDate();

    // Use the 'by_user_date' index to check if the food item exists
    const existingFood = await ctx.db
      .query('foods')
      .withIndex('by_user_date', (q) =>
        q.eq('user_id', currentUser._id).eq('date', date)
      )
      .filter((q) => q.eq(q.field('food_id'), food.food_id))
      .first();

    if (!existingFood) throw new ConvexError('Food not found');

    // Delete the existing food item
    await ctx.db.delete(existingFood._id);
  }
);

import { mutation, query } from './_generated/server';
import { FatsecretFood } from '../lib/fatsecret/api';
import { getUserByClerkId } from './_utils';
import { getCurrentDate } from '../lib/utils';
import { ConvexError, v } from 'convex/values';

export const upsert = mutation(
  async (ctx, { food }: { food: FatsecretFood }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError('User not authenticated');
    // get current user from convex
    const currentUser = await getUserByClerkId(ctx, user.subject);
    if (!currentUser) throw new ConvexError('User not found');

    // Use today's date if not specified
    const date = getCurrentDate();

    // Check if a food item exists
    const existingFood = await ctx.db
      .query('foods')
      .filter((q) =>
        q.and(
          q.eq(q.field('food_id'), food.food_id),
          q.eq(q.field('date'), date),
          q.eq(q.field('user_id'), currentUser._id)
        )
      )
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

export const getAll = query(
  async (ctx, { date }: { date?: string }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError('User not authenticated');
    // get current user from convex
    const currentUser = await getUserByClerkId(ctx, user.subject);
    if (!currentUser) throw new ConvexError('User not found');

    const foodDate = date || getCurrentDate();

    const foods: FatsecretFood[] = await ctx.db
      .query('foods')
      .filter((q) =>
        q.and(
          q.eq(q.field('date'), foodDate),
          q.eq(q.field('user_id'), currentUser._id)
        )
      )
      .collect();

    return foods
  }
);
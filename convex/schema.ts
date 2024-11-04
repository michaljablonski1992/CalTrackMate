import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { FatsecretFoodTypeValues } from '../lib/fatsecret/api';

const FatsecretFoodSchema = v.object({
  food_id: v.string(),
  food_name: v.string(),
  food_type: v.union(...FatsecretFoodTypeValues.map(value => v.literal(value))),
  food_url: v.string(),
  brand_name: v.optional(v.string()),
  user_id: v.id('users'),
  date: v.string(), // Store date as a string in "YYYY-MM-DD" format
  servings: v.object({
    serving: v.array(
      v.object({
        serving_id: v.string(),
        serving_description: v.string(),
        serving_url: v.string(),
        metric_serving_amount: v.optional(v.string()),
        metric_serving_unit: v.optional(v.string()),
        number_of_units: v.string(),
        measurement_description: v.string(),
        quantity: v.optional(v.number()),
        calories: v.string(),
        carbohydrate: v.string(),
        protein: v.string(),
        fat: v.string(),
        saturated_fat: v.optional(v.string()),
        polyunsaturated_fat: v.optional(v.string()),
        monounsaturated_fat: v.optional(v.string()),
        trans_fat: v.optional(v.string()),
        cholesterol: v.optional(v.string()),
        sodium: v.optional(v.string()),
        potassium: v.optional(v.string()),
        fiber: v.optional(v.string()),
        sugar: v.optional(v.string()),
        added_sugars: v.optional(v.string()),
        vitamin_d: v.optional(v.string()),
        vitamin_a: v.optional(v.string()),
        vitamin_c: v.optional(v.string()),
        calcium: v.optional(v.string()),
        iron: v.optional(v.string()),
      })
    ),
  }),
});

export default defineSchema({
  users: defineTable({
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  })
    .index('by_email', ['email'])
    .index('by_clerkId', ['clerkId']),

  foods: defineTable(FatsecretFoodSchema)
    .index('by_user', ['user_id'])
    .index('by_user_date', ['user_id', 'date']),
});

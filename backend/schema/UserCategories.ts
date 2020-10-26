import { ResolverMap } from "../types";
import {
  MutationCreateUserCategoryArgs,
  UserAvaliableCategory,
  UserCategory,
} from "../codegen/types";
import { isAuth, throwNotAuthorized } from "../isAuth";

import { Category } from "../entity/Category";
import { User } from "../entity/User";
import { UserCategories } from "../entity/UserCategories";
import { UserWords } from "../entity/UserWords";
import { Word } from "../entity/Word";

export const UserCategoriesType = `
  type UserCategories{
    id: String!
    user: User!
    category:Category!
    created_at: String
    updated_at: String    
  }

  type UserCategory {
    id: String!
    translate: Translate!
    basic: Boolean!
    bought: Boolean!
    icon: String!
  }

  type UserAvaliableCategory{
    category: Category!
    words: [Word]!
    bought: Boolean!
    amount: String
  }

  type CreateCategoryResponse{
    ok: Boolean,
    category: String
  }

  extend type Mutation {
    createUserCategory(category:String!):CreateCategoryResponse
  }
  extend type Query{
    getUserCategories: [UserCategory],
    getUserAvaliableCategories:[UserAvaliableCategory]
  }
`;

export const userCategoriesResolvers: ResolverMap = {
  Mutation: {
    createUserCategory: async (
      _,
      { category }: MutationCreateUserCategoryArgs,
      ctx
    ) => {
      const user = isAuth(ctx);
      const findUser = await User.findOne(user);
      const findCategory = await Category.findOne(category);
      if (user) {
        if (findUser && findCategory) {
          await UserWords.delete({ user: findUser, category: findCategory });
          await UserCategories.create({
            user: findUser,
            category: findCategory,
          }).save();
          return {
            ok: true,
            category: findCategory.id,
          };
        }
      }
      return throwNotAuthorized();
    },
  },
  Query: {
    getUserCategories: async (_, _args, ctx) => {
      const user = isAuth(ctx);
      if (user) {
        const data: UserCategory[] = [];
        // find all categories
        const allCategories = await Category.find({
          relations: ["translate"],
        });
        // find categories which user bought
        const userBoughtCategories = await UserCategories.find({
          where: {
            user,
          },
          relations: ["category", "category.translate"],
        });
        // create map
        const boughtCategoryMap = {};
        userBoughtCategories.forEach((boughtCategory) => {
          boughtCategoryMap[boughtCategory.category.id] = true;
        });
        // merge data
        allCategories.forEach((category) => {
          const { id, basic, translate, icon } = category;
          data.push({
            id,
            basic,
            translate,
            bought: boughtCategoryMap[id] ? true : false,
            icon,
          });
        });
        return data;
      }
      return throwNotAuthorized();
    },
    getUserAvaliableCategories: async (_, _args, ctx) => {
      const user = isAuth(ctx);
      if (user) {
        const data: UserAvaliableCategory[] = [];

        // find categories which user bought
        const userBoughtCategories = await UserCategories.find({
          where: {
            user,
          },
          relations: ["category", "category.translate"],
        });
        for (let i = 0; i < userBoughtCategories.length; i++) {
          const { category } = userBoughtCategories[i];
          const words = await Word.find({
            where: {
              category,
            },
            relations: ["translate","category","category.translate"],
          });
          data.push({
            category,
            bought: true,
            words,
          });
        }

        const userWords = await UserWords.find({
          where: {
            user,
          },
          relations: [
            "category",
            "category.translate",
            "word.category",
            "word.category.translate",
            "word",
            "word.translate",
          ],
        });

        const userWordsCategories: {
          [key: string]: UserAvaliableCategory;
        } = {};
        for (let i = 0; i < userWords.length; i++) {
          const { category, word } = userWords[i];
          if (!userWordsCategories[category.id]) {
            userWordsCategories[category.id] = {
              category,
              words: [word],
              bought: false,
            };
          } else {
            userWordsCategories[category.id].words.push(word);
          }
        }

        Object.keys(userWordsCategories).forEach((categoryId) => {
          data.push({
            ...userWordsCategories[categoryId],
            amount: `${userWordsCategories[categoryId].words.length}`,
          });
        });
        return data;
      }
      return throwNotAuthorized();
    },
  },
};

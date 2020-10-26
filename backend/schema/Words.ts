import { ResolverMap } from "../types";
import {
  MutationAdminUpdateWordArgs,
  MutationCreateWordArgs,
  QueryGetAllWordsFromCategoryArgs,
} from "../codegen/types";
import { Category } from "../entity/Category";
import { Translate } from "../entity/Translate";
import { Word } from "../entity/Word";
import { isAuth, throwNotAuthorized } from "../isAuth";
import { User } from "../entity/User";
import { getConnection } from "typeorm";

export const WordType = `
  type Word{
    id: String!
    category: Category
    translate: Translate!
    created_at: String
    updated_at: String
    have:Boolean
  }

  input UpdateWordInput{
    id: String!
    translate: TranslateInput!
  }

  extend type Mutation{
    createWord(category: String!, translate: TranslateInput!):String
    adminUpdateWord(word: UpdateWordInput!): Boolean
  }
  extend type Query{
    getAllWordsFromCategory(category: String!):[Word]
  }
`;

export const wordResolvers: ResolverMap = {
  Mutation: {
    createWord: async (
      _,
      { category, translate }: MutationCreateWordArgs,
      ctx
    ) => {
      const userId = isAuth(ctx);
      const user = await User.findOne(userId);
      if (user && user.admin) {
        const findCategory = await Category.findOne(category);
        if (findCategory) {
          const newTranslate = await Translate.create(translate).save();
          if (newTranslate.id) {
            await Word.create({
              category: findCategory,
              translate: newTranslate,
            }).save();
            return true;
          }
        }
        return false;
      } else {
        return throwNotAuthorized();
      }
    },
    adminUpdateWord: async (_, { word }: MutationAdminUpdateWordArgs, ctx) => {
      const userId = isAuth(ctx);
      const user = await User.findOne(userId);
      if (user && user.admin) {
        const updatedTranslate = await getConnection()
          .createQueryBuilder()
          .update(Translate)
          .set(word.translate)
          .where("id = :id", {
            id: word.translate.id,
          })
          .returning("*")
          .execute();
        if (updatedTranslate.affected === 1) {
          return true;
        } else {
          return false;
        }
      } else {
        return throwNotAuthorized();
      }
    },
  },
  Query: {
    getAllWordsFromCategory: async (
      _,
      { category }: QueryGetAllWordsFromCategoryArgs
    ) => {
      const words = await Word.find({
        where: { category },
        relations: ["category", "translate", "category.translate"],
      });
      return words;
    },
  },
};

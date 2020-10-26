import { ResolverMap } from "../types";
import {
  MutationCreateUserWordsArgs,
  MutationRandomCategoryWordsArgs,
  QueryGetUserCategoryWordsArgs,
  QueryGetSelectedCategoriesWordsArgs,
} from "../codegen/types";
import { Category } from "../entity/Category";
import { User } from "../entity/User";
import { UserWords } from "../entity/UserWords";
import { Word } from "../entity/Word";
import { isAuth, throwNotAuthorized } from "../isAuth";
import { UserCategories } from "../entity/UserCategories";
import { returnArrayIds } from "../utils";

const RANDOM_WORDS_AMOUNT = 5;

export const UserWordsType = `
  type UserWord{
    id: String!
    user: User!
    category:Category!
    word:Word!
    created_at: String
    updated_at: String
  }

  extend type Mutation {
    createUserWords(user: String!, category:String!, word:String!):Boolean
    randomCategoryWords(category: String!):[Word]
  }

  extend type Query{
    getUserCategoryWords(category:String!):[UserWord]
    getSelectedCategoriesWords(selected:[String!]):[Word]
  }
`;

export const userWordsResolvers: ResolverMap = {
  Mutation: {
    createUserWords: async (
      _,
      { user, category, word }: MutationCreateUserWordsArgs
    ) => {
      const findUser = await User.findOne(user);
      const findCategory = await Category.findOne(category);
      const findWord = await Word.findOne(word);

      if (findUser && findCategory && findWord) {
        await UserWords.create({
          user: findUser,
          category: findCategory,
          word: findWord,
        }).save();
        return true;
      }
      return false;
    },
    randomCategoryWords: async (
      _,
      { category }: MutationRandomCategoryWordsArgs,
      ctx
    ) => {
      const user = isAuth(ctx);
      if (user) {
        const findUser = await User.findOne(user);
        const findCategoryWords = await Word.find({
          where: { category },
          relations: ["translate", "category"],
        });
        const findUserWords = await UserWords.find({
          where: { category },
          relations: ["word"],
        });
        const findCategory = await Category.findOne(category);

        const alreadyHave = returnArrayIds(findUserWords, "word");
        const random: Word[] = [];
        const toRoll: Word[] = [];

        findCategoryWords.forEach((word: Word) => {
          if (alreadyHave[word.id] === undefined) {
            toRoll.push(word);
          }
        });

        if (toRoll.length > RANDOM_WORDS_AMOUNT) {
          for (let i = 0; i < RANDOM_WORDS_AMOUNT; i++) {
            const index = Math.floor(Math.random() * toRoll.length);
            const newWord = toRoll[index];
            random.push(newWord);
            await UserWords.create({
              user: findUser,
              category: findCategory,
              word: newWord,
            }).save();
            toRoll.splice(index, 1);
          }
        } else {
          await UserWords.delete({ user: findUser, category: findCategory });
          await UserCategories.create({
            user: findUser,
            category: findCategory,
          }).save();
        }
        return random;
      } else {
        return throwNotAuthorized();
      }
    },
  },
  Query: {
    getUserCategoryWords: async (
      _,
      { category }: QueryGetUserCategoryWordsArgs,
      ctx
    ) => {
      const user = isAuth(ctx);
      if (user) {
        return await UserWords.find({
          where: { category, user },
          relations: ["word"],
        });
      } else {
        return throwNotAuthorized();
      }
    },
    getSelectedCategoriesWords: async (
      _,
      { selected }: QueryGetSelectedCategoriesWordsArgs,
      ctx
    ) => {
      const user = isAuth(ctx);
      if (user) {
        if (selected && selected.length > 0) {
          let words: Word[] = [];
          for (let i = 0; i < selected.length; i++) {
            const category = selected[i];
            const hasCategory = await UserCategories.find({
              where: {
                user,
                category,
              },
            });
            if (hasCategory.length > 0) {
              words = [
                ...words,
                ...(await Word.find({
                  where: {
                    category,
                  },
                  relations: ["translate", "category", "category.translate"],
                })),
              ];
            } else {
              const userWords = await UserWords.find({
                where: {
                  user,
                  category,
                },
                relations: ["word", "word.translate"],
              });
              userWords.forEach((userWord) => {
                words.push(userWord.word);
              });
            }
          }
          return words;
        } else {
          return [];
        }
      } else {
        return throwNotAuthorized();
      }
    },
  },
};

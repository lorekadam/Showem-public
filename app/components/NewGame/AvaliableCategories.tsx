import React, { useEffect } from "react";
import { lang } from "../../utils";
import {
  Category,
  useGetUserAvaliableCategoriesQuery,
} from "../../generated/graphql";
import Loader from "../Shared/Loader";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/RootStore";
import Text from "../Restyle/Text";
import AvaliableCategoryItem from "./AvaliableCategoryItem";
import {
  AvaliableCategories as AvaliableCategoriesType,
  BasicCategories,
} from "../../types";
const basicCategories: BasicCategories = require("../../../assets/categories/basic.json");

interface Props {}

export const AvaliableCategories = observer((props: Props) => {
  const rootStore = React.useContext(RootStoreContext);
  const { gameStore, userStore, categoryStore } = rootStore;
  const language = lang(userStore.language);
  const { loading, data } = useGetUserAvaliableCategoriesQuery({
    fetchPolicy: "network-only",
    skip: !userStore.internet || !userStore.user.logged,
  });

  const updateCategories = (item: Category, amount?: string) => {
    const { id } = item;
    const value = !gameStore.activeAvaliableCategories[id];
    gameStore.activeAvaliableCategories[id] = value;
    gameStore.numberOfWords =
      gameStore.numberOfWords +
      (amount ? parseInt(amount) : 50) * (value ? 1 : -1);
  };

  useEffect(() => {
    gameStore.avaliableCategories = {};
    gameStore.activeAvaliableCategories = {};
    gameStore.numberOfWords = 0;
    const categories: AvaliableCategoriesType = {};
    // add basic categories from file
    Object.keys(basicCategories.categories).forEach((categoryId: string) => {
      const { category, words } = basicCategories.categories[categoryId];
      categories[categoryId] = {
        category,
        words,
        amount: "50",
        bought: false,
      };
    });
    gameStore.avaliableCategories = {
      ...gameStore.avaliableCategories,
      ...categories,
    };
  }, []);

  useEffect(() => {
    if (!loading && data) {
      const categories: AvaliableCategoriesType = {};
      data.getUserAvaliableCategories.forEach((avaliable) => {
        categories[avaliable.category.id] = avaliable;
      });
      gameStore.avaliableCategories = {
        ...gameStore.avaliableCategories,
        ...categories,
      };
    }
  }, [loading, data]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text variant="modalHeader" marginBottom="m">
            {userStore.t("selectCategories")}
          </Text>

          {Object.keys(gameStore.avaliableCategories).map((id: string) => {
            const { category, amount } = gameStore.avaliableCategories[id];
            const checked = gameStore.activeAvaliableCategories[id];
            return (
              <AvaliableCategoryItem
                key={id}
                category={category}
                amount={amount}
                checked={checked}
                language={language}
                updateCategories={updateCategories}
              />
            );
          })}
        </>
      )}
    </>
  );
});

import { FlatList, Switch } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  UserCategory,
  useGetUserCategoriesQuery,
} from "../../generated/graphql";

import Category from "./Category";
import Grid from "../Restyle/Grid";
import { IndexKeyExtractor } from "../../utils";
import Loader from "../Shared/Loader";
import { RootStoreContext } from "../../stores/RootStore";
import ScreenPanelBox from "../../screens/ScreenPanelBox";
import ScreenPanelHeading from "../../screens/ScreenPanelHeading";
import Text from "../Restyle/Text";
import { observer } from "mobx-react-lite";
import { palette } from "../../styled/theme";

export const Categories = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const [showBought, setShowBought] = useState(false);
  const { userStore, categoryStore } = rootStore;
  const { loading, data } = useGetUserCategoriesQuery({
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data) {
      categoryStore.allCategories = data.getUserCategories;
    }
  }, [data]);

  const filter = () => {
    const filtered = categoryStore.allCategories.filter(
      (item) => item.bought === false
    );
    return filtered;
  };

  const toggleBoughtCategories = () => {
    setShowBought(!showBought);
  };

  const renderCategory = ({
    item,
    index,
  }: {
    item: UserCategory;
    index: number;
  }) => {
    return <Category item={item} index={index + 1} />;
  };

  return (
    <>
      <ScreenPanelHeading>
        <Grid variant="row" justifyContent="space-between">
          <Text variant="headingLight">{userStore.t("categories")}</Text>
          <Grid variant="row" alignItems="center">
            <Text variant="textSuperPrimary" marginRight="xs">
              {userStore.t("showBought")}
            </Text>
            <Switch
              value={showBought}
              onValueChange={toggleBoughtCategories}
              thumbColor={
                showBought
                  ? palette.blue_with_a_hint_of_purple
                  : palette.blueberry
              }
              trackColor={{
                false: palette.pastel_blue,
                true: palette.pastel_blue,
              }}
            />
          </Grid>
        </Grid>
      </ScreenPanelHeading>
      <ScreenPanelBox>
        {loading ? (
          <Loader fullscreen />
        ) : (
          <FlatList
            keyExtractor={IndexKeyExtractor}
            data={showBought ? categoryStore.allCategories.slice() : filter()}
            extraData={[userStore.language]}
            numColumns={2}
            renderItem={renderCategory}
          />
        )}
      </ScreenPanelBox>
    </>
  );
});

export default Categories;

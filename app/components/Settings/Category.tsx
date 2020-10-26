import React, { useContext } from "react";
import { color, useRestyle } from "@shopify/restyle";

import AnimalIcon from "../../../assets/img/drawable/animal.svg";
import BookIcon from "../../../assets/img/drawable/book.svg";
import Box from "../Restyle/Box";
import Button from "../Restyle/Button";
import { CATEGORY_DETAILS } from "../../screens";
import DefaultIcon from "../../../assets/img/drawable/default.svg";
import FoodIcon from "../../../assets/img/drawable/food.svg";
import Grid from "../Restyle/Grid";
import Icon from "../Restyle/Icon";
import MovieIcon from "../../../assets/img/drawable/movie.svg";
import { NavigationProps } from "../../types";
import ObjectIcon from "../../../assets/img/drawable/object.svg";
import OccupationIcon from "../../../assets/img/drawable/occupation.svg";
import PlaceIcon from "../../../assets/img/drawable/place.svg";
import { RootStoreContext } from "../../stores/RootStore";
import Text from "../Restyle/Text";
import { UserCategory } from "../../generated/graphql";
import { lang } from "../../utils";
import { observer } from "mobx-react-lite";
import { withNavigation } from "react-navigation";

interface Props extends NavigationProps {
  item: UserCategory;
  index: number;
}

export const getIcon = (icon: string, color?: string) => {
  switch (icon) {
    case "movie":
      return <MovieIcon fill={color} />;
    case "book":
      return <BookIcon fill={color} />;
    case "place":
      return <PlaceIcon fill={color} />;
    case "object":
      return <ObjectIcon fill={color} />;
    case "animal":
      return <AnimalIcon fill={color} />;
    case "occupation":
      return <OccupationIcon fill={color} />;
    case "food":
      return <FoodIcon fill={color} />;
    default:
      return <DefaultIcon fill={color} />;
  }
};

export const Category = observer((props: Props) => {
  const rootStore = useContext(RootStoreContext);
  const { userStore, categoryStore } = rootStore;
  const language = lang(userStore.language);
  const { item, index } = props;
  const { id, bought, basic, translate, icon } = item;
  const restyle = useRestyle([color], {
    color: bought ? "textLight" : "textDark",
  });
  const isRight = index % 2 === 0;
  const isFirstRow = index === 1 || index === 2;

  const goToCategoryDetails = () => {
    categoryStore.activeCategory = {
      category: id,
      bought: basic || bought,
      name: translate,
    };
    props.navigation.navigate(CATEGORY_DETAILS);
  };

  return (
    <Grid
      variant="element"
      marginTop={isFirstRow ? "l" : "0"}
      marginBottom={"m"}
      marginLeft={isRight ? "s" : "l"}
      marginRight={isRight ? "l" : "s"}
    >
      {item.id && (
        <Button onPress={goToCategoryDetails} variant="transparentWrapper">
          <Box
            borderRadius="panel"
            padding="l"
            flexDirection="column"
            backgroundColor={
              bought ? "primaryButtonBackground" : "lightPrimary"
            }
            height={150}
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            {basic && !bought && (
              <Box position="absolute" top={6} right={20}>
                <Text variant="textErrorSmall">{userStore.t("free")}</Text>
              </Box>
            )}
            {bought && (
              <Box
                position="absolute"
                top={12}
                right={12}
                backgroundColor="white"
                borderRadius="l"
                padding="s"
              >
                <Icon icon="check" variant="boughtCheck" />
              </Box>
            )}
            <Box
              marginBottom="xs"
              justifyContent="center"
              alignItems="center"
              height={40}
            >
              {getIcon(icon, restyle.style[0].color)}
            </Box>
            <Text variant={bought ? "textLight" : "textDark"}>
              {translate[language]}
            </Text>
          </Box>
        </Button>
      )}
    </Grid>
  );
});

export default withNavigation(Category);

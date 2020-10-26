import React from "react";
import { Category } from "../../generated/graphql";
import Button from "../Restyle/Button";
import Checkbox from "../Restyle/Checkbox";
import Grid from "../Restyle/Grid";
import Text from "../Restyle/Text";

export interface AvaliableCategoryItemProps {
  updateCategories(category: Category, amount?: string): void;
  category: Category;
  language: string;
  checked: boolean;
  amount?: string;
}
export const AvaliableCategoryItem = ({
  category,
  language,
  checked,
  amount,
  updateCategories,
}: AvaliableCategoryItemProps) => {
  return (
    <Button
      variant="transparentWrapper"
      onPress={() => updateCategories(category, amount)}
      marginBottom="m"
    >
      <Grid variant="row" alignItems="center">
        <Checkbox variant={checked ? "primary" : "inactive"} active={checked} />
        <Text color={checked ? "textDark" : "inputBorder"}>
          {`${category.translate[language]} ${amount ? `(${amount})` : `(50)`}`}
        </Text>
      </Grid>
    </Button>
  );
};

export default AvaliableCategoryItem;

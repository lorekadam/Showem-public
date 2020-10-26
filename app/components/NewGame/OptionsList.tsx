import React from "react";
import Option from "./Option";
import { SingleOption } from "../../types";
import { observer } from "mobx-react-lite";

interface Props {
  data: SingleOption[];
  remove?: (key: number) => void;
}

export const OptionsList = observer((props: Props) => {
  const { data, remove } = props;
  return (
    <>
      {data.map((item, index) => (
        <Option
          item={item}
          key={`${item}${index}`}
          index={index}
          remove={remove && remove}
        />
      ))}
    </>
  );
});

export default OptionsList;

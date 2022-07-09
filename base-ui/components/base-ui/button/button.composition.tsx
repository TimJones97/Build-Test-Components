import React from "react";
import { Button } from "./button";
import {ShoppingBagIcon} from '@heroicons/react/outline'

export const BasicButton = () => {
  return <Button>hello world!</Button>;
};

export const LeftIconButton = () => {
  return <Button leftIcon={<ShoppingBagIcon className="w-4"/>}>hello world!</Button>;
}; 

export const ExtraLargeButton = () => {
  return <Button size="xlarge">xLarge</Button>;
};

export const LargeButton = () => {
  return <Button size="large">Large</Button>;
};

export const MediumButton = () => {
  return <Button size="medium">Medium</Button>;
};
export const SmallButton = () => {
  return <Button size="small">Small</Button>;
};
export const Loading = () => {
  return <Button loading>Loading</Button>;
};
export const Secondary = () => {
  return <Button variant="secondary" >Loading</Button>;
};

export const Text = () => {
  return <Button variant="text" >Loading</Button>;
};

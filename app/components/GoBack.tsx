"use client";
import { Button, Text } from "@radix-ui/themes";
import React from "react";
import { RiArrowGoBackLine } from "react-icons/ri";

const GoBack = () => {
  return (
    <Text className="cursor-pointer">
      <Button
        onClick={() => {
          window.history.back();
        }}
      >
        <RiArrowGoBackLine />
      </Button>
    </Text>
  );
};

export default GoBack;

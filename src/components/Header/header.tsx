"use client";

import { Navbar, Button, Link, Text, Card, Radio } from "@nextui-org/react";

import React from "react";
import SignOut from "../Button/button.components";

export default function Header() {
  const [variant, setVariant] = React.useState("static");

  const variants = ["static", "floating", "sticky"];

  return (
    <>
      <Navbar isBordered variant="static">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            Todo-App
          </Text>
        </Navbar.Brand>

        <Navbar.Content>
          <Navbar.Item>
            <SignOut />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </>
  );
}

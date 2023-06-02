"use client";

import { Navbar, Text, Avatar } from "@nextui-org/react";

import React from "react";
import SignOut from "../Button/button-components";
import { useSession } from "next-auth/react";

export default function Header() {
  const session = useSession();

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
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              size="md"
            />
          </Navbar.Item>
          <Navbar.Item>
            <SignOut />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </>
  );
}

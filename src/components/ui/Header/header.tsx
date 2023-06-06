"use client"

import { Navbar, Text, Avatar, Dropdown } from "@nextui-org/react"

import React, { Suspense } from "react"
import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Header() {
  const session = useSession()

  const image = session.data?.user?.image

  return (
    <>
      <Navbar variant="static">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            TODO APP
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Item>
            <Dropdown>
              <Dropdown.Trigger>
                <Avatar bordered as="button" src={image as string} size="lg" />
              </Dropdown.Trigger>
              <Dropdown.Menu aria-label="Static Actions">
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {session.data?.user?.name}
                  </Text>
                  <Text size="$xs" color="inherit" css={{ d: "flex" }}>
                    {session.data?.user?.email}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="stats" withDivider>
                  Stats
                </Dropdown.Item>
                <Dropdown.Item key="settings">Settings</Dropdown.Item>
                <Dropdown.Item
                  withDivider
                  key="logout"
                  color="error"
                  command="⌘L"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <path
                        opacity={0.4}
                        d="M7.37 22h9.25a4.87 4.87 0 0 0 4.87-4.87V8.37a4.87 4.87 0 0 0-4.87-4.87H7.37A4.87 4.87 0 0 0 2.5 8.37v8.75c0 2.7 2.18 4.88 4.87 4.88Z"
                        fill="var(--nextui-colors-secondary)"
                      />
                      <path
                        d="M8.29 6.29c-.42 0-.75-.34-.75-.75V2.75a.749.749 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76ZM15.71 6.29c-.42 0-.75-.34-.75-.75V2.75a.749.749 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76ZM12 14.75h-1.69V13c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.75H7c-.41 0-.75.34-.75.75s.34.75.75.75h1.81V18c0 .41.34.75.75.75s.75-.34.75-.75v-1.75H12c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Z"
                        fill="var(--nextui-colors-secondary)"
                      />
                    </svg>
                  }
                >
                  <a
                    href=""
                    onClick={async () => {
                      await signOut()
                      redirect("/api/auth/signin")
                    }}
                  >
                    Log out
                  </a>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </>
  )
}

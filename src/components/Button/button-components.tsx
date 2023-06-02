"use client";

import { signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";

export default function SignOut() {
  return (
    <Button auto flat color="success" onClick={async () => await signOut()}>
      Sign out
    </Button>
  );
}

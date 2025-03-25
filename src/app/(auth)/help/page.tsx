import { Typography } from "@/storybooks/components/atoms";
import React from "react";

const page = () => {
  return (
    <div>
      <Typography intent="title">How does sign in works? </Typography>
      During the authentication process, assemble asks users for an email
      address, not a password. Assemble then generates a secure six digit OTP
      and sends it via email. The user then enters the OTP into the assemble
      interface, and the authentication process is complete.
    </div>
  );
};

export default page;

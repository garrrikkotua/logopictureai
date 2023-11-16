import React from "react";
import { APP_NAME } from "@/lib/constants";

interface EmailTemplateProps {
  email: string;
}

export const UpscaleEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
}) => (
  <div>
    <h1>Hi, {email}!</h1>
    <p>
      Your upscale request has been fulfilled. You can find the result in the
      attached file.
    </p>
    <hr />
    <p>
      All the best,
      <br />
      <strong>Igor</strong>
    </p>
    <hr />
    <p>
      <small>
        This email was sent by{" "}
        <strong>
          <a href={process.env.NEXT_PUBLIC_SITE_URL}>{APP_NAME}</a>
        </strong>
      </small>
    </p>
  </div>
);

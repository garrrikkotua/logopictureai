import React from "react";
import { APP_NAME } from "@/lib/constants";

interface EmailTemplateProps {
  email: string;
  prompt: string;
  numberOfPictures: number;
}

export const ResultEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  prompt,
  numberOfPictures,
}) => (
  <div>
    <h1>Hi, {email}!</h1>
    <p>Please find your pictures attached to this email.</p>
    <hr />
    <h2>Generation details</h2>
    <p>
      Prompt: <strong>{prompt}</strong>
    </p>
    <p>
      Number of pictures: <strong>{numberOfPictures}</strong>
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

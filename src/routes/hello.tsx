import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HelloData } from "../domain/HelloRepository";

export const Route = createFileRoute("/hello")({
  loader: async ({ context }) => {
    const data: HelloData = await context.helloRepository.getHelloData();
    return data;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { message, timestamp } = Route.useLoaderData();

  return (
    <div>
      <h2>Hello Page</h2>
      <p>{message}</p>
      <p>Timestamp: {new Date(timestamp).toLocaleString()}</p>
    </div>
  );
}

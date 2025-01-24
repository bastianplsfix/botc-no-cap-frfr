import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { FakeHelloRepository } from "./domain/HelloRepository";

const helloRepository = new FakeHelloRepository();

// Set up a Router instance with typed context
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    helloRepository,
  },
});

// Register things for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}

// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Import both repositories
import {
  FakeHelloRepository,
  RealHelloRepository,
} from "./domain/HelloRepository";

// Decide based on a Vite environment variable or something else
const isFake = import.meta.env.VITE_FAKE === "true";

// Pick the repository
const helloRepository = isFake
  ? new FakeHelloRepository()
  : new RealHelloRepository();

// Set up a Router instance with typed context
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    helloRepository,
  },
});

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

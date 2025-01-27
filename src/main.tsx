import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider, createRouter} from "@tanstack/react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {routeTree} from "./routeTree.gen";
import {
  LoanApplicationRepositoryFake,
  LoanApplicationRepositoryReal,
} from "./domain/LoanApplicationRepository";
import {FakeHelloRepository, RealHelloRepository} from "./domain/HelloRepository";

const isFake = import.meta.env.VITE_FAKE === "true";
const loanApplicationRepository = isFake
  ? new LoanApplicationRepositoryFake()
  : new LoanApplicationRepositoryReal();

const helloRepository = isFake ? new FakeHelloRepository() : new RealHelloRepository()

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    loanApplicationRepository,
    helloRepository,
    queryClient,
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
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>,
  );
}

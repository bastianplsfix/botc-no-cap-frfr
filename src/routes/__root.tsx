import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import {LoanApplicationRepository} from "../domain/LoanApplicationRepository";
import {QueryClient} from "@tanstack/react-query";
import {HelloRepository} from "../domain/HelloRepository";

interface RouterContext {
  loanApplicationRepository: LoanApplicationRepository;
  helloRepository: HelloRepository;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{exact: true}}
        >
          Home
        </Link>{" "}
        <Link
          to="/loan"
          activeProps={{
            className: "font-bold",
          }}
        >
          Loan
        </Link>
        <Link
          to="/hello"
          activeProps={{
            className: "font-bold",
          }}
        >
          Hello
        </Link>
      </div>
      <hr/>
      <Outlet/>
      <TanStackRouterDevtools position="bottom-right"/>
    </>
  );
}

import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HelloData } from "../domain/HelloRepository";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/hello")({
  loader: async ({ context }) => {
    const data: HelloData = await context.helloRepository.getHelloData();
    return data;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { message, timestamp } = Route.useLoaderData();
  const { helloRepository } = Route.useRouteContext();
  const queryClient = useQueryClient();

  const [newValue, setNewValue] = React.useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hello"],
    queryFn: () => helloRepository.getHelloData(),
  });

  const mutation = useMutation({
    mutationFn: (value: HelloData) => helloRepository.setHello(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hello"] });
    },
  });

  if (isLoading) return <div>Loading hello...</div>;
  if (isError && error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Hello Page</h2>
      <p>{message}</p>
      <p>Timestamp: {new Date(timestamp).toLocaleString()}</p>

      <h2>Current Hello: {data?.message}</h2>
      <input
        type="text"
        placeholder="New Hello value"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
      />
      <button
        onClick={() => {
          mutation.mutate({
            message: newValue,
            timestamp: Date.now(),
          });
          setNewValue("");
        }}
      >
        Update Hello
      </button>
    </div>
  );
}

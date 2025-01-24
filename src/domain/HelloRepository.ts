export interface HelloData {
  message: string;
  timestamp: number;
}

export interface HelloRepository {
  getHelloData(): Promise<HelloData>;
}

/**
 * A simple in-memory (or "fake") implementation.
 * Later you could add a "RealHelloRepository" that fetches from an API.
 */
export class FakeHelloRepository implements HelloRepository {
  async getHelloData(): Promise<HelloData> {
    return {
      message: "Hello from the repository!",
      timestamp: Date.now(),
    };
  }
}

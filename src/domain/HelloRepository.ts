export interface HelloData {
  message: string;
  timestamp: number;
}

export interface HelloRepository {
  getHelloData(): Promise<HelloData>;
}

export class FakeHelloRepository implements HelloRepository {
  async getHelloData(): Promise<HelloData> {
    return {
      message: "Hello from the FAKE repository!",
      timestamp: Date.now(),
    };
  }
}

export class RealHelloRepository implements HelloRepository {
  async getHelloData(): Promise<HelloData> {
    const response = await fetch("https://api.example.com/hello");
    if (!response.ok) {
      throw new Error("Failed to fetch hello data");
    }
    return await response.json(); // should match { message, timestamp }
  }
}

export interface HelloData {
  message: string;
  timestamp: number;
}

export interface HelloRepository {
  getHelloData(): Promise<HelloData>;
  setHello(data: HelloData): Promise<void>;
}

export class FakeHelloRepository implements HelloRepository {
  private helloData: HelloData = {
    message: "Hello from the FAKE repository!",
    timestamp: Date.now(),
  };

  async getHelloData(): Promise<HelloData> {
    return this.helloData;
  }

  async setHello(data: HelloData): Promise<void> {
    this.helloData = data;
  }
}

export class RealHelloRepository implements HelloRepository {
  private apiUrl = "https://api.example.com/hello";

  async getHelloData(): Promise<HelloData> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch hello data");
    }
    return await response.json();
  }

  async setHello(data: HelloData): Promise<void> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to set hello data");
    }
  }
}

export type MoneySource = "PHP" | "Wages" | "Inheritance" | "Savings" | "Other";

export interface LoanApplicationData {
    applicantName: string;
    loanAmount: number;
    carModel: string;
    applicationDate: number;
    status: "Pending" | "Approved" | "Rejected";
    moneySource: MoneySource
}

export interface LoanApplicationRepository {
    getLoanApplicationData(): Promise<LoanApplicationData>;

    setLoanApplication(data: LoanApplicationData): Promise<void>;
}

export class LoanApplicationRepositoryFake implements LoanApplicationRepository {
    private loanApplicationData: LoanApplicationData;

    constructor(initialData?: LoanApplicationData) {
        this.loanApplicationData = initialData || {
            applicantName: "Ola Nordmann",
            loanAmount: 200000,
            carModel: "Lambo",
            applicationDate: Date.now(),
            status: "Approved",
            moneySource: "PHP",
        };
    }

    async getLoanApplicationData(): Promise<LoanApplicationData> {
        return this.loanApplicationData;
    }

    async setLoanApplication(data: LoanApplicationData): Promise<void> {
        this.loanApplicationData = data;
    }
}


export class LoanApplicationRepositoryReal implements LoanApplicationRepository {
    private apiUrl = "https://api.example.com/LoanApplication";

    async getLoanApplicationData(): Promise<LoanApplicationData> {
        const response = await fetch(this.apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch LoanApplication data");
        }
        return await response.json();
    }

    async setLoanApplication(data: LoanApplicationData): Promise<void> {
        const response = await fetch(this.apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to set LoanApplication data");
        }
    }
}

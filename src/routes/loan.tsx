import React from 'react'
import {createFileRoute} from '@tanstack/react-router'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {
    LoanApplicationData,
    MoneySource,
} from '../domain/LoanApplicationRepository'

export const Route = createFileRoute('/loan')({
    component: RouteComponent,
})

function RouteComponent() {
    const {loanApplicationRepository} = Route.useRouteContext()
    const queryClient = useQueryClient()

    const [formValues, setFormValues] = React.useState({
        applicantName: '',
        loanAmount: 0,
        carModel: '',
        moneySource: 'Wages',
    })

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['loanApplication'],
        queryFn: () => loanApplicationRepository.getLoanApplicationData(),
    })

    const mutation = useMutation({
        mutationFn: (value: LoanApplicationData) =>
            loanApplicationRepository.setLoanApplication(value),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['loanApplication']})
        },
    })

    if (isLoading) return <div>Loading loan application...</div>

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <h2>Loan Application Page</h2>
            <p>Applicant: {data?.applicantName}</p>
            <p>Loan Amount: {data?.loanAmount}</p>
            <p>Car Model: {data?.carModel}</p>
            <p>
                Application Date:{' '}
                {data?.applicationDate
                    ? new Date(Number(data.applicationDate)).toLocaleString()
                    : 'N/A'}
            </p>

            <p>Status: {data?.status}</p>
            <p>Money Source: {data?.moneySource}</p>

            <h3>Update Loan Application</h3>
            <input
                type="text"
                placeholder="Applicant Name"
                value={formValues.applicantName}
                onChange={(e) =>
                    setFormValues({...formValues, applicantName: e.target.value})
                }
            />
            <input
                type="number"
                placeholder="Loan Amount"
                value={formValues.loanAmount}
                onChange={(e) =>
                    setFormValues({...formValues, loanAmount: Number(e.target.value)})
                }
            />
            <input
                type="text"
                placeholder="Car Model"
                value={formValues.carModel}
                onChange={(e) =>
                    setFormValues({...formValues, carModel: e.target.value})
                }
            />
            <select
                value={formValues.moneySource}
                onChange={(e) =>
                    setFormValues({...formValues, moneySource: e.target.value})
                }
            >
                <option value="PHP">PHP</option>
                <option value="Wages">Wages</option>
                <option value="Inheritance">Inheritance</option>
                <option value="Savings">Savings</option>
                <option value="Other">Other</option>
            </select>
            <button
                onClick={() => {
                    mutation.mutate({
                        ...formValues,
                        moneySource: formValues.moneySource as MoneySource,
                        applicationDate: Date.now(),
                        status: 'Pending',
                    })
                    setFormValues({
                        applicantName: '',
                        loanAmount: 0,
                        carModel: '',
                        moneySource: 'Wages',
                    })
                }}
            >
                Update Application
            </button>
        </div>
    )
}

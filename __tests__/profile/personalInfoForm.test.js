import * as React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import PersonalInfoForm from '../../components/profile/PersonalInfoForm'
import { QueryClient, QueryClientProvider } from 'react-query'
import userEvent from '@testing-library/user-event'
import selectEvent from 'react-select-event'

const mockSaveChanges = jest.fn();
const queryClient = new QueryClient();

describe("Personal Info Form", () => {
    beforeEach(() => {
        render(
            <QueryClientProvider client={queryClient}>
                <PersonalInfoForm data={{User: {}}} saveChanges={mockSaveChanges} />
            </QueryClientProvider>
        )
    });

    // afterEach(() => {
    //     jest.clearAllMocks()
    // })
    
    test('render inputs & buttons correctly', () => {
        screen.getByRole("heading", { name: /personal information/i })
        screen.getByLabelText(/photo*/i)
        screen.getByLabelText(/first Name \/ given name \*/i)
        screen.getByLabelText(/last \/ family \/ surname \*/i)
        screen.getByLabelText(/suffix/i)
        screen.getByLabelText(/preferred name \(nickname\)/i)
        screen.getByLabelText(/preferred gender pronouns/i)
        screen.getByLabelText(/headline/i)
        screen.getByLabelText(/linkedin profile/i)
        screen.getByText(/save changes/i)
    })
    
    test('saving form without firstName/lastName should display error', async () => {
        const firstName = screen.getByLabelText(/first Name \/ given name \*/i)
        const lastName = screen.getByLabelText(/last \/ family \/ surname \*/i)
        const saveButton = screen.getByText(/save changes/i)
        const error = screen.findAllByRole("alert")

        expect(firstName).toHaveValue("")
        expect(lastName).toHaveValue("")
        userEvent.click(saveButton)

        // expect(mockSaveChanges).not.toBeCalled()
        await waitFor(() => expect(mockSaveChanges).not.toBeCalled())
        expect(await error).toHaveLength(2)
    })

    test('saving with just firstName/lastName should be allowed', async () => {

        const firstName = screen.getByLabelText(/first Name \/ given name \*/i)
        const lastName = screen.getByLabelText(/last \/ family \/ surname \*/i)
        const saveButton = screen.getByText(/save changes/i)
        const error = screen.queryAllByRole("alert")

        userEvent.type(firstName, "John")
        userEvent.type(lastName, "Doe")
        expect(firstName).toHaveValue("John")
        expect(lastName).toHaveValue("Doe")
        userEvent.click(saveButton)
        await waitFor(() => expect(mockSaveChanges).toHaveBeenCalledTimes(1))
        expect(error).toHaveLength(0)
    })

    test('render an extra preferred pronouns input if user select others in gender pronouns select', async () => {
        const gender = screen.getByLabelText(/preferred gender pronouns/i)
        await selectEvent.select(gender, ["let me specify"])
        expect(screen.getByTestId('personal-info')).toHaveFormValues({
            gender: "others"
        })
        expect(screen.getByLabelText(/Specify your preferred pronouns/i)).toBeInTheDocument()
    })
})

describe("Personal Info Form Value", () => { 

    test('form should contain default value if the api return existing data', () => {
        const mockUser = {
            firstName: "First",
            lastName: "Last",
            gender: "others"
        }
        render(
            <QueryClientProvider client={queryClient}>
                <PersonalInfoForm data={{User: mockUser}} saveChanges={mockSaveChanges} />
            </QueryClientProvider>
        )

        expect(screen.getByTestId('personal-info')).toHaveFormValues({
            firstName: mockUser.firstName,
            lastName: mockUser.lastName,
            suffix: "",
            preferredName: "",
            gender: mockUser.gender,
            otherPronouns: "",
            headline: "",
            linkedinUrl: "",
        })
    })
})

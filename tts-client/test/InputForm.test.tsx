import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { InputForm } from '../src/components/InputForm/InputForm';

describe('InputForm.tsx', () => {
    const setUtterancce = (str: string) => {
        return str
    }

    test('should render empty InputForm', () => {
        render(<InputForm setUtterance={setUtterancce} />)

        const textarea = screen.getByTestId('inputForm-textarea')
        expect(textarea instanceof (HTMLElement)).toBeTruthy()
        expect(screen.getByTestId('inputForm-textarea').children.length).toEqual(0)
    });
})
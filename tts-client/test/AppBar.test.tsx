import { render, screen } from '@testing-library/react'
import { AppBar } from '../src/components/AppBar/AppBar'
import '@testing-library/jest-dom'

describe('App.tsx', () => {
    test('should render AppBar', () => {
        const { container } = render(<AppBar />)

        expect(screen.getByText('Final Project | Text-to-Speech')).toBeInTheDocument()
        expect(container.querySelector('.app-bar')).toBeInTheDocument()
        expect(container.querySelector('.app-title')).toBeInTheDocument()
        expect(container.querySelector('.gradient-bar')).toBeInTheDocument()
    });
})
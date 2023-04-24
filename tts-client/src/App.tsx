import { QueryClient, QueryClientProvider } from 'react-query';
import { AppBar } from './components/AppBar/AppBar';
import { TTSPage } from './components/TTSPage/TTSPage';

export function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <AppBar />
            <TTSPage />
        </QueryClientProvider>
    );
}

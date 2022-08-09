import React, { PropsWithChildren } from 'react';
import { isProd } from '../../environment';

export interface ErrorBoundaryProps {}
interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
    constructor(props:ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch() {}

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            const details = isProd ? "" : <>
                    <div>{this.state.error?.message}</div>
                    <div>{this.state.error?.stack}</div>
            </>
            return (
                <>
                    <h1>Something went wrong.</h1>
                    {details}
                </>
            );
        }

        return this.props.children;
    }
}

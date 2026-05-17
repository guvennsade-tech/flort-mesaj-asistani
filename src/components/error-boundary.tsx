"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb] p-5">
            <div className="text-center max-w-sm">
              <div className="mb-4 flex h-16 w-16 items-center justify-center mx-auto rounded-2xl bg-gradient-to-br from-pink-100 to-violet-100 text-3xl">
                ⚡
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Bir şeyler ters gitti
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Uygulama beklenmedik bir hatayla karşılaştı. Sayfayı yenilemeyi
                dene.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 hover:scale-[1.01] transition-transform"
                type="button"
              >
                Sayfayı Yenile
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

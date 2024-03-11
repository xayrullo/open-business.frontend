import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div>
          <div
            className="relative z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
            <div className="fixed inset-0 flex">
              <div className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <Sidebar />
              </div>
            </div>
          </div>
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <Sidebar />
          </div>
          <div className="lg:pl-72 p-4 h-full">
            <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
              <div className="flex h-16 items-center gap-x-4 border-b border-gray-300 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
                <div
                  className="h-6 w-px bg-gray-200 lg:hidden"
                  aria-hidden="true"
                />
                <div className="flex justify-between items-center flex-1 gap-x-4 self-stretch lg:gap-x-6">
                  <div>Title Page</div>
                  <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                        />
                      </svg>
                    </button>
                    <div
                      className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <button
                        type="button"
                        className="-m-1.5 flex items-center p-1.5"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full bg-gray-50"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                        <span className="hidden lg:flex lg:items-center">
                          <span
                            className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                            aria-hidden="true"
                          >
                            Tom Cook
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <main className="py-10">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

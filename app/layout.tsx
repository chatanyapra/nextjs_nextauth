// export const dynamic = 'force-dynamic'

export const metadata = {
    title: "Chatanya",
    description:" Chatanya is a chat application",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
    },
}
export default function RootLayout({children}:{children: React.ReactNode}){
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
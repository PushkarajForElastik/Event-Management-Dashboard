export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 ">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <img src="/logo-wide.png" className="h-12" alt="Logo" />

                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© Elastik Teams - <a className="hover:underline">Elavate 2025</a></span>
                </div>
            </div>
        </footer>
    )
}
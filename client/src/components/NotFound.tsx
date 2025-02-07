import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-2">Oops! Page not found.</p>
            <p className="text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
}

export default NotFound;
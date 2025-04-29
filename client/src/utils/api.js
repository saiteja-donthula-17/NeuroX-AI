
// export const fetchWithAuth = async (url, options) => {
//     try {
//         const response = await fetch(url, options);

//         if (response.status === 401) {
//             console.warn("Unauthorized. Redirecting to sign-in...");

//             // Clear local storage, session storage, and cookies
//             localStorage.clear();
//             sessionStorage.clear();
//             document.cookie = ""; // Clear cookies

//             // Redirect to sign-in
//             window.location.href = "/sign-in";
//         }

//         return response;
//     } catch (error) {
//         console.error("Network error:", error);
//         throw error; // Rethrow error to be handled by the caller
//     }
// };



export const fetchWithAuth = async (url, options) => {
    try {
        const response = await fetch(url, options);

        if (response.status === 401) {
            console.warn("Unauthorized. Redirecting to sign-in...");

            // Only clear session data when explicitly required
            // Optional: you can log out the user by making a logout request to the server

            // Redirect to sign-in page
            // Ensure that the redirect to "/sign-in" does not cause an infinite loop
            // by making sure you handle session state correctly when the user logs in

            window.location.href = "/sign-in"; // This will redirect the user to the sign-in page
        }

        return response;
    } catch (error) {
        console.error("Network error:", error);
        throw error; // Rethrow error to be handled by the caller
    }
};

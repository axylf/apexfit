// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { logout } from "../utils/auth";
// import { useRouter } from "next/navigation";
// import { auth } from "../firebase";
// import { google } from "googleapis";

// export default function Calendar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [gAuthToken, setGAuthToken] = useState(null); // Store Google auth token
//   const router = useRouter();

//   // Track authentication state with Firebase
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setIsLoggedIn(true);
//         setUser(user.displayName || "User");
//       } else {
//         setIsLoggedIn(false);
//         setUser(null);
//         setGAuthToken(null); // Reset Google auth token when logged out
//       }
//     });
//     return () => unsubscribe(); // Cleanup on unmount
//   }, []);

//   // Handle Google Sign-In and storing token
//   const handleGoogleSignIn = async () => {
//     try {
//       const googleAuth = gapi.auth2.getAuthInstance();
//       const googleUser = await googleAuth.signIn();
//       const token = googleUser.getAuthResponse().id_token;
//       setGAuthToken(token); // Store token after Google login
//     } catch (error) {
//       console.error("Google Sign-In Error:", error);
//     }
//   };

//   // Handle Log Out
//   const handleLogout = async () => {
//     try {
//       await logout();
//       setIsLoggedIn(false);
//       setUser(null);
//       router.push("/");
//     } catch (error) {
//       console.error("Log Out Error:", error);
//     }
//   };

//   // Fetch Google Calendar events
//   const fetchGoogleCalendarEvents = async () => {
//     if (!gAuthToken) {
//       alert("Please sign in with Google to access Calendar.");
//       return;
//     }

//     const calendar = google.calendar('v3');
//     const auth = new google.auth.OAuth2();
//     auth.setCredentials({ access_token: gAuthToken });

//     try {
//       const res = await calendar.events.list({
//         auth,
//         calendarId: 'primary',
//         timeMin: (new Date()).toISOString(),
//         maxResults: 10,
//         singleEvents: true,
//         orderBy: 'startTime',
//       });
//       const events = res.data.items;
//       if (events.length) {
//         console.log("Upcoming events:", events);
//       } else {
//         console.log("No upcoming events found.");
//       }
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   // Add Event to Google Calendar
//   const addGoogleCalendarEvent = async (eventDetails) => {
//     if (!gAuthToken) {
//       alert("Please sign in with Google to add an event.");
//       return;
//     }

//     const calendar = google.calendar('v3');
//     const auth = new google.auth.OAuth2();
//     auth.setCredentials({ access_token: gAuthToken });

//     const event = {
//       summary: eventDetails.title,
//       description: eventDetails.description,
//       start: {
//         dateTime: eventDetails.startDateTime,
//         timeZone: 'UTC',
//       },
//       end: {
//         dateTime: eventDetails.endDateTime,
//         timeZone: 'UTC',
//       },
//     };

//     try {
//       const res = await calendar.events.insert({
//         auth,
//         calendarId: 'primary',
//         resource: event,
//       });
//       console.log('Event created: ', res.data);
//     } catch (error) {
//       console.error("Error adding event:", error);
//     }
//   };

//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link href="/">Home</Link>
//         </li>
//         <li>
//           <Link href="/profile">Profile</Link>
//         </li>
//         <li>
//           {isLoggedIn ? (
//             <>
//               <span>Hello, {user}</span>
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <button onClick={handleGoogleSignIn}>Sign in with Google</button>
//           )}
//         </li>
//       </ul>

//       {isLoggedIn && (
//         <>
//           <button onClick={fetchGoogleCalendarEvents}>Fetch Google Calendar Events</button>
//           <button onClick={() => addGoogleCalendarEvent({ 
//             title: "Sample Event", 
//             description: "This is a sample event.", 
//             startDateTime: new Date().toISOString(),
//             endDateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
//           })}>
//             Add Event to Google Calendar
//           </button>
//         </>
//       )}
//     </nav>
//   );
// }

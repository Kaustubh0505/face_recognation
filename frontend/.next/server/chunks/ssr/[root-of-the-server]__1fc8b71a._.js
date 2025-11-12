module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/app/register/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// "use client";
// import React, { useRef, useState } from "react";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// // Dynamically import react-webcam to avoid SSR issues
// // const Webcam = dynamic(() => import("react-webcam"), { ssr: false });
// const Register = () => {
//   const router = useRouter();
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [name, setName] = useState("");
//   const [registered, setRegistered] = useState(false); // track if user registered
//   // Capture mirrored photo
//   // Handle registration (e.g., send to Firebase later)
//   const handleRegister = () => {
//     if (!name || !capturedImage) {
//       alert("Please enter your name and capture your face!");
//       return;
//     }
//     // Placeholder: save to Firebase Storage & Firestore
//     console.log("Name:", name);
//     console.log("Captured Image:", capturedImage);
//     alert("Registration successful!");
//     setRegistered(true);
//   };
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-blue-800 mb-6">Register Your Face</h1>
//       {/* Input for Name */}
//       {!registered && (
//         <input
//           type="text"
//           placeholder="Enter your name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="mb-4 p-3 rounded-lg border border-gray-300 w-80 text-gray-700"
//         />
//       )}
//       {/* Webcam / Captured Image */}
//       {!capturedImage && !registered ? (
//         <>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             className="rounded-lg shadow-lg mb-4"
//             mirrored={true} // Mirror the live webcam feed
//           />
//           <button
//             onClick={capturePhoto}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
//           >
//             Capture Photo
//           </button>
//         </>
//       ) : capturedImage && !registered ? (
//         <>
//           <img
//             src={capturedImage}
//             alt="Captured"
//             className="rounded-lg shadow-lg mb-4 w-80"
//           />
//           <div className="flex gap-4">
//             <button
//               onClick={() => setCapturedImage(null)}
//               className="px-6 py-3 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
//             >
//               Retake
//             </button>
//             <button
//               onClick={handleRegister}
//               className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
//             >
//               Register
//             </button>
//           </div>
//         </>
//       ) : registered ? (
//         <>
//           <p className="mb-4 text-green-700 font-semibold text-lg">
//             Registration Successful! ✅
//           </p>
//           <button
//             onClick={() => router.push("/attendance")}
//             className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
//           >
//             Mark Attendance
//           </button>
//         </>
//       ) : null}
//     </div>
//   );
// };
// export default Register;
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const page = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "page"
    }, void 0, false, {
        fileName: "[project]/src/app/register/page.js",
        lineNumber: 113,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = page;
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1fc8b71a._.js.map
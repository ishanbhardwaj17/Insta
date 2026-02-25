import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes.jsx";
import "./style.scss";

import { AuthProvider } from "./features/auth/auth.context.jsx";
import { PostContextProvider } from "./features/post/Post.context.jsx";

function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={routes} />
      </PostContextProvider>
    </AuthProvider>
  );
}

export default App;
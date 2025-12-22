import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { RequireAuth } from "./components/RequireAuth";
import { Articles } from "./pages/Articles";
import { ArticleDetail } from "./pages/ArticleDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/articles"
          element={
            <RequireAuth>
              <Articles />
            </RequireAuth>
          }
        />

        <Route
          path="/articles/:id"
          element={
            <RequireAuth>
              <ArticleDetail />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/articles" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


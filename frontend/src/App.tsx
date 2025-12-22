import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { RequireAuth } from "./components/RequireAuth";

function ArticlesPlaceholder() {
  return <div className="p-6">Articles page placeholder (next step)</div>;
}

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
              <ArticlesPlaceholder />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/articles" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

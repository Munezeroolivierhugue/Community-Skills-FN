import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CategoriesPage from '../pages/CategoriesPage';
import UsersPage from '../pages/UsersPage';
import SkillsPage from '../pages/SkillsPage';
import UserSkillsPage from '../pages/UserSkillsPage';
import SessionsPage from '../pages/SessionsPage';
import MessagesPage from '../pages/MessagesPage';
import ReviewsPage from '../pages/ReviewsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/user-skills" element={<UserSkillsPage />} />
      <Route path="/sessions" element={<SessionsPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { storage } from '../utils/storage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUsers = storage.getUsers();
    const storedCurrentUser = storage.getCurrentUser();

    setUsers(storedUsers);
    setCurrentUser(storedCurrentUser);
  }, []);

  const syncUsers = (nextUsers) => {
    setUsers(nextUsers);
    storage.setUsers(nextUsers);
  };

  const syncCurrentUser = (user) => {
    setCurrentUser(user);
    if (user) {
      storage.setCurrentUser(user);
    } else {
      storage.clearCurrentUser();
    }
  };

  const signUp = (email, password, confirmPassword) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password || !confirmPassword) {
      return { success: false, message: 'Vui lòng nhập đầy đủ thông tin.' };
    }

    if (password !== confirmPassword) {
      return { success: false, message: 'Mật khẩu xác nhận không khớp.' };
    }

    const existingUser = users.find(
        (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      return { success: false, message: 'Email đã tồn tại.' };
    }

    const newUser = {
      email: normalizedEmail,
      password,
      favorites: []
    };

    const nextUsers = [...users, newUser];
    syncUsers(nextUsers);
    syncCurrentUser(newUser);

    return { success: true, user: newUser, message: 'Đăng ký thành công.' };
  };

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    const foundUser = users.find(
        (user) =>
            user.email.toLowerCase() === normalizedEmail &&
            user.password === password
    );

    if (!foundUser) {
      return { success: false, message: 'Email hoặc mật khẩu không đúng.' };
    }

    syncCurrentUser(foundUser);
    return { success: true, user: foundUser, message: 'Đăng nhập thành công.' };
  };

  const logout = () => {
    syncCurrentUser(null);
    return { success: true, message: 'Đăng xuất thành công.' };
  };

  const updateCurrentUser = (updatedUser) => {
    const nextUsers = users.map((user) =>
        user.email === updatedUser.email ? updatedUser : user
    );

    syncUsers(nextUsers);
    syncCurrentUser(updatedUser);
  };

  const toggleFavorite = (video) => {
    if (!currentUser) {
      return { success: false, message: 'Bạn cần đăng nhập để thêm yêu thích.' };
    }

    const videoId = video?.id?.videoId || video?.id;
    if (!videoId) {
      return { success: false, message: 'Không tìm thấy ID video.' };
    }

    const favoriteVideo = {
      id: videoId,
      videoId,
      snippet: video.snippet
    };

    const existingIndex = currentUser.favorites.findIndex(
        (item) => (item.id || item.videoId) === videoId
    );

    let updatedFavorites;

    if (existingIndex !== -1) {
      updatedFavorites = currentUser.favorites.filter(
          (item) => (item.id || item.videoId) !== videoId
      );
    } else {
      updatedFavorites = [...currentUser.favorites, favoriteVideo];
    }

    const updatedUser = {
      ...currentUser,
      favorites: updatedFavorites
    };

    updateCurrentUser(updatedUser);

    return {
      success: true,
      isFavorited: existingIndex === -1,
      message:
          existingIndex === -1
              ? 'Đã thêm vào yêu thích.'
              : 'Đã xóa khỏi yêu thích.'
    };
  };

  const value = useMemo(
      () => ({
        users,
        currentUser,
        isAuthenticated: !!currentUser,
        signUp,
        login,
        logout,
        updateCurrentUser,
        toggleFavorite
      }),
      [users, currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
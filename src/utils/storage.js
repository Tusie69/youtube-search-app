const USERS_KEY = 'youtube_app_users';
const CURRENT_USER_KEY = 'current_user';

export const storage = {
  getUsers() {
    try {
      const users = localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  },

  setUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem(CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  },

  clearCurrentUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  clearAllAuthData() {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};
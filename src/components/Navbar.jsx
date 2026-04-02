import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        const result = logout();
        alert(result.message);
    };

    return (
        <header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                width: '100%',
                background: 'white',
                borderBottom: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
            }}
        >
            <div
                style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px'
                }}
            >
                <Link
                    to="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        textDecoration: 'none',
                        color: '#dc2626',
                        fontSize: '18px',
                        fontWeight: 700
                    }}
                >
          <span
              style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#dc2626',
                  color: 'white',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700
              }}
          >
            YT
          </span>
                    <span>YouTube Mini</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {currentUser ? (
                        <>
              <span
                  style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '8px 12px',
                      borderRadius: '9999px',
                      background: '#f3f4f6',
                      color: '#374151',
                      fontSize: '14px',
                      fontWeight: 500
                  }}
              >
                {currentUser.email}
              </span>

                            <Link
                                to="/favorites"
                                style={{
                                    textDecoration: 'none',
                                    color: '#374151',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    padding: '8px 12px',
                                    borderRadius: '8px'
                                }}
                            >
                                Favorites
                            </Link>

                            <button
                                onClick={handleLogout}
                                style={{
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: '#111827',
                                    color: 'white',
                                    padding: '8px 14px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: 'none',
                                    color: '#374151',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    padding: '8px 12px',
                                    borderRadius: '8px'
                                }}
                            >
                                Đăng nhập
                            </Link>

                            <Link
                                to="/signup"
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                    background: '#dc2626',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    padding: '8px 14px',
                                    borderRadius: '8px'
                                }}
                            >
                                Đăng ký
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
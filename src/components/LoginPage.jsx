import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const result = login(email, password);

        if (!result.success) {
            setError(result.message);
            return;
        }

        alert(result.message);
        navigate('/');
    };

    return (
        <div
            style={{
                minHeight: 'calc(100vh - 72px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f9fafb',
                padding: '24px'
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '440px',
                    background: 'white',
                    borderRadius: '20px',
                    padding: '32px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    border: '1px solid #e5e7eb'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#111827' }}>
                        Đăng nhập
                    </h1>
                    <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#6b7280' }}>
                        Chào mừng bạn quay lại với YouTube Mini
                    </p>
                </div>

                {error && (
                    <div
                        style={{
                            marginBottom: '16px',
                            borderRadius: '12px',
                            border: '1px solid #fecaca',
                            background: '#fef2f2',
                            color: '#b91c1c',
                            padding: '12px 14px',
                            fontSize: '14px'
                        }}
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#374151'
                            }}
                        >
                            Email / Tên đăng nhập
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            style={{
                                width: '100%',
                                borderRadius: '12px',
                                border: '1px solid #cbd5e1',
                                background: '#eff6ff',
                                padding: '12px 14px',
                                fontSize: '14px',
                                outline: 'none',
                                color: '#111827'
                            }}
                        />
                    </div>

                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#374151'
                            }}
                        >
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{
                                width: '100%',
                                borderRadius: '12px',
                                border: '1px solid #cbd5e1',
                                background: '#eff6ff',
                                padding: '12px 14px',
                                fontSize: '14px',
                                outline: 'none',
                                color: '#111827'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            border: 'none',
                            borderRadius: '12px',
                            background: '#dc2626',
                            color: 'white',
                            padding: '12px 14px',
                            fontSize: '15px',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        Đăng nhập
                    </button>
                </form>

                <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
                    Chưa có tài khoản?{' '}
                    <Link to="/signup" style={{ color: '#dc2626', fontWeight: 600, textDecoration: 'none' }}>
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
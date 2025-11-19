
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
// import Loading from '../../public/lottie/Loading1.json';

const PUBLIC_PATHS = ['/login', '/register'];
//const PUBLIC_PATHS = ['/auth/login'];

export function RouteGuard({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const storedUser = localStorage.getItem('user');
            const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

            if (!storedUser && !isPublicPath) {
                navigate('/login');
            }

            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    const role = parsedUser.roles?.[0];
                    const homePath = role === 'student' ? '/student/home' : '/teacher/dashboard';

                    if (isPublicPath) {
                        if (pathname !== homePath) {
                            navigate(homePath);
                            return;
                        }
                    }

                    if (role === 'student' && (pathname.startsWith('/teacher') || pathname === '/')) {
                        navigate('/student/home');
                        return;
                    }

                    if ((role === 'teacher' || role === 'admin') && (pathname.startsWith('/student') || pathname === '/')) {
                        navigate('/teacher/dashboard');
                        return;
                    }
                } catch (err) {
                    console.error(err);
                    localStorage.removeItem('user');
                    navigate('/login', { replace: true });
                    setIsAuthChecked(true);
                    return;
                }
            }

            setIsAuthChecked(true);
        };

        checkAuth();
    }, [pathname, navigate]);

    if (!isAuthChecked) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading
            </div>
        );
    }

    return <>{children}</>;
}

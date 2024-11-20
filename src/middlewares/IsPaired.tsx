import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/Loaders/LoadingScreen';
import { useAppSelector } from '@/network/hooks';

export function withAuth(Component: any) {

    return function WithAuth(props: any) {
        const router = useRouter();
        const { user } = useAppSelector(state => state.user)
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {

            if (!user?.pairmode.isActive) {
                router.replace('/user/dashboard');
            } else {
                setIsLoading(false);
            }
        }, [router, user?.pairmode.isActive]);

        if (isLoading) {
            return <LoadingScreen />
        }

        return <Component {...props} />;
    };
}
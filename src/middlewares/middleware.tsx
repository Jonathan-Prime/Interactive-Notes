import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/Loaders/LoadingScreen';

export function withAuth(Component: any) {
  
  return function WithAuth(props: any) {
    const router = useRouter();
      const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        router.replace('/auth/login');
      } else {
        setIsLoading(false);
      }
    }, []);

    if (isLoading) {
            return <LoadingScreen />
          }

    return <Component {...props} />;
  };
}




// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import LoadingScreen from '@/components/Loaders/LoadingScreen';

// export function withAuth(Component: any) {
//   return function WithAuth(props: any) {
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//       const token = localStorage.getItem('authToken');
//       const tokenExpiration = localStorage.getItem('log_auth');

//       if (!token) {
//         router.replace('/auth/login');
//       } else if (tokenExpiration && Date.now() > parseInt(tokenExpiration)) {
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('tokenExpiration');
//         router.replace('/auth/login');
//       } else {
//         setIsLoading(false);
//       }
//     }, []);

//     if (isLoading) {
//       return <LoadingScreen />;
//     }

//     return <Component {...props} />;
//   };
// }

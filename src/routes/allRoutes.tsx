import { LazyExoticComponent, Suspense, lazy, ElementType } from 'react';
import SuspenseLoader from '@/components/loaders/Spinner';

// ----------------------------------------------------------------------
const Loadable =
  (Component: LazyExoticComponent<() => JSX.Element>) =>
  (props: JSX.IntrinsicAttributes) => {
    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <SuspenseLoader />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };

const lazyWithRetries = (importer: () => Promise<{ default: ElementType }>) => {
  const retryImport = async () => {
    try {
      return await importer();
    } catch (error) {
      // window.location.reload();
    }
  };
  return Loadable(lazy(retryImport as any));
};

// -------------------------------Before auth routes--------------------------------
const Login = lazyWithRetries(() => import('@/pages/auth/login'));
const OtpLogin = lazyWithRetries(() => import('@/pages/auth/otp-login'));
const Register = lazyWithRetries(() => import('@/pages/auth/register'));
const ForgetPassword = lazyWithRetries(
  () => import('@/pages/auth/forget-password')
);

// -------------------------------Guest routes--------------------------------
const LandingPage = lazyWithRetries(() => import('@/pages/ro-service/guest/landing'));



// -------------------------------Admin--------------------------------
const AdminHome = lazyWithRetries(() => import('@/pages/ro-service/admin/home'));
const CreateUser = lazyWithRetries(() => import('@/pages/ro-service/admin/create-user'));
const RoleMaster = lazyWithRetries(() => import('@/pages/ro-service/admin/role'));
const ServiceMaster = lazyWithRetries(() => import('@/pages/ro-service/admin/service-type'));
const UserMaster = lazyWithRetries(() => import('@/pages/ro-service/admin/users'));



// ------------------------------Tecnician--------------------------------
const TecnicianHome = lazyWithRetries(() => import('@/pages/ro-service/tecnician/home'));
const BookingList = lazyWithRetries(() => import('@/pages/ro-service/tecnician/booking-list'));



export type Route = {
  layout: string;
  pages: {
    id: string;
    name: string;
    path: string;
    element: JSX.Element;
    exact?: boolean;
  }[];
};

const routes: Route[] = [
  {
    layout: 'auth', // before Auth
    pages: [
      {
        id: '1',
        name: 'Login',
        path: 'login',
        element: <Login />
      },
      {
        id: '2',
        name: 'Register',
        path: 'register',
        element: <Register />
      },
      {
        id: '3',
        name: 'Forget Password',
        path: 'forget-password',
        element: <ForgetPassword />
      },
      {
        id: '4',
        name: 'Otp Login',
        path: 'otp-login',
        element: <OtpLogin />
      },
    ]
  },

  {
    layout: 'tecnician', // after Auth
    pages: [
      {
        id: '1',
        name: 'Home',
        path: 'tech-home',
        element: <TecnicianHome />,
        exact: true
      },
      {
        id: '2',
        name: 'Home',
        path: 'tech-booking-list',
        element: <BookingList />,
        exact: true
      },
    ]
  },

  {
    layout: 'admin', // after Auth
    pages: [
      {
        id: '1',
        name: 'Home',
        path: 'admin-home',
        element: <AdminHome />,
        exact: true
      },
      {
        id: '2',
        name: 'Home',
        path: 'create-user',
        element: <CreateUser />,
        exact: true
      },
      {
        id: '3',
        name: 'Role',
        path: 'role-master',
        element: <RoleMaster />,
        exact: true
      },
      {
        id: '4',
        name: 'Service',
        path: 'service-master',
        element: <ServiceMaster />,
        exact: true
      },
      {
        id: '5',
        name: 'User',
        path: 'user',
        element: <UserMaster />,
        exact: true
      },
    ]

  },

  {
    layout: 'guest', // Guest
    pages: [
      {
        id: '3',
        name: 'Landing Page',
        path: 'landing-page',
        element: <LandingPage />
      }
    ]
  }
];

export default routes;

import { redirect } from 'next/navigation';

// Root page: always redirect to /login
// Middleware + /login page will redirect to /dashboard if already authenticated
export default function RootPage() {
  redirect('/login');
}

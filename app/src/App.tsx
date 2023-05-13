import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import createTheme from '@mui/material/styles/createTheme';
import { getDesignTokens } from './styles/Theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PrivateRoutes from './utils/PrivateRoutes';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () => createTheme(getDesignTokens(prefersDarkMode ? 'dark' : 'light')),
    [prefersDarkMode],
  );

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage/>,
      element: <PrivateRoutes/>,
      children: [
        {
          path: 'home',
          element: <HomePage />,
        }
      ]
    },
    {
      path: "login",
      element: <Login/>
    }
  ])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App;
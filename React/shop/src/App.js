import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.scss';
import { HomePage } from './pages/Home.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

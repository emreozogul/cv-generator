import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import {
  CustomizePage,
  EducationPage,
  ExperiencePage,
  PersonalInfoPage,
  ProjectsPage,
  SkillsPage,
  ExportPage,
} from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <PersonalInfoPage />,
      },
      {
        path: 'education',
        element: <EducationPage />,
      },
      {
        path: 'experience',
        element: <ExperiencePage />,
      },
      {
        path: 'skills',
        element: <SkillsPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'customize',
        element: <CustomizePage />,
      },
      {
        path: 'export',
        element: <ExportPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App

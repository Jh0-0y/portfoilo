import NotFoundPage from '@/pages/notfound'
import { PortfolioPage, ProjectDetailPage } from '@/pages/portfolio'
import { Routes, Route } from 'react-router-dom'

export default function PublicRouter() {
  return (
    <Routes>
        <Route index element={<PortfolioPage />} />
        <Route path="project/:id" element={<ProjectDetailPage />} />
        <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )

}
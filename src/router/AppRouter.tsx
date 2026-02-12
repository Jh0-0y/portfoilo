import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResumeLayout } from '@/layout/ResumeLayout'
import {ResumePage} from '@/pages/ResumePage';

export const AppRouter = () => (
  <BrowserRouter basename="/">
      <Routes>
        <Route element={<ResumeLayout />}>
            <Route path="/" element={<ResumePage />} />
        </Route>
      </Routes>
  </BrowserRouter>
);
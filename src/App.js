import FormPage from './pages/FormPage/FormPage'
import MainPage from './pages/MainPage/MainPage'

import { Routes, Route } from 'react-router-dom'

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/form-page" element={<FormPage />} />
                <Route path="*" element={<MainPage />} />
            </Routes>
        </div>
    )
}

export default App

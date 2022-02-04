// Global state is the data that is shared between all the components within a React application. When the state is changed, or let’s say a filter is added, the components re-render accordingly. https://endertech.com/blog/using-reacts-context-api-for-global-state-management

import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import { useState } from 'react'
import Header from "./components/Header"
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutIconLink from './components/AboutIconLink'
import FeedbackData from './data/FeedbackData'
import AboutPage from './pages/AboutPage'
import { FeedbackProvider } from './context/FeedbackContext'


function App() {

  const [feedback, setFeedback] = useState(FeedbackData)

  const deleteFeedback = (id) => {
    if (window.confirm('Confirm delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  return (
    <FeedbackProvider>
      <Router>
        <Header text="30. Create Context & Provider" />
        <div className="container">

          <Routes>
            {/* Home Route */}
            <Route exact path='/' element={
              <>
                <FeedbackForm handleAdd={addFeedback} />
                <FeedbackStats feedbackPropValue={feedback} />
                <FeedbackList feedbackPropValue={feedback} handleDelete={deleteFeedback} />
              </>
            }>
            </Route>

            {/* About Route */}
            <Route path='/about' element={<AboutPage />} />

          </Routes>

          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  )
}

export default App

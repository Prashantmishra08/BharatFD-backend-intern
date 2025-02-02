import React from 'react';
import AdminPanel from './components/AdminPanel';
import FAQPage from './components/FAQPage';
import QuestionAnswerForm from './components/QuestionAnswerForm';

const App = () => {
    return (
        <>
            <QuestionAnswerForm/>
            <AdminPanel/>
            <FAQPage/>
        </>
        
    );
};

export default App;

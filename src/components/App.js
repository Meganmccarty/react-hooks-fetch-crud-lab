import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
    const [page, setPage] = useState("List");
    const [questions, setQuestions] = useState([]);

    function deleteQuestion(id) {
        const configObj = {
            method: 'DELETE'
        }
        fetch(`http://localhost:4000/questions/${id}`, configObj)
        .then(response => response.json())
        .then(data => {
            const deletedQuestion = questions.filter(question => question.id !== id)
            return setQuestions(deletedQuestion);
        })
    }

    function patchQuestion(id, correctIndex) {
        const configObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'correctIndex': correctIndex
            })
        }
        fetch(`http://localhost:4000/questions/${id}`, configObj)
        .then(response => response.json())
        .then(patchedQuestion => console.log(patchedQuestion))
    }

    useEffect(() => {
        fetch('http://localhost:4000/questions')
        .then(response => response.json())
        .then(data => setQuestions(data))
    }, [])

    return (
        <main>
            <AdminNavBar onChangePage={setPage} />
            {page === "Form" ? 
                <QuestionForm
                    questions={questions}
                    setQuestions={setQuestions}
                />
                : <QuestionList
                    questions={questions}
                    onDelete={deleteQuestion}
                    onPatch={patchQuestion}/>}
        </main>
    );
}

export default App;

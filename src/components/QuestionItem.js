import React from "react";

function QuestionItem({ question, onDelete, onPatch }) {
    const { id, prompt, answers, correctIndex } = question;

    const options = answers.map((answer, index) => (
        <option key={index} value={index}>
            {answer}
        </option>
    ));

    function handleDelete(id) {
        onDelete(id);
    }

    function handlePatch(event) {
        onPatch(id, event.target.value)
    }

    return (
        <li>
            <h4>Question {id}</h4>
            <h5>Prompt: {prompt}</h5>
            <label>
                Correct Answer:
                <select onChange={handlePatch} defaultValue={correctIndex}>{options}</select>
            </label>
            <button onClick={() => handleDelete(id)}>Delete Question</button>
        </li>
    );
}

export default QuestionItem;

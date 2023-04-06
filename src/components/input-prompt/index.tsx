import {useState} from "react";

const InputPrompt = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // TODO: send the message to the server
        setInputValue('');
    };

    return (
        <div className="input-prompt-area">
            <form className="input-prompt-content" onSubmit={handleSubmit}>
                <label>
                    <textarea className="input-prompt" value={inputValue} onChange={handleChange}></textarea>
                </label>
                <button type="submit" className="send">➤</button>
            </form>
        </div>
    );
};
export default InputPrompt
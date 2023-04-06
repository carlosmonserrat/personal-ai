import {useState} from "react";

const TopNav = () => {
    const [model, setModel] = useState('gpt-3.5-turbo');

    return (
        <nav className="top-nav">
            <div className="top-nav-content">
                <label className="radio-button">
                    <input type="radio" name="model" value="text-davinci-003" checked={model === 'text-davinci-003'} onChange={() => setModel('text-davinci-003')} />
                    <span className="checkmark"></span>
                    Text Davinci 003
                </label>
                <label className="radio-button">
                    <input type="radio" name="model" value="gpt-3.5-turbo" checked={model === 'gpt-3.5-turbo'} onChange={() => setModel('gpt-3.5-turbo')} />
                    <span className="checkmark"></span>
                    GPT-3.5 Turbo
                </label>
                <label className="radio-button">
                    <input type="radio" name="model" value="gpt-4" checked={model === 'gpt-4'} onChange={() => setModel('gpt-4')} />
                    <span className="checkmark"></span>
                    GPT-4
                </label>
            </div>
        </nav>
    );
}

export default TopNav
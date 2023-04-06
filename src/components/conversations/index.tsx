const Conversations = () => {
    const messages: string[] = [
        'I can help you find a hotel that meets your needs, just let me know what you\'re looking for.',
        'I can help you find a hotel that meets your needs, just let me know what you\'re looking for.',
    ];

    return (
        <div className="conversations">
            {messages.map((message: string) => (
                <p className="conversation">{message}</p>
            ))}
        </div>
    );
};

export default Conversations
const DisplayDataMessage = ({ content }) => {

    const breaklines = content.includes('<br>');

    return (
        <>
            {!breaklines ? <p>{content}</p> 
            : content.split('<br>').map((line, idx) => (
                <p
                    key={idx}
                >
                    {line}
                </p>
            ))
            }
        </>
    )
}

export default DisplayDataMessage
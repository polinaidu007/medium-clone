import * as React from 'react';

interface errorMessagePropType {
    text: string
}

function ErrorMessage({ text }: errorMessagePropType): JSX.Element {
    return (<ul className="error-messages">
        <li>{text}</li>
    </ul>);
}

export default ErrorMessage;
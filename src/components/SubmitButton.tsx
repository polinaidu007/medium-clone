import * as React from 'react';

interface submitButtonProps {
    disabled?: boolean,
    text: string,
}

function SubmitButton({ text, ...restProps }: submitButtonProps): JSX.Element {
    return (
        <button {...restProps} className="btn btn-lg btn-primary pull-xs-right">
            {text}
        </button>
    )
}

export default SubmitButton;
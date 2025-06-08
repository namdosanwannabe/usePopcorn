type Props = {
    message: string;
};

const ErrorMessage = ({ message }: Props) => {
    return (
        <p className="error">
            <span>❌</span> {message}
        </p>
    );
};

export default ErrorMessage;

// Ensure this file exports the AlertInfo component
interface AlertInfoProps {
    title: string;
    children: React.ReactNode;
}

const AlertInfo: React.FC<AlertInfoProps> = ({ title, children }) => {
    return (
        <div className="alert-info">
            <strong>{title}</strong>
            <p>{children}</p>
        </div>
    );
};

const AlertWarning: React.FC<AlertInfoProps> = ({ title, children }) => {
    return (
        <div className="alert-warning">
            <strong>{title}</strong>
            <p>{children}</p>
        </div>
    );
}

export { AlertInfo, AlertWarning };
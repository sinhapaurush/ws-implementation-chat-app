import '../styles/right.css'
export default function Right({ message }: { message: string }) {
    return (
        <div className="right-message msg">
            <h3>You</h3>
            <p>{message}</p>
        </div>
    )
}

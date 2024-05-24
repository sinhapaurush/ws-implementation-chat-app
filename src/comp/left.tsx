import '../styles/left.css'

export default function LeftMessage({ label, message }: { label: string; message: string }) {
    return (
        <div className='left-msg msg'>
            <h3>{label}</h3>
            <p>{message}</p>
        </div>
    )
}

import '../styles/center.css'

export default function CenterMsg({ message }: { message: string; }) {
    return (
        <div className='center-msg msg'>{message}</div>
    )
}

import './Landing.css'
import { useHistory } from 'react-router-dom'

function Landing() {
    const history = useHistory()

    const navigate = () => {
        history.push('/signup')
    }

    return (
        <div className="landing-wrapper">
            <div className="landing-header">
                <div className="landing-logo">Revolutional App</div>
            </div>
            <div className="landing-content">
                <div className="landing-section landing-attention">
                    It is possible to make and get conribution online
                </div>
                <div className="landing-section">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                    Proin id purus at eros sollicitudin tempor. Morbi vel erat. 
                    Fusce pulvinar condimentum nulla. Donec sit amet est vel 
                    sapien tempor pharetra. Maecenas tortor dui, facilisis eget, 
                    aliquet vel, blandit id, ipsum. In eu odio. Donec semper lacus. 
                </div>
                <div className="landing-section">
                    <button 
                        className="landing-btn"
                        onClick={navigate}
                    >Get started now</button>
                </div>
            </div>
        </div>
    )
}

export default Landing
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <div className="game-menu">
                <h1>Especial de navidad!</h1>
                <Link to="/game">Empezar</Link>
            </div>
        </div>
    );
}
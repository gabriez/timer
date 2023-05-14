import { render, createRoot } from "react-dom/client";
import App from './components/App'

let root = createRoot(document.getElementById('root'));
root.render(<App />)
import { h, render } from 'preact';
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (root) {
    render(<App />, root);
  }
});
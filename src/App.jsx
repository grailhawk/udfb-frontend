import Dashboard from './views/Dashboard';

import './styling.css';

// Note: this demo app only has one view Dashboard if other views were needed for the app
// this is where routing (with react-router) would be set up.
function App() {
  return (
    <div id="udfb-main-content">
      <Dashboard />
    </div>
  );
}

export default App;

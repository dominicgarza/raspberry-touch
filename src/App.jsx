import { Time } from './Time';
import { Weather } from './Weather';

export default function App() {
  return (
    <div className="scene">
      <div className="viewport">
        <br/>
        <h1><Time /></h1>
        <br/>
        <Weather/>
      </div>
    </div>
  )
}

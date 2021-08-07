import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css'
import Header from './components/Header';
import StudentTable from './components/StudentTable';
import AddStudent from './components/AddStudent';
import StudentData  from './pages/StudentData';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import EditStudent from './components/EditStudent';


function App() {
  
  
  return (
   <Router>
    <Switch>
      <Route exact path="/" component={StudentData} />
      <Route  path="/addStudent" component={AddStudent}/>
      <Route  path="/editStudent/:id" component={EditStudent}/>

    </Switch>
     
   </Router>
  );
}

export default App;

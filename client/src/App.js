import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllData from "./pages/AllData/AllData";
import StudentEditForm from "./pages/StudentForm/StudentEditForm";


function App(){
   
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={ <AllData/> }></Route>
          <Route path="/studenteditform" element={<StudentEditForm/>}></Route>
          <Route path="/update/:id"  element={<StudentEditForm/>}></Route>
        </Routes>
      </BrowserRouter>
    
    );
}

export default App;